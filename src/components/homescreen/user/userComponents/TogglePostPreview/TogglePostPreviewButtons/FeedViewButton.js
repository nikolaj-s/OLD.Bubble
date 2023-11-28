import React from 'react'

export const FeedViewButton = (props) => {
    const toggle = () => {
        if (props.alt) {
            return;
        }

        props.togglePrev();
    }
    return (
        <div onClick={toggle} style={{opacity: props.alt ? '1' : '0.3'}} className="feed-view-button-container">
            <svg width="49" height="45" viewBox="0 0 49 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41 0.5H8C3.85786 0.5 0.5 3.85786 0.5 8V37C0.5 41.1421 3.85786 44.5 8 44.5H41C45.1421 44.5 48.5 41.1421 48.5 37V8C48.5 3.85786 45.1421 0.5 41 0.5Z" stroke="black"/>
            <rect x="4" y="2" width="41" height="12" rx="2" fill="black"/>
            <rect x="4" y="15" width="41" height="15" rx="2" fill="black"/>
            <rect x="4" y="31" width="41" height="12" rx="2" fill="black"/>
            </svg>

        </div>
    )
}
