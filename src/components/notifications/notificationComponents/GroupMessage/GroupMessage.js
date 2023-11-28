import React from 'react'
import { TimeStamp } from '../TimeStamp/TimeStamp';
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';

export const GroupMessage = (props) => {

    const message = props.message;

    const openGroupNotification = (e) => {
        e.stopPropagation();

        props.openGroupNotification(message.group_name);
    }

    return (
        <div onClick={openGroupNotification} className="message-container">
            <TimeStamp time={message.time} />
            <img style={{filter: imageNightMode()}} className="message-image" src={message.group_image} alt="profile" />
            <p>{message.message}</p>
        </div>
    )
}
