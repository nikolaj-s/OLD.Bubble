import React, { Component } from 'react'

import './verify.css';

import {verify, reSend} from '../../util/verificationComs';


export class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false, sent: false}
        this.verify = this.verify.bind(this);
        this.reSendEmail = this.reSendEmail.bind(this);
    }
    reSendEmail() {
        reSend()
        this.setState({sent: true})
        setTimeout(() => {
            this.setState({sent: false})
        }, 500);
    }
    verify() {
        const code = document.getElementById('verify').value 
        if (!code) {
            return;
        }
        verify(code).then(res => {
            if (res.error) {
                this.setState({error: true})
                document.getElementById('verify').value = ''
                return;
            }
            window.location.pathname = '/'
        })
    }
    backOut() {
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.pathname = '/'
    }
    render() {
        return (
            <div className="verify-page">
                <h1>Verify</h1>
                <p>Please check your email for a verification code.</p>
                <div className="verify-container">
                    <input id="verify"></input>
                    {this.state.error ? <p className="error-verify-message">! Incorrect key</p> : null}
                </div>
                <h5><span onClick={this.reSendEmail} className="re-send">Re-send</span> verification email</h5>
                {
                this.state.sent ? 
                <div className="email-resent">
                    <p>Email Sent</p>
                </div>
                :
                null
                }
                <button onClick={this.verify} className="verify">VERIFY</button>
                <h3 onClick={this.backOut} >Back</h3>
            </div>
        )
    }
}
