import React from 'react'
import { ios } from '../../../App'
import './InstallPWA.css'


export const InstallPwa = (props) => {
    return (
        <div className="install-pwa-container">
            <div className="install-pwa-info-container">
                <p>{ios() ? "For the best experience on ios, add the application to the homescreen via safari !" : "Install the dedicated app for the best experience *must be using chrome"}</p>
            </div>
            {ios() ? <div></div> : <button onClick={props.install}>Install</button>}
        </div>
    )
}
