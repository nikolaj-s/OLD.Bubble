import React from 'react'

import './Replies.css';
import { Reply } from './Reply/Reply';

export const Replies = (props) => {

    const replies = props.replies;

    return (
        <div className="group-post-replies-container">
            {replies.map(reply => {
                return (
                    <Reply reply={reply} key={reply.post_placement_id} />
                )
            })}
            {props.allReplies.length > props.visibleReplies ? 
            <button className="show-more-replies-button" onClick={props.showMoreReplies}>Show More</button> 
            : null}
        </div>
    )
}
