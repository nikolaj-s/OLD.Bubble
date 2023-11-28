import React from 'react'
import { imageNightMode } from '../../menu/NightMode/nightModeFunction'
const DefaultUserIcon = props => {
    return (
        <svg className="user-icon" width="50" height="46" viewBox="0 0 50 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 0C21.5909 0 18.9276 1.20018 17.0099 3.60054C15.0923 6.00091 14.1335 9.06929 14.1335 12.8057C14.1098 17.4479 15.6723 21.1277 18.821 23.8451C19.2235 24.2074 19.3655 24.6716 19.2472 25.2378L18.4304 26.8682C18.17 27.4117 17.7853 27.8363 17.2763 28.142C16.7673 28.4477 15.696 28.8836 14.0625 29.4497C13.9915 29.4724 12.4941 29.9366 9.57031 30.8424C6.64654 31.7482 5.08996 32.2464 4.90057 32.337C2.91193 33.1295 1.60985 33.9561 0.994318 34.8166C0.331439 36.2432 0 39.8551 0 45.6522H50C50 39.8551 49.6686 36.2432 49.0057 34.8166C48.3902 33.9561 47.0881 33.1295 45.0994 32.337C44.91 32.2464 43.3535 31.7482 40.4297 30.8424C37.5059 29.9366 36.0085 29.4724 35.9375 29.4497C34.304 28.8836 33.2327 28.4477 32.7237 28.142C32.2147 27.8363 31.83 27.4117 31.5696 26.8682L30.7528 25.2378C30.6345 24.6716 30.7765 24.2074 31.179 23.8451C34.3277 21.1277 35.8902 17.4479 35.8665 12.8057C35.8665 9.06929 34.9077 6.00091 32.9901 3.60054C31.0724 1.20018 28.4091 0 25 0Z" fill="black"/>
        </svg>


    )
}

export const FriendShare = (props) => {
    const sharePost = () => {
       props.sendMessage(props.f.messageId);
    }
    return (
        <div onClick={sharePost} className="friend-share-container">
        {props.f.friends_profile_pic ? <img style={{filter: imageNightMode()}} src={props.f.friends_profile_pic} alt="share-pic" /> : <DefaultUserIcon />}
        </div>
    )
}
