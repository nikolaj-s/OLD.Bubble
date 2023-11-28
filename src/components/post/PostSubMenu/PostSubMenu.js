import React from 'react'

import './PostSubMenu.css';

export const PostSubMenu = (props) => {
    return (
        <div className="outer-post-submenu-expanded-post">
            <div onClick={props.toggle} className="close-post-submenu-expanded-post"></div>
            <div className="inner-post-submenu-expanded-post">
                <button onClick={props.openReportMenu}>Report Post</button>
            </div>
        </div>
    )
}
