// import React, {useEffect, useState, useCallback} from 'react';
// import {
//     useUser,
//     useShows,
//     useShow,
//     useSeasonsByShow,
//     useContestantsBySeason,
//     useRatingsBySeason,
//     usePricesByContestant,
//     useFile,
//     useProfile,
// } from './RealityStockWatchBackend';
// import {Card, Container, Button, Table, Input, Form, Image} from 'semantic-ui-react';

// function noop() {return;}

// function User() {
//     let [user, toggleLogin] = useUser();
//     let profile;

//     if (user.loggedIn === null) {
//         profile = <>....<Button>....</Button></>;
//     } else if (user.loggedIn) {
//         profile = <>{user.nickname}<Button onClick={toggleLogin}>Logout</Button></>;
//     } else {
//         profile = <Button onClick={toggleLogin}>Login</Button>;
//     }
//     return (
//         <Container>{profile}</Container>
//     );
// }

// function DataTable({items, fields, onSelect, create, specialFields}) {
//     const emptyRow = fields.reduce((dict, field) => {dict[field] = '';return dict}, {});

//     const [currentFields, setCurrentFields] = useState({'new': emptyRow});
//     const [currentSelection, setCurrentSelection] = useState('');
//     let isEdited = (id) => id in currentFields;

//     function fieldType(field) {
//         if (field === 'id') return 'id';
//         if (specialFields && field in specialFields) {
//             return specialFields[field];
//         }
//         return 'string';
//     }

//     // Prune currentFields so that it only contains changed rows.
//     function pruneCurrentFields() {
//         setCurrentFields(currentFields => {
//             let pruned = false;
//             let newFields = {'new': currentFields['new']};
//             for (let i in items) {
//                 const data = items[i].data;
//                 const id = data.id;
//                 if (!(id in currentFields)) continue;
//                 const itemChanged = fields.reduce((tf, field) => {
//                     if (tf) return true;
//                     if (!(id in currentFields)) return false;
//                     if (data[field] !== currentFields[id][field]) return true;
//                     return false;
//                 }, false);
//                 if (itemChanged) {
//                     newFields[id] = currentFields[id];
//                 } else {
//                     pruned = true;
//                 }
//             }
//             if (pruned) return newFields;
//             return currentFields;
//         });
//     }
//     useEffect(pruneCurrentFields, [currentFields, items, fields]);

//     const editField = useCallback((id, field, value) => {
//         setCurrentFields((currentFields) => {
//             let changed = false;
//             let newFields = Object.assign({}, currentFields);
//             if (!(id in newFields)) {
//                 changed = true;
//                 for (let i in items) {
//                     if (items[i].data.id === id) {
//                         newFields[id] = Object.assign({}, items[i].data);
//                         break;
//                     }
//                 }
//             }
//             if (newFields[id][field] !== value) {
//                 newFields[id][field] = value;
//                 changed = true;
//             }
//             if (!changed) return currentFields;
//             return newFields;
//         });
//     }, [items]);
//     function cancelEdit(id) {
//         setCurrentFields((currentFields) => {
//             if (!(id in currentFields)) return currentFields;
//             let newFields = Object.assign({}, currentFields);
//             delete newFields[id];
//             return newFields;
//         });
//     }
//     function toggleSelection(id) {
//         setCurrentSelection((currentSelection) => {
//             let newSelection = '';
//             if (currentSelection !== id) {
//                 newSelection = id;
//             }
//             onSelect(newSelection);
//             return newSelection;
//         });
//     }
//     function onAdd(event) {
//         let done = false;
//         setCurrentFields((currentFields) => {
//             if (done) {
//                 console.log('debounced onadd');
//                 return currentFields;
//             }
//             done = true;
//             console.log('inside onAdd');
//             create(currentFields['new']);
//             return {...currentFields,'new': emptyRow};
//         });
//     }
//     function handleChange(event, id, field)  {
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         editField(id, field, value);
//     }
//     const headerCells = fields.map((field,i) => <Table.HeaderCell key={field}>{field}</Table.HeaderCell>);
//     const newRowCells = fields.map((field,i) => {
//         let content;
//         switch (fieldType(field)) {
//             case 'id':
//                 content = '';
//                 break;
//             case 'image':
//                 content = <>
//                     <InputImage id='new' field={field} onChange={editField}/>
//                     <Image size="small" src={currentFields['new'][field]}/>
//                 </>;
//                 break;
//             default:
//                 content = <Input onChange={(event)=>handleChange(event, 'new', field)} value={currentFields['new'][field]}/>;
//         }
//         return <Table.Cell key={field}>{content}</Table.Cell>;
//     });
//     const bodyCells = items.map((item, i) => {
//         const id = item.data.id;
//         const cells = fields.map((field, i) => {
//             let fieldValue = isEdited(id)?currentFields[id][field]:item.data[field];
//             let content;
//             switch (fieldType(field)) {
//                 case 'id':
//                     content = fieldValue;
//                     break;
//                 case 'image':
//                     content = <InputImage id={id} field={field} value={fieldValue} onChange={editField}/>;
//                     if (fieldValue) {
//                         content = <>
//                             {content}
//                             <Image size="small" src={fieldValue}/>
//                         </>;
//                     }
//                     break;
//                 default:
//                     content = <Input
//                         name={field}
//                         value={fieldValue}
//                         onChange={(event) => handleChange(event, id, field)}
//                     />;
//             }
//             return (<Table.Cell key={field}>{content}</Table.Cell>);
//         });
//         let actions;
//         if (isEdited(id)) {
//             actions = <>
//                 <Button onClick={() => cancelEdit(id)}>Cancel</Button>
//                 <Button onClick={() => item.update(currentFields[id])}>Save</Button>
//             </>;
//         } else {
//             actions = <Button onClick={item.delete}>Delete</Button>;
//         }
//         return <Table.Row positive={currentSelection === id} key={id}><Table.Cell><Button onClick={() => toggleSelection(id)}>Select</Button></Table.Cell>{cells}<Table.Cell>{actions}</Table.Cell></Table.Row>;
//     });
//     return <Table stackable>
//         <Table.Header><Table.Row key='header'>
//             <Table.HeaderCell>Select</Table.HeaderCell>
//             {headerCells}
//             <Table.HeaderCell>Actions</Table.HeaderCell>
//         </Table.Row></Table.Header>
//         <Table.Body>
//             {bodyCells}
//             <Table.Row key="add">
//                 <Table.Cell></Table.Cell>
//                 {newRowCells}
//                 <Table.Cell><Button onClick={onAdd}>Add</Button></Table.Cell>
//             </Table.Row>
//         </Table.Body>
//     </Table>;
// }

// function Shows({onSelect}) {
//     let [shows, createShow] = useShows();
//     return <DataTable items={shows} fields={['id','name']} onSelect={onSelect||noop} create={createShow}/>;
// }

// function Seasons({showID, onSelect}) {
//     let [seasons, createSeason] = useSeasonsByShow(showID);
//     return <DataTable
//         items={seasons}
//         fields={['id','startDate', 'endDate', 'shortName', 'currentWeek', 'status', 'nextMarketOpen', 'nextMarketClose', 'marketStatus']}
//         onSelect={onSelect||noop}
//         create={createSeason}/>;
// }

// function Contestants({seasonID, onSelect}) {
//     let [contestants, createContestant] = useContestantsBySeason(seasonID);
//     return <DataTable
//         items={contestants}
//         fields={['id','firstName', 'lastName', 'nickName', 'image', 'status', 'slug']}
//         onSelect={onSelect||noop}
//         create={createContestant}
//         specialFields={{image:'image'}}
//     />;
// }

// function Ratings({seasonID, onSelect}) {
//     let [ratings, createRating] = useRatingsBySeason(seasonID);
//     return <DataTable items={ratings} fields={['id','userID', 'contestantID', 'week', 'rating']} onSelect={onSelect||noop} create={createRating}/>;
// }

// function Prices({contestantID, onSelect}) {
//     let [prices, createPrice] = usePricesByContestant(contestantID);
//     return <DataTable items={prices} fields={['id','seasonID', 'week', 'price']} onSelect={onSelect||noop} create={createPrice}/>;
// }

// function Show({id}) {
//     let [show, setShow, save, revert, isDirty] = useShow(id);
//     let [actions, setActions] = useState('');
//     function handleChange(event, field)  {
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         setShow({[field]: value});
//     }
//     useEffect(() => {
//         if (isDirty) {
//             setActions(<><Button onClick={save}>Save</Button><Button onClick={revert}>Revert</Button></>);
//         } else {
//             setActions('');
//         }
//     }, [isDirty, save, revert]);
//     return <Form>
//         <p>Show id: {show.id}</p>
//         <Form.Input name="showName" label="Show name" value={show.name} onChange={(event) => handleChange(event, 'name')}/>
//         {actions}
//     </Form>;
// }

// function InputImage({id, field, name, label, value, onChange}) {
//     // The output url can change in two ways:
//     // 1. the value property can change,
//     // 2. the input field is changed.
//     //
//     // Whatever happens most recently is what is
//     // reported as the current url.
//     //
//     const [url, setUrl] = useState(value||'');
//     const [uploadUrl, upload] = useFile(value||'');

//     useEffect(()=>{
//         setUrl(value||'');
//     }, [value]);
//     useEffect(()=>{
//         setUrl(uploadUrl||'');
//     }, [uploadUrl]);
//     useEffect(()=>{
//         onChange(id, field, url);
//     }, [id, field, url, onChange]);

//     return <Input
//         type="file"
//         accept="image/*"
//         name={name}
//         label={label}
//         onChange={(event)=> {upload(event);event.currentTarget.value=null;}}
//     />;
// }

// function Me() {
//     let [user, profile] = useProfile();

//     let displayName = user.loggedIn?profile.nickname:'Guest';
//     let role = user.loggedIn?(profile.isAdmin?'Administrator':'Player'):'Public';
//     return <Card>
//       <Card.Content>
//         <Card.Header>{displayName}</Card.Header>
//         <Card.Meta>{role}</Card.Meta>
//       </Card.Content>
//     </Card>;
// }

// export {User, Shows, Seasons, Show, Contestants, Ratings, Prices, InputImage, Me};
