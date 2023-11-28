import React from 'react'

export const SentNotification = (props) => {
    return (
        <div className="sent-container">
            <h3>{props.message}</h3>
        </div>
    )
}
