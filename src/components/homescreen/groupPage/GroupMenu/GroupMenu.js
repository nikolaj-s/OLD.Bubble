import React from 'react'

import './GroupMenu.css';
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';
import { SettingsButton } from '../GroupButtons/settingsButton/SettingsButton';
import history from '../../../history';
import { InviteMenu } from './InviteMenu/InviteMenu';
import { GroupSettingsMenu } from '../GroupSettingsMenu/GroupSettingsMenu';
import { GroupUsers } from './GroupUsers/GroupUsers';
import { LeaveGroupButton } from './LeaveGroup/LeaveGroupButton/LeaveGroupButton';
import { LeaveGroupConfirm } from './LeaveGroup/LeaveGroupConfirm';


export const GroupMenu = (props) => {

    const [inviteMenuOpen, openInviteMenu] = React.useState(false);

    const [settingsOpen, toggleSettings] = React.useState(false);

    const [confirmLeaveMenu, toggleConfirmLeaveMenu] = React.useState(false);


    const image = props.image;
    const owner = props.owner;
    const name = props.name;
    const auth = props.auth;
    const users = props.users;
    const invite_auth = props.can_invite;
    const friends = props.friends;

    const goToOwnersProfile = () => {
        history.push(`/user/${owner}`);
    }

    const toggleInviteMenu = () => {
        if (inviteMenuOpen) {
            document.getElementsByClassName('invite-menu-container')[0].style.top = '100%';
            setTimeout(() => {
                openInviteMenu(false);
            }, 500)
            
        } else {
            openInviteMenu(true);
            setTimeout(() => {
                document.getElementsByClassName('invite-menu-container')[0].style.top = '235px';
            }, 100)
        }
    }

    const toggleSettingsMenu = () => {
        if (settingsOpen) {
            document.getElementsByClassName('group-settings-menu-container')[0].style.top = '100%';
            setTimeout(() => {
                toggleSettings(false);
            }, 500)
        } else {
            toggleSettings(true);
            setTimeout(() => {
                document.getElementsByClassName('group-settings-menu-container')[0].style.top = '235px';
            })
        }
    }
    
    const toggleLeaveMenu = () => {
        if (auth) return;
        if (confirmLeaveMenu) {
            toggleConfirmLeaveMenu(false)
        } else {
            toggleConfirmLeaveMenu(true);
        }
    }

    return (
        <div className="group-menu-container">
            {!auth && confirmLeaveMenu ? <LeaveGroupConfirm leave={props.leaveGroup} toggle={toggleLeaveMenu} /> : null}
            <div style={{ filter: imageNightMode()}} className="group-info-container">
                {!auth ? <LeaveGroupButton action={toggleLeaveMenu} /> : null}
                <SettingsButton action={toggleSettingsMenu} />
                
                <div className="group-image-container">
                    <img src={image} alt={<div></div>} />
                </div>
                <div className="inner-info-container">
                    <h2>{name}</h2>
                    <h5>Group Owner: <span onClick={goToOwnersProfile} className="owner-button">{owner}</span></h5>
                    <h5>Users: {users.length + 1} / {props.limit}</h5>
                </div>
            </div>
            <div className="group-users-container">
                <div className="group-users-title-container">
                    <h2>Users</h2>
                </div>
                
                {invite_auth ? <button onClick={toggleInviteMenu}>INVITE</button> : null}
                <GroupUsers 
                
                banUser={props.banUser} 
                assignNewPrivaledge={props.assignNewPrivaledge} permissions={props.permissions} 
                can_update={props.can_update_perms} can_ban={props.can_ban_users} users={props.users} />
                {inviteMenuOpen && invite_auth ? 
                <InviteMenu 
                owner={props.owner} users={users} 
                invite={props.inviteUser} close={toggleInviteMenu} friends={friends} 
                banList={props.banList}
                /> : null}
                {settingsOpen ? 
                <GroupSettingsMenu 
                auth={auth}
                unBanUser={props.unBanUser}
                banList={props.banList}
                updateGroupImage={props.updateGroupImage}
                group_image={props.group_image}
                editGroupName={props.editGroupName}
                updateGroupLimit={props.updateGroupLimit}
                limit={props.limit}
                deletePrivaledge={props.deletePrivaledge}
                addPrivaledge={props.addPrivaledge} 
                updatePrivaledge={props.updatePrivaledge} 
                permissions={props.permissions} 
                deleteGroup={props.deleteGroup} 
                close={toggleSettingsMenu} 
                group_name={name}
                notifications={props.notifications}
                UpdateNotifications={props.UpdateNotifications}
                /> 
                : null}
            </div>
        </div>
    )
}
