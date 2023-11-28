import React from 'react'

export const LikePost = (props) => {
    const like = (e) => {
        e.stopPropagation();
        props.like(e)
    }
    return (
        <>
        {
        !props.liked ? 
        <svg onClick={like} className="liked-post" width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 29.7L16.4 29.2C3.5 18.7 0 15 0 9C0 4 4 0 9 0C13.1 0 15.4 2.3 17 4.1C18.6 2.3 20.9 0 25 0C30 0 34 4 34 9C34 15 30.5 18.7 17.6 29.2L17 29.7ZM9 2C5.1 2 2 5.1 2 9C2 14.1 5.2 17.5 17 27.1C28.8 17.5 32 14.1 32 9C32 5.1 28.9 2 25 2C21.5 2 19.6 4.1 18.1 5.8L17 7.1L15.9 5.8C14.4 4.1 12.5 2 9 2Z" fill="black"/>
        </svg>
        :
        <svg onClick={like} className="liked-post" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M33.0001 7.64C31.6601 4.89 27.8001 2.64 23.3101 3.95C21.1646 4.56974 19.2926 5.89879 18.0001 7.72C16.7076 5.89879 14.8357 4.56974 12.6901 3.95C8.19011 2.66 4.34011 4.89 3.00011 7.64C1.12011 11.49 1.90011 15.82 5.32011 20.51C8.00011 24.18 11.8301 27.9 17.3901 32.22C17.5658 32.357 17.7823 32.4315 18.0051 32.4315C18.2279 32.4315 18.4444 32.357 18.6201 32.22C24.1701 27.91 28.0101 24.22 30.6901 20.51C34.1001 15.82 34.8801 11.49 33.0001 7.64V7.64Z" fill="black"/>
        </svg>
          
        }
        </>
    )
}
