
import React from 'react'

import './ErrorConnecting.css';
import Bubble from './logo.png';

export const ErrorConnecting = () => {
    const retry = () => {
        window.location.pathname = '/';
    }
    return (
        <div className="connection-error">
            <img src={Bubble} alt="logo" />
            <h1>Ooops Error Connecting To The Server At This Time!</h1>
            <button onClick={retry}>Retry</button>
        </div>
    )
}
