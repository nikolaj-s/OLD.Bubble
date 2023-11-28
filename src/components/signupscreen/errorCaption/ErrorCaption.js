import React from 'react'

export const ErrorCaption = (props) => {
    return (
        <h5 style={{color: props.message === 'Valid' ? 'green' : 'black'}} className="error-caption">{props.message}</h5>
    )
}
