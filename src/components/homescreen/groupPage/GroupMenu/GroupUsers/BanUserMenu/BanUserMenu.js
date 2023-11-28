import React from 'react'

import './BanUserMenu.css';
import { CloseButton } from '../../../../../GlobalUiButtons/CloseButton';

export const BanUserMenu = (props) => {

    const banUser = () => {
        const banMessage = document.getElementById('ban-reason').value;
        props.banUser(banMessage);
    }

    return (
        <div className="ban-group-user-container">
            <div onClick={props.close} className="close-ban-menu"></div>
            <div className="inner-ban-group-user-container">
            <CloseButton action={props.close} className="close-privaledge-menu" />
            <h4>Ban {props.user.username}</h4>
                <textarea maxLength="150" id="ban-reason" placeholder="Ban Reason">
                </textarea>
                <div className="ban-buttons-container">
                    <button onClick={props.close} className="cancel-ban">Cancel</button>
                    <button onClick={banUser} className="ban-user">Ban</button>
                </div>
            </div>
        </div>
    )
}
