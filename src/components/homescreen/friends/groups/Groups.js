

import React from 'react'

import './Group.css';
import { CreateGroupMenu } from './GroupUtil/CreateGroupMenu';
import { Group } from './Group/Group';

export const Groups = (props) => {

        const [menuOpen, OpenMenu] = React.useState(false);

        const openGroupMenu = () => {
            if (menuOpen) return;
            OpenMenu(true);
            setTimeout(() => {
                document.getElementsByClassName('create-group-container')[0].style.top = '50px'
            })
        }

        const closeMenu = () => {
            if (!menuOpen) return;
            document.getElementsByClassName('create-group-container')[0].style.top = '100%'
            setTimeout(() => {
                OpenMenu(false);
            }, 400)
            
        }

        const newGroup = (group) => {
            closeMenu();
            props.newGroup(group);
        }

        return (
            <>
            <div className="groups-title-container">
                <h2>Groups</h2>
            </div>
            {props.groups.map(g => { return <Group updateRecents={props.updateRecents} key={g._id} group={g} />})}
            <button onClick={openGroupMenu} className="create-group-button">
                Create Group
            </button>
            {menuOpen ? <CreateGroupMenu newGroup={newGroup} close={closeMenu} /> : null}
            </>
        )
}
