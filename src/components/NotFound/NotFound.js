import React from 'react'
import './NotFound.css'

import history from '../history'

export const NotFound = () => {
    const goback = () => {
        history.push('/');
    }
    return (
        <div className="error404">
            <h2>OOOPS! Looks like what you are looking for does not exist!</h2>
            <button onClick={goback} className="goback">BACK</button>
        </div>
    )
}
