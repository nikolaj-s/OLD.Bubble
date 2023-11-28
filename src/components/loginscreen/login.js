import React from 'react';
import './login.css';

import { Link } from 'react-router-dom';

import {signIn, setCookie} from '../../util/account/account';
import { Error } from '../error/error';
import { SubLoading } from '../loading/subLoading/SubLoading';
import Recaptcha from 'react-google-recaptcha';
import icon from '../landingpage/logo.png';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: false, errorMessage: "", loading: false, token: ""}
        this.signIn = this.signIn.bind(this);
        this.close = this.close.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
        this.clearToken = this.clearToken.bind(this);
        this.captcha = React.createRef();
    }
    signIn(e) {
        e.preventDefault();
        let email = document.getElementById('email').value.toLowerCase();
        let password = document.getElementById('password').value;
        const user = {
            "email": email,
            "password": password,
            "rec_token": this.state.token
        }
        if (!email || !password) {
            this.setState({error: true, errorMessage: "field cannot be empty"});
            return;
        }
        if (!this.state.token) {
            this.setState({error: true, errorMessage: 'please confirm that your are not a bot'});
            return;
        }
        this.setState({loading: true})
        signIn(user).then(result => {

            if (result.error || result.user) {
                this.setState({error: true, errorMessage: "Email Or Password Is Incorrect", loading: false})
                this.captcha.reset();
            } else {
                setCookie(result.auth_token);
            }
        }).then(() => {
            setTimeout(() => {
                if (!this.state.error) {
                    this.setState({loading: false});
                    this.props.login();
                }
            })
            
        })
    }
    close() {
        this.setState({error: false, errorMessage: ""})
    }
    verifyUser(token) {
        this.setState({token: token})
    }
    clearToken() {
        this.setState({token: ""})
    }
    null(e) {
        e.preventDefault();
    }
    render() {
        return (
            <div className="login-page-container">
                
            <div className="loginPage">
                <div className="header">
                    <img className="logo-icon" src={icon} width="50" height="50" alt={<div></div>} />
                    <h1>LOG IN</h1>
                </div>
               {this.state.loading ? <SubLoading /> : null}
                <form className="signinform">
                    <input id='email' type='text' name="email" placeholder='E-MAIL' />
                    <input autoComplete="password" id='password' name="password" type='password' placeholder='PASSWORD' />
                    <div className="verify-signin">
                    <Recaptcha ref={e => this.captcha = e} onExpired={this.clearToken} onErrored={this.clearToken} sitekey='6LecZaYZAAAAAJJSK1rQzWfhj_Vs6a8CqOtpSxEP' onChange={this.verifyUser} />
                    </div>
                    {this.state.token ? <button onClick={this.signIn} type='submit'>SIGN IN</button> : 
                    <button onClick={this.null} id="null-button">SIGN IN</button>}
                    <Link className="forgot-password-button" to='/recover'>Forgot Password</Link>
                </form>
                <h2>NO ACCOUNT, NO PROBLEM!</h2>
                {this.state.error ? <Error message={this.state.errorMessage} action={this.close} /> : null}
                <Link to='/sign-up'><button  id="signup" >SIGN UP</button></Link>
                <div className="spacer">

                </div>
            </div>
            <div className="landing-page-bubbles-container">
                    <div className="loading-container">
                        <div className="bub-1 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-2 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-3 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-4 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-5 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-6 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-7 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-8 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-9 buble">
                            <div className="laccent"></div>
                        </div>
                        <div className="bub-10 buble">
                            <div className="laccent"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}