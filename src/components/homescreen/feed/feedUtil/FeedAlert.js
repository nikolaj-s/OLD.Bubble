import React from 'react'

export const FeedAlert = (props) => {
    return (
        <div className="feed-alert-container">
            <p>{props.alert}</p>
        </div>
    )
}
