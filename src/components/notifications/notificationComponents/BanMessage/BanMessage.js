import React from 'react'

import './BanMessage.css';
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';
import { TimeStamp } from '../TimeStamp/TimeStamp';

export const BanMessage = (props) => {

    const message = props.message;
    console.log(message)
    return (
        <div className="group-request-container">
            <TimeStamp time={message.time} />
            <p className="notification-type">Group Ban</p>
            {message.user_image ? <img style={{filter: imageNightMode()}} className="group-request-image" src={message.image} alt="user" /> : null}
            <div className='group-request-upper'>
                <p>You have been banned from {message.group}</p>
                <p>Reason: {message.message}</p>
            </div>
            
        </div>
    )
}
