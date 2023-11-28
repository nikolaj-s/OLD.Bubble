import React from 'react'

import './EditPermissions.css';
import { PermissionCard } from './PermissionCard/PermissionCard';

import './EditPermissions.css';
import { AddPermissionMenu } from './AddPermissionMenu/AddPermissionMenu';

export const EditPermissions = (props) => {

    const [newPermissionMenuOpen, openNewPermissionMenuOpen] = React.useState(false);

    const togglePermissionMenu = () => {
        if (newPermissionMenuOpen) {
            openNewPermissionMenuOpen(false)
        } else {
            openNewPermissionMenuOpen(true);
        }
    }

    const perms = props.permissions;

    const addPermission = (obj) => {
        openNewPermissionMenuOpen(false);
        props.addPrivaledge(obj);
    }

    return (
        <div className="edit-permissions-container">
            <h3>Permissions</h3>
            {perms.map(permission => <PermissionCard delete={props.deletePrivaledge} update={props.update} key={permission.type} permission={permission} />)}
            {newPermissionMenuOpen ? <AddPermissionMenu addPermission={addPermission} /> : null}
            <button onClick={togglePermissionMenu}>Add Permission Group</button>
        </div>
    )
}
