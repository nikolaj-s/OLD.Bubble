import React from 'react'
import history from '../../../../history';

import './NsfwAccountAlert.css';

export const NsfwAccountAlert = (props) => {

    const goBack = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div className="nsfw-account-alert-outer-container">
            <div className="nsfw-account-alert-inner-container">
                <p>This Account May Contain Not Safe For Work Content !</p>
                <button onClick={goBack}>Go Back</button>
                <button onClick={props.close}>Continue</button>
            </div>
        </div>
    )
}
