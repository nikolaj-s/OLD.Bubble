import React from 'react'
import {nightModeCookie, toggleNightMode} from './nightModeFunction'
import './NightMode.css';
import { toggleUserDarkMode } from '../../../util/userpreferences/toggleUserDarkMode';
import { Switch } from '../../homescreen/Switches/Switch';

export const NightMode = () => {

    const [dark, setDark] = React.useState(false)

    if (nightModeCookie === true && dark === false) {
        setDark(true);
        setTimeout(() => {
            document.querySelector('.night-mode-container .component-switch-container').style.justifyContent = 'flex-end'
        })
    }

    const toggleMode = () => {
        if (dark) {
            toggleNightMode(false);
            setDark(false);
            toggleUserDarkMode(false);
        } else {
            toggleNightMode(true);
            setDark(true);
            toggleUserDarkMode(true);
        }
    }
   
    
    return (
        <div className="night-mode-container">
            <p>Night Mode</p>
            <Switch dark={dark} action={toggleMode} />
        </div>
    )
}
