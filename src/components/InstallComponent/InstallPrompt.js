import React from 'react'

import './InstallPrompt.css'

export const InstallPrompt = (props) => {
    return (
        <div className="install-prompt-container">
            <h3>Install the Bubble progressive web app to get the best user experience!</h3>
            <button onClick={props.install} className="install-button">Install</button>
            <button onClick={props.cancel}>Cancel</button>
        </div>
    )
}
