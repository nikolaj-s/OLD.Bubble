import React from 'react'

import './PasswordUtil.css'
import {authorizePassword} from '../../../../../../util/account/updateAccount';
import { verifyPassword } from '../../../../../../util/signUp/signUp';
import { ValidationIndicator } from '../../../../../GlobalUiButtons/ValidationIndicator/ValidationIndicator';

export const PasswordUtil = props => {

    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [correctPassword, setCorrectPassword] = React.useState(false);
    const [newPasswordMsg, setNewPasswordMsg] = React.useState("");
    const [newPasswordError, setNewPasswordError] = React.useState(false)
    const [newPasswordValid, setNewPasswordValid] = React.useState(false);
    const [listening, toggleListening] = React.useState(false)
    const [listeningNewPassoword, toggleNewPasswordListening] = React.useState(false)


    const checkPassword = async () => {
        const data = document.getElementById('current_password').value;
        toggleListening(true);
        if (!data) return;

        const correct = await authorizePassword(data)

        if (correct.error) {
            setError(true);
            setErrorMsg("Incorrect Password")
            return;
        }

        if (correct.correct) {
            setError(false);
            setCorrectPassword(true);
            
        }
    }

    const checkNewPassword = async () => {
        const data = document.getElementById('new_password').value;
        toggleNewPasswordListening(true)
        if (!data) return;
        
        const verified = await verifyPassword(data);

        if (verified.error) {
            setNewPasswordMsg(verified.error);
            setNewPasswordError(true);
            return;
        }

        if (verified.valid) {
            setNewPasswordMsg("");
            setNewPasswordError(false);
            setNewPasswordValid(true);
            props.updatePassword(data);
            return;
        }

    }

    return (
        <div className="edit-password-container">
            <input type="text" autoComplete="username" hidden />
            <div className="input-current-password-container">
                <input onChange={checkPassword} type="password" autoComplete="new-password" id="current_password" placeholder="Current Password" />
                {listening ? <ValidationIndicator loading={correctPassword} /> : null}
            </div>
            {error ? <p>{errorMsg}</p> : null}
            {correctPassword ? 
            <div className="input-current-password-container">
                <input onChange={checkNewPassword} autoComplete="new-password" type="password" id="new_password" placeholder="New Password" />
                {listeningNewPassoword ? <ValidationIndicator loading={newPasswordValid} /> : null}
            </div>
             : null}
            {newPasswordError ? <p>{newPasswordMsg}</p> : null}
            {newPasswordValid ? <p>Save to confirm your changes</p> : null}
        </div>
    )
}
