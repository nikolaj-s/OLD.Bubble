import React from 'react'

import './TogglePostPreview.css';
import { BubbleView } from './TogglePostPreviewButtons/BubbleView';
import { FeedViewButton } from './TogglePostPreviewButtons/FeedViewButton';

export const TogglePostPreview = (props) => {

    

    return (
        <div className="toggle-post-preview-container">
            <BubbleView togglePrev={props.togglePrev} alt={props.altPostPreview} />
            <FeedViewButton togglePrev={props.togglePrev} alt={props.altPostPreview} />
        </div>
    )
}
