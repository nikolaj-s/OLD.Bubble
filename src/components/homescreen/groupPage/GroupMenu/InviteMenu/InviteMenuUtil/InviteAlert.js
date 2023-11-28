import React from 'react'

import './InviteAlert.css';

export const InviteAlert = (props) => {
    return (
        <div className="invite-alert-container">
            <p>{props.msg}</p>
        </div>
    )
}
