import React from 'react'

export const Website = (props) => {
    return (
        <div className="website-container">
            <a href={props.website} target="_blank" rel="noopener noreferrer" >{props.website}</a>
        </div>
    )
}
