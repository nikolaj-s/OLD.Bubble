import React from 'react'

import './EditGroupName.css';

export const EditGroupName = (props) => {

    const [name, changeName] = React.useState(props.group_name);
    const [update, toggleUpdate] = React.useState(false);

    const updateName = (e) => {
        const value = e.target.value;

        if (!update) toggleUpdate(true);
      
        changeName(value);
    }

    const setNewName = () => {
        if (!name) return;
        toggleUpdate(false);
        props.editGroupName(name);
    }

    return (
        <div className="edit-group-name-container">
            <div className="upper-group-name-edit-container">
                <h3>Edit Group Name</h3>
                {update ? <h4 onClick={setNewName} >Update</h4> : null}
            </div>
            <input maxLength="20" onChange={updateName} defaultValue={name} type="text" id="new-group-name-input" />
        </div>
    )
}
