import React from 'react'
import history from '../../../../../../../history';
import { getTimeDif } from '../../../../../../../TimeDifference';

import './Reply.css';

export const Reply = (props) => {

    const reply = props.reply;

    const time = getTimeDif(reply.time);

    const goToUsersProfile = (e) => {
        history.push(`/user/${e.currentTarget.innerHTML}`)
    }

    return (
        <div className='group-post-reply'>
            {reply.posting ? <div className="loading-gradient" style={{width: 60, height: 20, borderRadius: 5}} ></div>  
            : 
            <div className="reply-top-container">
                <h4 onClick={goToUsersProfile} className="group-post-user-reply">{reply.user}</h4>
                <h5 className="reply-time">{time}</h5>
            </div>
            }
            <p>{reply.message}</p>
        </div>
    )
}
