import React from 'react'

import './GroupUsers.css';
import { GroupUser } from './GroupUser/GroupUser';
import { EditPrivaledgeMenu } from './EditPrivaledgeMenu/EditPrivaledgeMenu';
import { BanUserMenu } from './BanUserMenu/BanUserMenu';

export const GroupUsers = (props) => {

    const [user, selectUser] = React.useState({});

    const [editPermissionMenu, openEditPermissionMenu] = React.useState(false);

    const [banMenuOpen, toggleBanMenu] = React.useState(false);

    const openBanMenu = (user) => {
        selectUser(user);
        toggleBanMenu(true);
        setTimeout(() => {
            try {
                document.getElementById('ban-reason').focus();
            } catch (error) {
                return;
            }
        }, 20)
    }

    const closeBanMenu = () => {
        toggleBanMenu(false);
        setTimeout(() => {
            selectUser({})
        })
    }

    const users = props.users;

    const setUserAndOpenMenu = (user) => {
        selectUser(user);
        openEditPermissionMenu(true);
    }

    const closeMenu = () => {
        openEditPermissionMenu(false);
        setTimeout(() => {
            selectUser({});
        }) 
    }

    const banUser = (message) => {
        props.banUser(user.username, message);
        toggleBanMenu(false);
    }

    return (
        <div className="group-users-inner-container">
            {users.map(user => <GroupUser openBanMenu={openBanMenu} can_update={props.can_update} editPerms={setUserAndOpenMenu} can_ban={props.can_ban} user={user} key={user.username} />)}
            <div className="group-users-spacer"></div>
            {editPermissionMenu && props.can_update ? <EditPrivaledgeMenu assignNewPrivaledge={props.assignNewPrivaledge} close={closeMenu} user={user} permissions={props.permissions} /> : null}
            {banMenuOpen && props.can_ban ? <BanUserMenu banUser={banUser} close={closeBanMenu} user={user} /> : null}
        </div>
    )
}
