import React from 'react'

import './GroupNameContainer.css';
import { CloseGroupButton } from '../GroupButtons/CloseGroupButton/CloseGroupButton';
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';

export const GroupNameContainer = (props) => {
    return (
        <div className="group-name-container">
            {!props.loading ? 
            <div className="group-tab-image-container">
                <img style={{filter: imageNightMode()}} src={props.image} alt={<div></div>} />
            </div>
            :
            <div className="group-tab-image-loading loading-gradient"></div>
            }
            {props.loading ? 
            <div className="group-name-loading loading-gradient"></div> 
            : 
            <h3 className="group-name">{props.group_name}</h3>}
            <CloseGroupButton />
        </div>
    )
}
