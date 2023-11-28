import React from 'react'
import history from '../../../../../history';

import { imageNightMode } from '../../../../../menu/NightMode/nightModeFunction';
import { getTimeDif } from '../../../../../TimeDifference';

import './AltPostPreview.css';

export const AltPostPreview = (props) => {

    const post = props.post;

    let video;

    let image;

    const text = post.text_preview;

    const time = getTimeDif(post.time);

    if (post.content_preview.endsWith('.mp4') || post.content_preview.endsWith('.webm')) {
        video = post.content_preview;
    }

    if (post.content_preview.endsWith('.png') || post.content_preview.endsWith('.jpg') || post.content_preview.endsWith('.jpeg') || post.content_preview.endsWith('.webp') || post.content_preview.endsWith('.gif')) {
        image = post.content_preview;
    }

    const goToPost = () => {
        history.push(`/post/${post.id}`);
    }

    return (
        <div onClick={goToPost} className="post-alt-preview">
            <div className="upper-post-preview-container">
                <h4>{post.username}</h4>
                <p className="user-post-prev-date-stamp">{time}</p>
            </div>
            <div className="user-prev-post-content-container">
                {video ? <video style={{filter: imageNightMode()}} src={video} controls alt="post-preview" /> : image ? <img style={{filter: imageNightMode()}} src={image} alt="post-preview" /> : null}
            </div>
            <div className="text-content-container">
                <p>{text}...</p>
            </div>
        </div>
    )
}
