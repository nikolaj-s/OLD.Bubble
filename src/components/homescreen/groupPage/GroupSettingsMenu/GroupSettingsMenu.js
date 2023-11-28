import React from 'react'

import './GroupSettingsMenu.css';
import { CloseSubMenuButton } from '../GroupButtons/CloseSubMenuButton/CloseSubMenuButton';
import { ConfirmGroupDelete } from './GroupSettingsUtil/ConfirmGroupDelete';
import { EditPermissions } from './EditPermission/EditPermissions';
import { EditGroupLimit } from './EditGroupLimit/EditGroupLimit';
import { EditGroupName } from './EditGroupName/EditGroupName';
import { EditGroupImage } from './EditGroupImage/EditGroupImage';
import { BanMenu } from './BanMenu/BanMenu';
import { ToggleNotifications } from './ToggleNotifications/ToggleNotifications';

export const GroupSettingsMenu = (props) => {

    const [confirmDeleteMenu, toggleDeleteMenu] = React.useState(false);

    const [banMenuOpen, toggleBanMenu] = React.useState(false);

    const openDeleteMenu = () => {
        toggleDeleteMenu(true);
    }
    
    const abort = () => {
        toggleDeleteMenu(false);
    }

    const deleteGroup = () => {
        props.deleteGroup();
    }

    const openBanMenu = () => {
        toggleBanMenu(true);
    }

    const closeBanMenu = () => {
        toggleBanMenu(false);
    }

    return (
        <div className="group-settings-menu-container">
            <div className="group-settings-nav-container">
                <div className="group-settings-nav">
                    <h2 onClick={closeBanMenu} style={{opacity: !banMenuOpen ? 1 : 0.5, backgroundColor: !banMenuOpen ? 'black' : 'transparent', color: !banMenuOpen ? 'white' : 'black'}}>Settings</h2>
                   {props.auth ? <h2 onClick={openBanMenu} style={{opacity: banMenuOpen ? 1 : 0.5, backgroundColor: banMenuOpen ? 'black' : 'transparent', color: banMenuOpen ? 'white' : 'black'}}>Ban List</h2> : null}
                </div>
                <CloseSubMenuButton action={props.close} />
            </div>
            {!banMenuOpen ?
            <div className='group-inner-settings-container'>
                {confirmDeleteMenu ? <ConfirmGroupDelete delete={deleteGroup} abort={abort} /> : null}
               {props.auth ? <EditGroupImage updateGroupImage={props.updateGroupImage} group_image={props.group_image} /> : null}
                {props.auth ? <EditGroupName editGroupName={props.editGroupName} group_name={props.group_name} /> : null}
                <ToggleNotifications notifications={props.notifications} UpdateNotifications={props.UpdateNotifications} />
                {props.auth ? <EditPermissions 
                deletePrivaledge={props.deletePrivaledge}
                addPrivaledge={props.addPrivaledge} 
                update={props.updatePrivaledge} 
                permissions={props.permissions} 
                /> : null}
                {props.auth ? <EditGroupLimit updateGroupLimit={props.updateGroupLimit} limit={props.limit} /> : null}
               {props.auth ?  <button onClick={openDeleteMenu} >Delete Group</button> : null}
                <div className="group-settings-menu-spacer"></div>
            </div>
            :
            <BanMenu unBanUser={props.unBanUser} banList={props.banList} />
            }
            
            
        </div>
    )
}
