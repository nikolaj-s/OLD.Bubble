import React from 'react'
import history from '../../history';
import {imageNightMode} from '../../menu/NightMode/nightModeFunction';

export const LikeMessage = (props) => {

    const message = props.like

    const content_prev = message.content;


    
    const openLikedPost = (e) => {
        
        history.push(`/post/${message.post_id}`);
    }

    return (
        <div onClick={openLikedPost} className="message-container">
            {message.user_image ? <img style={{filter: imageNightMode()}} className="message-image" src={message.user_image} alt="profile" /> : null}
            <div className="inner-like-notification-container">
                <p id="liked-notification-message">{message.message}</p>
                <div className="liked-notification-content-preview-container">
                <img style={{filter: imageNightMode()}} src={content_prev} alt="notification-content-preview" width="50" height="50" />
                </div>
                
            </div>
        </div>
    )
}
