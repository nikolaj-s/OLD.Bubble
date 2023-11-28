import React from 'react'

import './LeaveGroupButton.css';

export const LeaveGroupButton = (props) => {
    return (
        <div onClick={props.action} className="leave-group-button-container">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.835 2.5H4.16838C3.24921 2.5 2.50171 3.2475 2.50171 4.16667V7.5H4.16838V4.16667H15.835V15.8333H4.16838V12.5H2.50171V15.8333C2.50171 16.7525 3.24921 17.5 4.16838 17.5H15.835C16.7542 17.5 17.5017 16.7525 17.5017 15.8333V4.16667C17.5017 3.2475 16.7534 2.5 15.835 2.5Z" fill="#FF0000"/>
            <path d="M9.16667 13.3333L13.3333 10L9.16667 6.66667V9.16751H2.5V10.8342H9.16667V13.3333Z" fill="#FF0000"/>
            </svg>
        </div>
    )
}
