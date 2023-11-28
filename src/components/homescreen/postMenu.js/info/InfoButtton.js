import React from 'react'

export const InfoButtton = (props) => {
    return (
        <svg onClick={props.onClick} className="post-info-button" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 3.125C12.9199 3.125 3.125 12.9199 3.125 25C3.125 37.0801 12.9199 46.875 25 46.875C37.0801 46.875 46.875 37.0801 46.875 25C46.875 12.9199 37.0801 3.125 25 3.125ZM25 43.1641C14.9707 43.1641 6.83594 35.0293 6.83594 25C6.83594 14.9707 14.9707 6.83594 25 6.83594C35.0293 6.83594 43.1641 14.9707 43.1641 25C43.1641 35.0293 35.0293 43.1641 25 43.1641Z" fill="black"/>
        <path d="M22.6562 16.4062C22.6563 17.0279 22.9032 17.624 23.3427 18.0635C23.7823 18.5031 24.3784 18.75 25 18.75C25.6216 18.75 26.2177 18.5031 26.6573 18.0635C27.0968 17.624 27.3438 17.0279 27.3438 16.4062C27.3438 15.7846 27.0968 15.1885 26.6573 14.749C26.2177 14.3094 25.6216 14.0625 25 14.0625C24.3784 14.0625 23.7823 14.3094 23.3427 14.749C22.9032 15.1885 22.6563 15.7846 22.6562 16.4062V16.4062ZM26.1719 21.875H23.8281C23.6133 21.875 23.4375 22.0508 23.4375 22.2656V35.5469C23.4375 35.7617 23.6133 35.9375 23.8281 35.9375H26.1719C26.3867 35.9375 26.5625 35.7617 26.5625 35.5469V22.2656C26.5625 22.0508 26.3867 21.875 26.1719 21.875Z" fill="black"/>
        </svg>
    )
}
