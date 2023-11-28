import React from 'react'
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';

export const Replies = (props) => {

    return (
        <div className="replies-container">
            {
                props.replies.map((reply, i)=> {
                    if (props.limited && i > props.limit) {
                        return null
                    }
                    return (
                        <div key={reply._id} className="reply-content">
                            <div className="reply-user-info">
                                <img style={{filter: imageNightMode()}} className="reply-user-image" src={reply.user_image} alt={<div className="reply-user-image" >

                                </div>} />
                                <p>{reply.user}</p>
                            </div>
                            <p style={{filter: imageNightMode(), color: imageNightMode() ? 'white' : null}}>{reply.comment}</p>
                        </div>
                    )
                })
            }
            {props.replies.length > props.limit ? <p className="load-more-replies" onClick={props.loadMore}>Load More</p> : null}
        </div>
    )
}
