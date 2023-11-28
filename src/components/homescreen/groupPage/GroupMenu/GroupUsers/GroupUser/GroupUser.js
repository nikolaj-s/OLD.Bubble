import React from 'react'

import './GroupUser.css';
import history from '../../../../../history';
import { SubmenuButton } from '../../../../../GlobalUiButtons/SubMenuButton';
import { UserSubMenu } from './UserSubMenu/UserSubMenu';


export const GroupUser = (props) => {

    const user = props.user;

    const joined = user.joined.split(' ')

    const can_ban = props.can_ban;
    const can_update = props.can_update;

    const [open, toggleOpen] = React.useState(false);

    const toggle = () => {
        if (can_ban || can_update) {
            if (open) {
                toggleOpen(false);
            } else {
                toggleOpen(true);
            }
        }
    }

    const goToUsersFile = () => {
        history.push(`/user/${user.username}`);
    }

    const selectUser = () => {
        if (!can_update) return;
        toggleOpen(false);
        props.editPerms(user);
    }

    const selectUserToBan = () => {
        if (!can_ban) return;
        toggleOpen(false)
        props.openBanMenu(user);
    }

    return (
        <>
        <div className="group-user-card-container">
            <h3><span onClick={goToUsersFile} className="go-to-users-file-button">{user.username}</span> [{user.privaledge.type}]</h3>
            <h5>Member since: {joined[0] + " " + joined[1] + " " + joined[2] + " " + joined[3]}</h5>
            {!can_update && !can_ban ? null : 
            <div className="group-user-nav-container">
                {can_update || can_ban ? <SubmenuButton open={toggle} className="group-user-submenu-button" /> : null}
            </div>}
        </div>
        
        {   
            open && (can_update || can_ban) ?
            <UserSubMenu banUser={selectUserToBan} selectUser={selectUser} can_ban={can_ban} can_update={can_update} close={toggle} />
            :
            null
        }
        </>
    )
}
