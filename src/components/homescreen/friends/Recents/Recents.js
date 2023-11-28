
import React from 'react'

import './Recents.css';
import { Recent } from './Recent';

export const Recents = (props) => {
    return (
        <>
        <div className="friend-title-container recents-title-container">
            <h2>Recents</h2>
        </div>
        <div className="recents-container">
            {
                props.recents.map(recent => {
                    return (
                        <Recent updateRecent={props.updateRecents} key={recent._id ? recent._id : recent.messageId} recent={recent} />
                    )
                })
            }
        </div>
        <button onClick={props.clearRecents} className="clear-recents">Clear</button>
        </>
    )
}
