import React from 'react'

import './EditGroupLimit.css';

export const EditGroupLimit = (props) => {

    const current_limit = props.limit;

    const [newLimit, setNewLimit] = React.useState(current_limit);

    const [update, setUpdate] = React.useState(false);

    const changeLimit = () => {
        const value = document.getElementById('group-limit-slider').value;

        setNewLimit(Number(value));

        setUpdate(true);
    }

    const updateLimit = () => {
        if (current_limit === newLimit) return;
        setUpdate(false);
        props.updateGroupLimit(newLimit);
    }

    return (
        <div className="edit-group-limit-container">
            <h4>Edit User Limit</h4>
            {update ? <h5 onClick={updateLimit} className="update-group-limit-button">Update</h5> : null}
            <div className="group-limit-counter-container">
                <h3>Limit: {newLimit} / 25</h3>
            </div>
            <div className="edit-group-limit-slider-container">
                <input onChange={changeLimit} id="group-limit-slider" type="range" step="5" min="5" max="25" defaultValue={current_limit} />
            </div>            
        </div>
    )
}
