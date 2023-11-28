import React from 'react'

import './EditPrivaledgeMenu.css';
import { MiniPrivaledgeCard } from './MiniPrivaledgeCard/MiniPrivaledgeCard';
import { CloseButton } from '../../../../../GlobalUiButtons/CloseButton';

export const EditPrivaledgeMenu = (props) => {

    const [selected, setSelected] = React.useState({})
    const [mounted, setMountStatus] = React.useState(false);

    const [change, detectChange] = React.useState(false);

    const privaledges = props.permissions;

    const user = props.user;

    const users_current_permission = user.privaledge;

    if (!mounted) {
        setSelected(users_current_permission);
        setMountStatus(true);
    }

    const updateSelected = (obj) => {
        if (!change) detectChange(true);
        setSelected(obj);
    } 
    
    const apply = () => {
        if (selected.type === user.privaledge.type) return;

        props.assignNewPrivaledge(user, selected);
        props.close();
    }

    return (
        <div className="edit-privaledge-outer-container">
            <CloseButton action={props.close} className="close-privaledge-menu" />
            <div onClick={props.close} className="close-menu-background"></div>
            <div className="edit-privaledge-container">
                <div className="privaledge-info-title">
                    <h4>{user.username}</h4>
                    <h5>Edit Permission's</h5>
                </div>
                <form className="privaledges-list-container">
                    {privaledges.map(per => {
                        return (
                            <MiniPrivaledgeCard selected={per.type === selected.type ? true : false} update={updateSelected} key={per.type} permission={per} />
                        )
                    })}
                </form>
                {change ?
                    <div className="apply-cancel-privaledge-change-container">
                        <button className="left-button-privaledge" onClick={props.close}>Cancel</button>
                        <button className="right-button-privaledge" onClick={apply} >Apply</button>
                    </div>
                : null    
                }
            </div>
        </div>
    )
}
