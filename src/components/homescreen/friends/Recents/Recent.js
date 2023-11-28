import React from 'react'
import history from '../../../history';
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';

export const Recent = (props) => {

    const recent = props.recent;
    
    const openMessanger = () => {
        if (props.recent._id) {
            history.push({pathname: `/group/${recent.group_name}`, state: recent._id});
            return;
        }
        history.push(`/message/${recent.friend_name}/${recent.messageId}`)
        props.updateRecent(recent);
    }

    
    return (
        <div onClick={openMessanger} className="recents">
            <img style={{filter: imageNightMode()}} src={recent.group_image ? recent.group_image : recent.friends_profile_pic} alt={<div></div>} />
        </div>
    )
}
