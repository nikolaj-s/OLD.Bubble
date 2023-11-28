import React from 'react'

import './Group.css';
import { imageNightMode } from '../../../../menu/NightMode/nightModeFunction';
import history from '../../../../history';

export const Group = (props) => {

    const open = () => {
        history.push({pathname: `/group/${props.group.group_name}`, state: props.group._id})
        props.updateRecents(props.group);
    }

    return (
        <div onClick={open} className="group">
            {props.group.group_image ? <img style={{filter: imageNightMode()}} src={props.group.group_image} alt={<div></div>} />
            :
            <div style={{width: 70, height: 70, borderRadius: '50%', border: 'solid black 2px', opacity: 0.5, backgroundColor: 'white'}}></div>
            }
            <h3>{props.group.group_name}</h3>
        </div>
    )
}
