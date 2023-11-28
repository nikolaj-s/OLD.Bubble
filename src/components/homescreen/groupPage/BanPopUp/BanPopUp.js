import React from 'react'

import './BanPopUp.css';

export const BanPopUp = (props) => {

    const exit = () => {
        window.location.pathname = '/friends';
    }

    return (
        <div className="ban-pop-up-container">
            <div className="inner-ban-pop-up-container">
                <h2>You Have Been Banned</h2>
                <p>Reason: {props.reason}</p>
                <button onClick={exit} >Ok</button>
            </div>
        </div>
    )
}
