import React, {Component} from 'react';
import { render } from 'react-dom';
import Amplify, {Auth, Hub, API, graphqlOperation} from 'aws-amplify';
import aws_exports from './aws-exports';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';

Amplify.configure(aws_exports);
const RealityStockWatchContext = React.createContext();

function fields2Dict(fields) {
    let dict = {}
    for (const [name, value] of fields) {
        dict[name] = value;
    }
    return dict;
}

class RealityStockWatchProvider extends Component {
    state = {
        username: 'Nobody',
        email: 'unknown',
        authenticationState: 'initializing',
        counter: 0,
        shows: {},
        seasons: {},
        contestants: {},
        currentShow: null,
        currentSeason: null,
        currentContestant: null,
    };
    componentDidMount() {
        Hub.listen('auth', ({payload: {event, data}}) => {
            switch (event) {
                case 'signIn':
                    console.log('signin', data);
                    break;
                case 'signOut':
                    console.log('sign out', data);
                case 'customOAuthState':
                    console.log('custom oauth state', data);
            }
        });

        this.setState({authenticationState: 'loading'});

        Auth.currentAuthenticatedUser()
            .then((cognitoUser) => {
                this.setState({
                    username: cognitoUser.getUsername(),
                    email: cognitoUser.attributes.email,
                    authenticationState: 'logged in',
                })
                console.log(cognitoUser);
            })
            .catch(() => {
                this.setState({
                    username: 'Nobody',
                    email: 'unknown',
                    authenticationState: 'not logged in',
                });
            });
    }
    signIn() {
        try {
            Auth.federatedSignIn()
        } catch (error) {
            console.log('error signing in', error);
        }
    }
    signOut() {
        console.log('signout called');
        try {
            Auth.signOut();
        } catch (error) {
            console.log('error signing out', error);
        }
    }
    listShows = () => {
        console.log('list shows called');
        API.graphql({ query: queries.listShows }).then(result => {
            let shows = result.data.listShows.items.reduce((map, show) => {
                map[show.id] = show;
                return map;
            }, {});
            this.setState({shows});
        });
    }
    selectShow = (id) => {
        console.log('select show', id);
        this.setState({currentShow: id});
        this.listSeasons(id);
    }
    createShow = (fields) => {
        let fieldsDict = fields2Dict(fields);
        API.graphql({ query: mutations.createShow, variables: {input: {name: fieldsDict.name}}}).then(result => {
            this.listShows()
        });
    }
    updateShow = (showID, fields) => {
        console.log('updateShow show', showID, fields);
        let fieldsDict = fields2Dict(fields);
        API.graphql({ query: mutations.updateShow, variables: {input: {id: showID, name: fieldsDict.name}}}).then(result => {
            console.log('update show result', result);
            this.setState({currentShow: ''});
            this.listShows();
        });
    }
    deleteShow = (id) => {
        console.log('delete show', id);
        API.graphql({ query: mutations.deleteShow, variables: {input: {id: id}}}).then(result => {
            console.log('delete shows', result);
            this.listShows()
        });
    }

    listSeasons = (showID) => {
        console.log('list seasons for show', showID);
        API.graphql({ query: queries.listSeasons, variables: {filter: {showID: {eq: showID}}}}).then(result => {
            let seasons = result.data.listSeasons.items.reduce((map, season) => {
                map[season.id] = season;
                return map;
            }, {});
            this.setState({seasons});
        });
    }
    selectSeason = (id) => {
        console.log('select season', id);
        this.setState({currentSeason: id});
        this.listContestants(id);
    }
    createSeason = (fields) => {
        let fieldsDict = fields2Dict(fields);
        API.graphql({
            query: mutations.createSeason, 
            variables: {input: {
                showID: this.state.currentShow,
                startDate: fieldsDict.startDate,
                endDate: fieldsDict.endDate,
                shortName: fieldsDict.shortName,
                currentWeek: fieldsDict.currentWeek,
                status: fieldsDict.status,
            }}
        }).then(result => {
            this.listSeasons(this.state.currentShow);
        });
    }
    updateSeason = (seasonID, fields) => {
        let fieldsDict = fields2Dict(fields);
        API.graphql({ 
            query: mutations.updateSeason, 
            variables: {input: {
                id: this.state.currentSeason,
                startDate: fieldsDict.startDate,
                endDate: fieldsDict.endDate,
                shortName: fieldsDict.shortName,
                currentWeek: fieldsDict.currentWeek,
                status: fieldsDict.status,
                slug: fieldsDict.slug,
            }}
        }).then(result => {
            this.setState({currentSeason: ''});
            this.listSeasons(this.state.currentShow);
        });
    }
    deleteSeason = (id) => {
        API.graphql({ query: mutations.deleteSeason, variables: {input: {id: id}}}).then(result => {
            this.listSeasons(this.state.currentShow);
        });
    }

    listContestants = (seasonID) => {
        API.graphql({ query: queries.listContestants, variables: {filter: {seasonID: {eq: seasonID}}}}).then(result => {
            let contestants = result.data.listContestants.items.reduce((map, contestant) => {
                map[contestant.id] = contestant;
                return map;
            }, {});
            this.setState({contestants});
        });
    }
    selectContestant = (id) => {
        this.setState({currentContestant: id});
    }
    createContestant = (fields) => {
        let fieldsDict = fields2Dict(fields);
        console.log('create contestant', fieldsDict);
        API.graphql({
            query: mutations.createContestant, 
            variables: {input: {
                seasonID: this.state.currentSeason,
                firstName: fieldsDict.firstName,
                lastName: fieldsDict.lastName,
                nickName: fieldsDict.nickName,
                image: fieldsDict.image,
                status: fieldsDict.status,
                slug: fieldsDict.slug,
            }}
        }).then(result => {
            this.listContestants(this.state.currentSeason);
        });
    }
    updateContestant = (contestantID, fields) => {
        let fieldsDict = fields2Dict(fields);
        API.graphql({ 
            query: mutations.updateContestant, 
            variables: {input: {
                id: this.state.currentContestant,
                firstName: fieldsDict.firstName,
                lastName: fieldsDict.lastName,
                nickName: fieldsDict.nickName,
                image: fieldsDict.image,
                status: fieldsDict.status,
                slug: fieldsDict.slug,
            }}
        }).then(result => {
            this.setState({currentContestant: ''});
            this.listContestants(this.state.currentSeason);
        });
    }
    deleteContestant = (id) => {
        API.graphql({ query: mutations.deleteContestant, variables: {input: {id: id}}}).then(result => {
            this.listContestants(this.state.seasonID);
        });
    }

    render() {
        let context = {
            state: this.state,
            signOut: () => this.signOut.bind(this),
            signIn: () => this.signIn.bind(this),

            listShows: () => this.listShows.bind(this),
            selectShow: (id) => this.selectShow(id),
            updateShow: (id, fields) => this.updateShow(id, fields),
            createShow: this.createShow,
            deleteShow: (id) => this.deleteShow.bind(this, id),

            listSeasons: (id) => this.listSeasons.bind(this, id),
            selectSeason: (id) => this.selectSeason(id),
            updateSeason: (id, fields) => this.updateSeason(id, fields),
            createSeason: this.createSeason,
            deleteSeason: (id) => this.deleteSeason.bind(this, id),

            listContestants: (id) => this.listContestants.bind(this, id),
            selectContestant: (id) => this.selectContestant(id),
            updateContestant: (id, fields) => this.updateContestant(id, fields),
            createContestant: this.createContestant,
            deleteContestant: (id) => this.deleteContestant.bind(this, id),
        };
        return (
            <RealityStockWatchContext.Provider value={context}>
                {this.props.children}
            </RealityStockWatchContext.Provider>
        );
    }
}

const RealityStockWatchConsumer = RealityStockWatchContext.Consumer;

const ShowContext = React.createContext();
class Shows extends Component {
    static contextType = RealityStockWatchContext;
    render() {
        let rsw = this.context;
        let fragments = [];
        for (let showID in rsw.state.shows) {
            let showContext = {
                state: rsw.state.shows[showID],
                select: () => rsw.selectShow(showID),
                update: (fields) => rsw.updateShow(showID, fields),
                delete: rsw.deleteShow.bind(rsw, showID),
                selected: rsw.state.currentShow === showID
            }
            fragments.push(<ShowContext.Provider value={showContext} key={showID}><ShowContext.Consumer>
                {this.props.children}
            </ShowContext.Consumer></ShowContext.Provider>);
        }
        return fragments;
    }
}

const SeasonContext = React.createContext();
class Seasons extends Component {
    static contextType = RealityStockWatchContext;
    render() {
        let rsw = this.context;
        let fragments = [];
        for (let seasonID in rsw.state.seasons) {
            let seasonContext = {
                state: rsw.state.seasons[seasonID],
                select: () => rsw.selectSeason(seasonID),
                update: (fields) => rsw.updateSeason(seasonID, fields),
                delete: rsw.deleteSeason.bind(rsw, seasonID),
                selected: rsw.state.currentSeason === seasonID
            }
            fragments.push(<SeasonContext.Provider value={seasonContext} key={seasonID}><SeasonContext.Consumer>
                {this.props.children}
            </SeasonContext.Consumer></SeasonContext.Provider>);
        }
        return fragments;
    }
}

const ContestantContext = React.createContext();
class Contestants extends Component {
    static contextType = RealityStockWatchContext;
    render() {
        let rsw = this.context;
        let fragments = [];
        for (let contestantID in rsw.state.contestants) {
            let contestantContext = {
                state: rsw.state.contestants[contestantID],
                select: () => rsw.selectContestant(contestantID),
                update: (fields) => rsw.updateContestant(contestantID, fields),
                delete: rsw.deleteContestant.bind(rsw, contestantID),
                selected: rsw.state.currentContestant === contestantID
            }
            fragments.push(<ContestantContext.Provider value={contestantContext} key={contestantID}><ContestantContext.Consumer>
                {this.props.children}
            </ContestantContext.Consumer></ContestantContext.Provider>);
        }
        return fragments;
    }
}

export default RealityStockWatchProvider;
export {RealityStockWatchConsumer, Shows, Seasons, Contestants};