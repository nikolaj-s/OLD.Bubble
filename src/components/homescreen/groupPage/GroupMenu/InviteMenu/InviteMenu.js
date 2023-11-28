import React from 'react'

import './InviteMenu.css';
import { Friend } from './InviteMenuUtil/friend';
import { CloseSubMenuButton } from '../../GroupButtons/CloseSubMenuButton/CloseSubMenuButton';

export const InviteMenu = (props) => {

    const users = props.users;

    const friends = props.friends;

    const banned = props.banList;

    for (let i = 0; i < friends.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if (friends[i].friend_name === users[j].username || friends[i].friend_name === props.owner) {
               friends[i].inGroup = true;
            }   
        }
    }
       
    for (let i = 0; i < friends.length; i++) {
        for (let j = 0; j < banned.length; j++) {
            if (friends[i].friend_name === banned[j].user) {
                friends[i].inGroup = true;
            }
        }
    }

    const invite = (username) => {
        props.invite(username);
    }
    return (
        <div className="invite-menu-container">

            <div className="invite-menu-nav-container">
                <h4>Invite</h4>
                <CloseSubMenuButton action={props.close} />
            </div>
            <div className="inner-invite-menu-container">
                {friends.length === 0 ? <h3>No one to invite</h3> :
                    friends.map(f => {
                        if (f.inGroup) {
                            return null
                        } else {
                            return (
                                <Friend invite={invite} key={f.messageId} name={f.friend_name} image={f.friends_profile_pic} />
                            )
                        }
                        
                    })
                }
            </div>
        </div>
    )
}
