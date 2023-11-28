import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { sendRecoveryEmail } from '../../util/account/recover';
import { CopyRight } from '../copyRight/CopyRight';
import { Error } from '../error/error';
import { SubLoading } from '../loading/subLoading/SubLoading';

import './Recover.css';

export const Recover = (props) => {
    const [token, setToken] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [sent, toggleSent] = React.useState(false);

    const [email, setEmail] = React.useState("");

    const [error, setError] = React.useState(false);

    const emailInput = (e) => {
        setEmail(e.currentTarget.value);
    }

    const send = () => {
        setLoading(true);
        if (!token || !email) return;
        sendRecoveryEmail(email, token).then(res => {
            console.log(res);
            if (res.error) {
                setLoading(false);
                setError(res.error);
                return;
            }
            setLoading(false);
            toggleSent(true)
        })
    }

    const clearToken = () => {
        setToken('');
    }

    const updateToken = (key) => {
        setToken(key);
    }  

    const closeError = () => {
        setError(false);
    }

    return (
        <div className="recover-account-container">
            <div className="inner-recover-container">
                <h2>Account Recovery</h2>
               {!sent ? 
               <>
               <input onChange={emailInput} placeholder="Email" type="text" id="email-recovery" />
                <p>If an account exists with the above email address, you will recieve a recovery link.</p>
                <ReCAPTCHA onExpired={clearToken} onErrored={clearToken} onChange={updateToken}  sitekey="6LepHcsZAAAAAEBJ5OHqeyCVPMPii9hjqh2h68EB" />
                <button onClick={send} className={!token || !email ? 'not-valid-button' : 'valid-button'} >Send</button>
                </>
                : <p>Check your email for a recovery link, if you dont see an email check your spam folder</p>}
                <CopyRight />
                {loading ? <SubLoading /> : null}
                {error ? <Error message={error} action={closeError} /> : null}
            </div>
        </div>
    )
}
