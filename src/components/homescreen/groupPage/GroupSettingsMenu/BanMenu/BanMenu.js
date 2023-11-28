import React from 'react'

import './BanMenu.css';
import { getTimeDif } from '../../../../TimeDifference';

const UserCard = (props) => {

    const user = props.user;

    const unBan = () => {
        props.unBanUser(user.user);
    }

    return (
        <>
        <div className="banned-user-card">
            <h2>{user.user}</h2>
            <p>Reason: {user.reason}</p>
            <p>Banned: {getTimeDif(user.time)}</p>
            <button onClick={unBan}>Unban</button>
        </div>
       
        </>
    )

}

export const BanMenu = (props) => {    

    return (
        <div className="ban-menu-list-container">
            {props.banList.length === 0 ? <p>No one has been banned.</p> : 
            props.banList.map(user => {
              return <UserCard unBanUser={props.unBanUser} user={user} key={user.user} />
            })}
            <div className="ban-list-bottom-spacer"></div>
        </div>
    )
}
