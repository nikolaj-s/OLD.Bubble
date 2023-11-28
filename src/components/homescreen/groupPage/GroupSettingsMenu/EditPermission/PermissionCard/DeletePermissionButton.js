import React from 'react'

export const DeletePermissionButton = (props) => {
    return (
        <div onClick={props.action} className="delete-group-permission-container">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
            <path d="M11.5 -0.0310059C9.542 -0.0310059 7.969 1.59599 7.969 3.56299V3.99999H4C3.449 3.99999 3 4.44899 3 4.99999V5.99999H2V7.99999H4V23C4 24.645 5.355 26 7 26H19C20.645 26 22 24.645 22 23V7.99999H24V5.99999H23V4.99999C23 4.44899 22.551 3.99999 22 3.99999H18.031V3.56199C18.031 1.59599 16.458 -0.0310059 14.5 -0.0310059H11.5ZM11.5 2.03099H14.5C15.304 2.03099 15.969 2.68699 15.969 3.56199V3.99999H10.03V3.56199C10.03 2.68699 10.695 2.03199 11.499 2.03199L11.5 2.03099ZM6 7.99999H11.125C11.249 8.01299 11.372 8.03099 11.5 8.03099H14.5C14.628 8.03099 14.75 8.01299 14.875 7.99999H20V23C20 23.563 19.563 24 19 24H7C6.437 24 6 23.563 6 23V7.99999ZM8 9.99999V22H10V9.99999H8ZM12 9.99999V22H14V9.99999H12ZM16 9.99999V22H18V9.99999H16Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0">
            <rect width="26" height="26" fill="white"/>
            </clipPath>
            </defs>
            </svg>

        </div>
    )
}
