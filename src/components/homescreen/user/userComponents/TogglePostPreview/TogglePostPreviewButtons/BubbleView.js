import React from 'react'

export const BubbleView = (props) => {

    const toggle  = () => {
        if (!props.alt) {
            return;
        }

        props.togglePrev();
    }
    return (
        <div onClick={toggle} style={{opacity: props.alt ? 0.3 : 1}} className="bubble-view-container-button">
            <svg width="49" height="45" viewBox="0 0 49 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="48" height="44" rx="7.5" fill="white"/>
            <circle cx="24.5" cy="22.5" r="6.5" fill="black"/>
            <circle cx="39.5" cy="22.5" r="6.5" fill="black"/>
            <circle cx="9.5" cy="22.5" r="6.5" fill="black"/>
            <circle cx="16.5" cy="9.5" r="6.5" fill="black"/>
            <path d="M32.5 16C36.0899 16 39 13.0899 39 9.5C39 5.91015 36.0899 3 32.5 3C28.9101 3 26 5.91015 26 9.5C26 13.0899 28.9101 16 32.5 16Z" fill="black"/>
            <circle cx="16.5" cy="35.5" r="6.5" fill="black"/>
            <path d="M32.5 42C36.0899 42 39 39.0899 39 35.5C39 31.9101 36.0899 29 32.5 29C28.9101 29 26 31.9101 26 35.5C26 39.0899 28.9101 42 32.5 42Z" fill="black"/>
            <rect x="0.5" y="0.5" width="48" height="44" rx="7.5" stroke="black"/>
            </svg>

        </div>
    )
}
