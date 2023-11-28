import React from 'react';
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';

import history from '../../../history'

import './Message.css';
import { TimeStamp } from '../TimeStamp/TimeStamp';

export const Message = (props) => {

    const message = props.message;

    const openMessage = (e) => {
        e.stopPropagation();
        if (message.type === 'take-down') return;
        if (message.message === `${message.username} has started following you`) {
            history.push(`/user/${message.username}`);
            props.filterOut(message.username);
            return;
        }
        history.push(`/message/${message.user}/${message.message_id}`);
        props.filterOut(message.user);
    }
    
    return (
        <div onClick={openMessage} className="message-container">
            <TimeStamp time={message.date} />
            {message.user_image ? <img style={{filter: imageNightMode()}} className="message-image" src={message.user_image} alt="profile" /> : null}
            <p>{message.message}</p>
        </div>
    )
}