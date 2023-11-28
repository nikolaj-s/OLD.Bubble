import React from 'react'
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction'
import history from '../../../history'

export const UserComponent = (props) => {

    const goToUser = (e) => {
        e.stopPropagation();
        history.push(`/user/${props.user}`)
    }

    return (
        <div className="comment-user-info-container">
            {
                props.user_image === null ? 
                <div onClick={goToUser} style={{filter: imageNightMode()}} className="no-profile-pic">
                    <p  className="first-letter">{props.user.split('')[0]}</p>
                </div>
            :
                <img onClick={goToUser} style={{filter: imageNightMode()}} src={props.user_image} alt="pic" width="50" height="50" />
            }
            
            <h4>{props.user}</h4>
        </div>
    )
}
