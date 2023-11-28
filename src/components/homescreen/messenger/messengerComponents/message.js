import React from 'react';


import {PostPreview} from './PostPreview/PostPreview'
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';

export class Message extends React.Component {
    render() {
        const message = this.props.message;
        return (
            <div className={message.user !== this.props.friend ? "sender message-post" : "reciever message-post"}>
                <p className="user-name">{message.user}</p>
                {message.text ? <p className="message-text">{message.text}</p> : null}
                {message.image ? <img style={{filter: imageNightMode()}} src={message.image} alt="msg-content" width="250" height="250" loading="lazy" /> : null}
                {message.video ? <video style={{filter: imageNightMode()}} controls src={message.video} /> : null}
                {message.post ? 
                <PostPreview loadPost={this.props.loadPost} _id={message._id} post={message.post} />
                : null}
                {message.url ?
                <div className="link-container">
                    <a href={message.url} rel="noopener noreferrer" target="_blank">{message.url}</a>
                </div>
                :
                null
                }
            </div>
        )
    }
}