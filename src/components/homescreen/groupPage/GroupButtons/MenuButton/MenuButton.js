import React from 'react'

import './MenuButton.css';

export const MenuButton = props => {
    return (
        <div onClick={props.toggle} className="group-menu-button">
            <svg width="8" height="29" viewBox="0 0 8 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4.25L3 14.5L8 24.75L7 28.85L0 14.5L7 0.15L8 4.25Z" fill="white"/>
            </svg>
        </div>
    )
}
