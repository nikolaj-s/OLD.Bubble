import React from 'react'
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';

import './GroupInvite.css';

export const GroupInvite = (props) => {

    const request = props.invite;

    const ignore = (e) => {
        e.stopPropagation();
        props.ignore(request.name);
    }
    const accept = (e) => {
        e.stopPropagation();
        props.accept(request.invite_token, request.name);
    }
    return (
        <div className="group-request-container">
            <p className="notification-type">Group Invite</p>
            {request.user_image ? <img style={{filter: imageNightMode()}} className="group-request-image" src={request.user_image} alt="user" /> : null}
            <div className='group-request-upper'>
                <p>{request.message}</p>
            </div>
            <div className="group-request-lower">
                <button onClick={accept} >Accept</button>
                <button onClick={ignore} >Ignore</button>
            </div>
        </div>
    )
}
