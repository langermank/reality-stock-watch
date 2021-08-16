import Amplify, { API, Hub, Auth, Storage } from 'aws-amplify';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import aws_exports from './aws-exports';
import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';

Amplify.configure(aws_exports);

function updateList(list, id, record) {
    let newList = [];
    let newFields;
    for (let i in list) {
        if (list[i].data.id !== id) {
            newList.push(list[i]);
        } else {
            newFields = Object.assign({}, list[i].data, record);
            newList.push(Object.assign({}, list[i], { data: newFields }));
        }
    }
    return [newList, newFields];
}

function updateRecord(tableName, id, fields, records) {
    const [newRecords, newFields] = updateList(records, id, fields);
    API.graphql({ query: mutations['update' + tableName], variables: { input: newFields } }).then(
        (result) => {
            // FIXME: validate that item has been updated correctly - maybe use subscription api
        }
    );
    return newRecords;
}
function deleteRecord(tableName, id, records) {
    API.graphql({ query: mutations['delete' + tableName], variables: { input: { id } } }).then(
        (result) => {
            // FIXME: we assume that this worked.  Need to do some error checking here.
        }
    );
    let newRecords = [];
    for (let i in records) {
        if (records[i].data.id !== id) newRecords.push(records[i]);
    }
    return newRecords;
}
function createRecord(tableName, recordFields, inputFields, setFunc) {
    const createQuery = 'create' + tableName;
    let fields = {};
    for (let i in recordFields) {
        let fieldName = recordFields[i];
        if (fieldName === 'id' || !(fieldName in inputFields)) continue;
        fields[fieldName] = inputFields[fieldName];
    }
    API.graphql({ query: mutations[createQuery], variables: { input: fields } }).then((result) => {
        const data = Object.assign({}, result.data[createQuery]);
        for (let fieldName in data) {
            if (!(fieldName in recordFields)) delete data.fieldName;
        }
        setFunc((records) => {
            let newRecord = {
                data,
                update: (newFields) =>
                    setFunc((records) => updateRecord(tableName, data.id, newFields, records)),
                delete: () => setFunc((records) => deleteRecord(tableName, data.id, records)),
            };
            return [...records, newRecord];
        });
    });
}

function listRecords(tableName, recordFields, filter, setFunc) {
    let listQuery = 'list' + tableName + 's';
    let graphql = { query: queries[listQuery] };
    if (filter !== undefined) {
        graphql.variables = { filter };
    }
    API.graphql(graphql).then((result) => {
        let records = [];
        let items = result.data[listQuery].items;
        for (let i in items) {
            let data = {};
            for (let j in recordFields) {
                const field = recordFields[j];
                if (field in items[i]) {
                    data[field] = items[i][field];
                }
            }
            records.push({
                data: data,
                update: (newFields) =>
                    setFunc((records) => updateRecord(tableName, items[i].id, newFields, records)),
                delete: () => setFunc((records) => deleteRecord(tableName, items[i].id, records)),
            });
        }
        setFunc(records);
    });
}

function updateFields(target, source) {
    let fields = Object.assign({}, target);
    for (let i in target) {
        if (i in source) {
            fields[i] = source[i];
        }
    }
    return fields;
}

function tableByFactory(tableName, emptyRecord, foreignKeyName) {
    const fieldNames = Object.keys(emptyRecord);
    return (foreignKey) => {
        const [records, setRecords] = useState([]);
        useEffect(() => {
            const filter = { [foreignKeyName]: { eq: foreignKey } };
            if (!foreignKey) {
                setRecords([]);
                return;
            }
            listRecords(tableName, fieldNames, filter, setRecords);
        }, [foreignKey]);
        return [
            records,
            (inputFields) =>
                createRecord(
                    tableName,
                    fieldNames,
                    Object.assign({ [foreignKeyName]: foreignKey }, inputFields),
                    setRecords
                ),
        ];
    };
}

function tableFactory(tableName, emptyRecord) {
    const fieldNames = Object.keys(emptyRecord);
    return () => {
        const [records, setRecords] = useState([]);
        useEffect(() => {
            listRecords(tableName, fieldNames, undefined, setRecords);
        }, []);
        return [
            records,
            (inputFields) => createRecord(tableName, fieldNames, inputFields, setRecords),
        ];
    };
}

const emptyPrice = {
    id: 'new',
    contestantID: '',
    seasonID: '',
    week: 0,
    price: 0,
};
const usePricesByContestant = tableByFactory('Price', emptyPrice, 'contestantID');

const emptyRating = {
    id: 'new',
    userID: '',
    contestantID: '',
    seasonID: '',
    week: 0,
    rating: 0.0,
};
const useRatingsBySeason = tableByFactory('Rating', emptyRating, 'seasonID');

const emptyContestant = {
    id: 'new',
    seasonID: '',
    firstName: '',
    lastName: '',
    nickName: '',
    image: '',
    status: '',
    slug: '',
};
const useContestantsBySeason = tableByFactory('Contestant', emptyContestant, 'seasonID');

const emptySeason = {
    id: 'new',
    showID: '',
    shortName: '',
    currentWeek: 0,
    status: '',
    nextMarketOpen: '',
    nextMarketClose: '',
    marketStatus: '',
    startDate: '',
    endDate: '',
};
const useSeasonsByShow = tableByFactory('Season', emptySeason, 'showID');

const emptyShow = {
    id: 'new',
    name: '',
};
const useShows = tableFactory('Show', emptyShow);
function useShow(id) {
    const [show, setShow] = useState({});
    const [editedShow, setEditedShow] = useState({});
    const [isDirty, setIsDirty] = useState({});

    function load() {
        if (id && id !== 'new') {
            API.graphql({ query: queries.getShow, variables: { id: id } }).then((result) => {
                let loadedFields = updateFields(emptyShow, result.data.getShow);
                setShow(loadedFields);
                setEditedShow(loadedFields);
            });
        } else {
            setShow(emptyShow);
            setEditedShow(emptyShow);
        }
    }
    useEffect(load, [id]);

    function checkDirty() {
        let isDirty = false;
        for (let field in show) {
            if (show[field] === editedShow[field]) continue;
            isDirty = true;
            break;
        }
        setIsDirty(isDirty);
    }
    useEffect(checkDirty, [show, editedShow]);

    function save() {
        if (editedShow.id === 'new') {
            let fields = Object.assign({}, editedShow);
            delete fields.id;
            API.graphql({ query: mutations.createShow, variables: { input: fields } }).then(
                (result) => {
                    let savedFields = updateFields(emptyShow, result.data.createShow);
                    setShow(savedFields);
                    setEditedShow(savedFields);
                }
            );
        } else {
            API.graphql({ query: mutations.updateShow, variables: { input: editedShow } }).then(
                (result) => {
                    let savedFields = updateFields(emptyShow, result.data.updateShow);
                    setShow(savedFields);
                    setEditedShow(savedFields);
                }
            );
        }
    }
    function update(fields) {
        setEditedShow((editedShow) => Object.assign({}, editedShow, fields));
    }
    function revert() {
        setEditedShow(show);
    }

    return [
        editedShow,
        useCallback(update, []),
        useCallback(save, [editedShow]),
        useCallback(revert, [show]),
        isDirty,
    ];
}

/* A workaround needed because the Javascript client can't parse ISO dates
 * generated by dynamodb properly.
 */
const usersByNetWorth = /* GraphQL */ `
    query UsersByNetWorth(
        $dummy: String
        $netWorth: ModelIntKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelUserFilterInput
        $limit: Int
        $nextToken: String
    ) {
        usersByNetWorth(
            dummy: $dummy
            netWorth: $netWorth
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                isBanned
                displayName
                avatarID
                netWorth
                rank
            }
            nextToken
        }
    }
`;
// This has been hacked a little to deal with how filters work in DynamoDB and
// graphql.  The filter happens after the scan, so limits on query size apply
// to the unfiltered query.  This makes pagination complicated.
//
// This could be done better by using the lower-level dynamodb interface and
// saving the last result rather than the graphql next token.
//
async function fetchAllTimeLeaderboard(filter, direction, nextToken, records) {
    if (records === undefined) {
        records = [];
    }
    let graphql = {
        query: usersByNetWorth,
        variables: {
            sortDirection: direction,
            limit: 100 - records.length,
            dummy: 'dummy',
        },
        authMode: 'AWS_IAM',
    };
    if (filter) {
        graphql.variables.filter = { displayName: { contains: filter } };
    }
    if (nextToken !== undefined) {
        graphql.variables.nextToken = nextToken;
    }
    const result = await API.graphql(graphql);
    nextToken = result.data.usersByNetWorth.nextToken;
    for (let i in result.data.usersByNetWorth.items) {
        let record = result.data.usersByNetWorth.items[i];
        records.push({
            id: record.id,
            rank: record.rank,
            player: record.displayName,
            networth: parseInt(record.netWorth) / 100,
        });
    }

    // Recurse if we need more records.
    if (records.length < 100 && nextToken) {
        [records, nextToken] = await fetchAllTimeLeaderboard(filter, direction, nextToken, records);
    }

    return [records, nextToken];
}

/*
function useAllTimeLeaderboard() {
    const [page, setPage] = useState(1);
    const [ascending, setAscending] = useState(false);

}
*/

// The Auth API has no way of checking if the user is logged in.
// Use exceptions to hack around this.
//
async function getCurrentUser() {
    try {
        return await Auth.currentAuthenticatedUser();
    } catch {
        console.log('return null from currentauth');
        return null;
    }
}

// Returns a use object, and a function that can be used to
// toggle the login status of the user.
//
// If the user is not logged in, the toggle function initiates
// the authentication flow.
//
// In order to minimize UI flashing, we attempt to remember the
// user's previous login state using local storage. If local
// storage has no login state, then we default to "null", which
// means we don't know the login state.  This gives the UI the
// option of rendering some sort of "indeterminate" UI.  This
// means that the loggedIn state can be:
//
//  true: user is logged in
//  false: user is not logged in
//  null: we don't yet know if the user is logged in.
//
const falseUser = {
    loggedIn: false,
    username: null,
    email: null,
    nickname: null,
};
async function fetchUser() {
    console.log('fetchuser called');
    let cognitoUser = await getCurrentUser();
    console.log('fetchuser returnedd with ', cognitoUser);
    let user = falseUser;
    if (cognitoUser) {
        user = {
            loggedIn: true,
            username: cognitoUser.username,
            email: cognitoUser.attributes.email,
            nickname: 'Not yet implemented ' + cognitoUser.username,
        };
    }
    console.log('fetchuser returns ', user);
    return user;
}
function useUser() {
    const { data, mutate, error } = useSWR('currentUser', fetchUser, { initialData: falseUser });
    const loading = !data && !error;
    function toggleLogin() {
        if (data && data.loggedIn) {
            Auth.signOut();
        } else {
            Auth.federatedSignIn();
        }
    }
    const listen = useCallback((data) => {
        switch (data.payload.event) {
            case 'signIn':
            case 'signOut':
                mutate('currentUser');
                break;
            default:
            // Pass
        }
    }, []);
    useEffect(() => {
        Hub.listen('auth', listen);
        console.log('mutate currentUser');
        mutate();
        return () => {
            Hub.remove('auth', listen);
        };
    }, [listen]);
    return { loading, user: data, mutate, error, toggleLogin };
}

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// FIXME: add this to the configuration
const imageBase = 'https://dsw9arc6h9tqj.cloudfront.net/';

function useFile(initialUrl) {
    const [url, setUrl] = useState(initialUrl);
    async function upload(event) {
        const file = event.target.files[0];
        const s3ObjectName = uuid() + '-' + file.name;
        try {
            // First, upload the image.
            const uploadResult = await Storage.put(s3ObjectName, file, {
                level: 'public',
            });
            // Then, save a record of the image in the db.
            API.graphql({
                query: mutations.createImage,
                variables: {
                    input: {
                        s3ObjectKey: uploadResult.key,
                    },
                },
            });
            setUrl(imageBase + s3ObjectName);
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    }
    return [url, upload];
}

async function getProfile() {
    let result = await API.graphql({
        query: queries.profile,
    });
    return result.data.profile;
}
function useProfile() {
    let [user] = useUser();
    let [profile, setProfile] = useState({});

    useEffect(() => {
        if (user.loggedIn !== true) {
            setProfile({});
            return;
        }
        setProfile(() => getProfile());
    }, [user.loggedIn]);

    return [user, profile];
}

export {
    useUser,
    useShows,
    useShow,
    useSeasonsByShow,
    usePricesByContestant,
    useRatingsBySeason,
    useContestantsBySeason,
    useFile,
    useProfile,
    fetchAllTimeLeaderboard,
};
