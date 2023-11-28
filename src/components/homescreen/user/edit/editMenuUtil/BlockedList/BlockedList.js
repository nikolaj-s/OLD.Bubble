import React from 'react'
import { getTimeDif } from '../../../../../TimeDifference'

import './BlockedList.css';

const BlockedUser = (props) => {
    const unBlock = (e) => {
        e.preventDefault();
        props.unBlock(props.user.username);
    }
    return (
        <div className="blocked-user-container">
            <div className="inner-blocked-container">
                <h4>{props.user.username}</h4>
                <button onClick={unBlock}>Unblock</button>
            </div>
            <p>{getTimeDif(props.user.date)}</p>
        </div>
    )
}

export const BlockedList = (props) => {
    
    return (
        <div className="edit-blocked-list-container">
        {
        props.blocked.length === 0 ? 
        <p>No Blocked Users</p>
        :
        props.blocked.map(b => {
            return (
                <BlockedUser unBlock={props.unBlock} key={b.date} user={b} />
            )
        })}
        </div>
    )
}
