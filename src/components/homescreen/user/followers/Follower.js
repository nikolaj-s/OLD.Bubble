import React from 'react'
import history from '../../../history';
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';

export const Follower = (props) => {
    const user = props.user;
    const goToUser = () => {
        history.push('/user/' + user.username);
    }
    return (
        <div onClick={goToUser} className="follower-container">
                <div className="image-place-holder-container">
                    <img style={{filter: imageNightMode()}} src={user.user_image} alt={<div className="placeholder-image"></div>} className="placeholder-image" />
                </div>
                <p style={{fontWeight: 800, marginRight: '1rem'}}>{user.username}</p>
        </div>
    )
}
