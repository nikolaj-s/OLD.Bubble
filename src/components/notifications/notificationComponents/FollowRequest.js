import React from 'react'
import { imageNightMode } from '../../menu/NightMode/nightModeFunction';

export const FollowRequest = (props) => {
    
    const request = props.request;

    const accept = (e) => {
        e.stopPropagation();
        const user = request.user;
        const option = true;
        props.option(user, option);
    }
    const decline = (e) => {
        e.stopPropagation();
        const user = request.user;
        const option = false;
        props.option(user, option);
    }
    return (
        <div className="follow-request-container">
            <div className='follow-request-upper'>
                {request.user_image ? <img style={{filter: imageNightMode()}} className="notification-image" src={request.user_image} alt="user" /> : null}
                <p>{request.message}</p>
            </div>
            <div className="follow-request-lower">
                <button onClick={accept}>Accept</button>
                <button onClick={decline}>Decline</button>
            </div>
        </div>
    )
}
