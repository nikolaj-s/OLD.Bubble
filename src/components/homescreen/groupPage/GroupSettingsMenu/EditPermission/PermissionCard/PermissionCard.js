import React from 'react'

import './PermissionCard.css';
import { DeletePermissionButton } from './DeletePermissionButton';

export const PermissionCard = (props) => {

    let [update, setUpdate] = React.useState(false);

    const perm = props.permission;

    let [can_post, toggleCanPost] = React.useState(perm.can_post);

    let [can_invite, toggleCanInvite] = React.useState(perm.can_invite);

    let [can_update_image, toggleCanUpdateImage] = React.useState(perm.can_update_image);

    let [can_update_group_name, toggleCanUpdateName] = React.useState(perm.can_update_name);

    let [can_assign_privaledge, toggleCanAssignPrivaledge] = React.useState(perm.can_update_perms);

    let [can_ban_users, toggleCanBanUsers] = React.useState(perm.can_ban_users);

    const toggle_can_post = () => { can_post ? toggleCanPost(false) : toggleCanPost(true)};

    const toggle_can_invite = () => {can_invite ? toggleCanInvite(false) : toggleCanInvite(true)};

    const toggle_can_update_image = () => {can_update_image ? toggleCanUpdateImage(false) : toggleCanUpdateImage(true)};

    const toggle_can_update_group_name = () => {can_update_group_name ? toggleCanUpdateName(false) : toggleCanUpdateName(true)};

    const toggle_can_assign_privaledge = () => {can_assign_privaledge ? toggleCanAssignPrivaledge(false) : toggleCanAssignPrivaledge(true)};

    const toggle_can_ban_users = () => {can_ban_users ? toggleCanBanUsers(false) : toggleCanBanUsers(true)};

    const change = () => {
        setUpdate(true);
    }

    const updatePermission = () => {
        const obj = {
            type: perm.type,
            can_post: can_post,
            can_invite: can_invite,
            can_update_image: can_update_image,
            can_update_name: can_update_group_name,
            can_update_perms: can_assign_privaledge,
            can_ban_users: can_ban_users
        }
        setUpdate(false);
        props.update(obj);
    }

    const deletePrivaledge = () => {
        props.delete(perm);
    }

    return (
        <div className="permission-card-container">
            <h4>{perm.type}</h4>
            {perm.type !== "Guest" ? !update ? <DeletePermissionButton action={deletePrivaledge} /> : null : null}
            {update ? <h5 onClick={updatePermission} className="update-button">Update</h5> : null}
            <div className="permission-options-container">
                <div className="option-perm-container">
                    <label htmlFor="can-post">User can post</label>
                    <input onChange={change} name="can-post" defaultChecked={can_post} onClick={toggle_can_post} type="checkbox" readOnly={true} />
                </div>
                <div className="option-perm-container">
                    <label htmlFor="can-invite">Can Update Name</label>
                    <input onChange={change} name="can-invite" defaultChecked={can_update_group_name} onClick={toggle_can_update_group_name} type="checkbox" readOnly={true} />
                </div>
                <div className="option-perm-container">
                    <label htmlFor="can-invite">User can invite others</label>
                    <input onChange={change} name="can-invite" defaultChecked={can_invite} onClick={toggle_can_invite} type="checkbox" readOnly={true} />
                </div>
                <div className="option-perm-container">
                    <label htmlFor="can-invite">Can Ban Users</label>
                    <input onChange={change} name="can-invite" defaultChecked={can_ban_users} onClick={toggle_can_ban_users} type="checkbox" readOnly={true} />
                </div>
                <div className="option-perm-container">
                    <label htmlFor="can-invite">Can Update Group Image</label>
                    <input onChange={change} name="can-invite" defaultChecked={can_update_image} onClick={toggle_can_update_image} type="checkbox" readOnly={true} />
                </div>
                <div className="option-perm-container">
                    <label htmlFor="can-invite">Can Assign Privaledge's</label>
                    <input onChange={change} name="can-invite" defaultChecked={can_assign_privaledge} onClick={toggle_can_assign_privaledge} type="checkbox" readOnly={true} />
                </div>
           </div>
        </div>
    )
}
