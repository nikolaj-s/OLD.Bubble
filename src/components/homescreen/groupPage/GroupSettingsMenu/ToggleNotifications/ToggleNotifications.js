import React from 'react'

import './ToggleNotifications.css';
import { Switch } from '../../../Switches/Switch';

export const ToggleNotifications = (props) => {

    if (props.notifications) {
        try {
        setTimeout(() => {
            document.querySelector('.toggle-group-notifications-container .component-switch-container').style.justifyContent = 'flex-end';
        }, 20)
    } catch (e) {
        return
    }
    }

    return (
        <div className="toggle-group-notifications-container">
            <h4>Toggle Group Notifications</h4>
            <Switch action={props.UpdateNotifications} dark={props.notifications} />  
        </div>
    )
}
