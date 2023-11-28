import React from 'react';
import './error.css';


export const Error = (props) => {
    return (
        <div className="outer-error-container">
            <div className="error">
                <div className="inner-error">
                    <p>{props.message}</p>
                    <button onClick={props.action}>OK</button>
                </div>
                    
            </div>
        </div>
    )
}