import React from 'react'
import history from '../../../../../history';

export const LikesList = (props) => {
    const close = (e) => {
        e.stopPropagation();
        props.close(e)
    }
    const goToUser = (e) => {
        e.stopPropagation();
        history.push(`/user/${e.target.innerHTML}`);
    }
    return (
        <div onClick={close} className="likes-list-container">
            <div className="likes-inner-container">
                {props.likes.map(L => {
                    return (
                        <div onClick={goToUser} key={L} className="like">
                            <p>{L}</p>
                        </div>
                        
                    )
                })}
            </div>
        </div>
    )
}
