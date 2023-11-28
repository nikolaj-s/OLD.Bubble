import React from 'react'
import { Link } from 'react-router-dom'

import './SupportButton.css';

export const SupportButton = (props) => {

    const openSupportPage = () => {
        props.toggleMenu();
    }

    return (
        <div className="support-button-container">
            <div className="support-circle"></div>
            <Link onClick={openSupportPage} to='/support' className="support-link">Support</Link>
            <div className="support-circle"></div>
        </div>
    )
}
