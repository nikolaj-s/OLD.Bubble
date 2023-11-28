import React from 'react'

import './UserSubMenu.css';
import { CloseButton } from '../../../../../../GlobalUiButtons/CloseButton';

export const UserSubMenu = (props) => {
    return (
        <div className="group-user-sub-menu">
            <div onClick={props.close} className="close-group-sub-menu"></div>
            <CloseButton action={props.close} className="close-privaledge-menu" />
            <div className="inner-group-user-submenu">
                {props.can_update ? <button onClick={props.selectUser} className="edit-user-perms-button">Edit Permissions</button> : null}
                {props.can_ban ? <button onClick={props.banUser} className="ban-user-button">Ban User</button> : null}
            </div>
        </div>
    )
}
