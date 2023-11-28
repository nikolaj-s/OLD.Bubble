import React from 'react'

import './GroupPostSubMenu.css';

export const GroupPostSubMenu = (props) => {
    return (
        <div className="group-post-submenu-container">
            <div onClick={props.toggle} className="close-group-post-submenu"></div>
            <div className="inner-group-post-submenu-container">
                <button onClick={props.deletePost}>Delete</button>
            </div>
        </div>
    )
}
