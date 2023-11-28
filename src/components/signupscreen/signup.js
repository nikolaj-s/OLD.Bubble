import React from 'react';

import './signup.css'

import {signUp, verifyUsername, verifyPassword, verifyEmail} from '../../util/signUp/signUp';
import {setCookie} from '../../util/account/account'
import { Error } from '../error/error';
import { ErrorCaption } from './errorCaption/ErrorCaption';

import Recaptcha from 'react-google-recaptcha';
import { BackButton } from '../icons/BackButton';
import { Link } from 'react-router-dom';
import { SubLoading } from '../loading/subLoading/SubLoading';

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            error: false, 
            errorMessage: "", 
            usernameError: false, 
            usernameErrorMsg: "", 
            passwordError: false, 
            passwordErrorMsg: "",
            emailError: false,
            emailErrorMsg: "",
            token: "",
            accepted_terms: false,
            over_13: false,
            loading: false
        }
        this.Recaptcha = React.createRef();
        this.sign_Up = this.sign_Up.bind(this);
        this.close = this.close.bind(this);
        this.verifyUsername = this.verifyUsername.bind(this);
        this.verifyPassword = this.verifyPassword.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
        this.clearToken = this.clearToken.bind(this);
        this.over13 = this.over13.bind(this);
        this.agreeToTerms = this.agreeToTerms.bind(this);
        this.setToken = this.setToken.bind(this);
    }
    sign_Up(e)  {
        e.preventDefault();
        const name = document.getElementById('name').value.toLowerCase();
        const email = document.getElementById('email').value.toLowerCase();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (!this.state.token) {
            this.setState({error: true, errorMessage: "Please verify that you are not a bot"});
            return;
        }
        if (!password || !name || !username || !name) {
            this.setState({error: true, errorMessage: "Empty field"})
            return
        }

        if (!this.state.accepted_terms) {
            this.setState({error: true, errorMessage: 'you must accept the terms and services agreement'});
            return;
        }

        if (!this.state.over_13) {
            this.setState({error: true, errorMessage: 'you must be over the age of 13 to create an account'});
            return;
        }

        const user = {
            "name": name,
            "email": email,
            "username": username,
            "password": password,
            "rec_token": this.state.token,
            "agreedToTerms": this.state.accepted_terms,
            "over_13": this.state.over_13
        }
        this.setState({loading: true});
        
        signUp(user).then(res => {
            console.log(res);
            if (res.error) {
                this.setState({error: true, errorMessage: user.error, loading: false})
                this.Recaptcha.reset();
                return;
            }

           setCookie(res.token);

           setTimeout(() => {
            window.location.pathname = '/';
           }, 200)
            
        })
    }
    close() {
        this.setState({error: false, errorMessage: ""})
    }
    verifyPassword() {
        const password = document.getElementById('password').value;
        if (!password) return;
        verifyPassword(password).then(res => {
            if (res.error) {
                this.setState({passwordError: true, passwordErrorMsg: res.error})
            }
            if (res.valid === true) {
                this.setState({passwordError: true, passwordErrorMsg: 'Valid'})
            }
        })
    }
    verifyUsername() {
        const username = document.getElementById('username').value;
        if (!username) return;
        verifyUsername(username).then(res => {
            if (res.error) {
                this.setState({usernameError: true, usernameErrorMsg: res.error})
            }
            if (res.valid === true) {
                this.setState({usernameError: true, usernameErrorMsg: "Valid"})
            }
            
        })
    }
    verifyEmail() {
        const email = document.getElementById('email').value;
        if (!email) return;
        verifyEmail(email).then(res => {
            if (res.error) {
                
                this.setState({emailError: true, emailErrorMsg: res.error});
                return;
            }
            if (res.valid) {
                this.setState({emailError: true, emailErrorMsg: "Valid"});
            }
        })
    }
    setToken(token) {
      
        this.setState({token: token});
    }
    clearToken() {
        this.setState({token: ""})
    }
    agreeToTerms() {
        if (this.state.accepted_terms) {
            this.setState({accepted_terms: false});
        } else {
            this.setState({accepted_terms: true});
        }
    }
    over13() {
        if (this.state.over_13) {
            this.setState({over_13: false})
        } else {
            this.setState({over_13: true});
        }
    }
    preventDefault(e) {
        e.preventDefault();
    }
    render() {
        return(
            <div className="signupPage">
                <div className="signup-container">
                    <BackButton className="sign-up-page-back-button"/>
                    <h1>SIGN UP</h1>
                    {this.state.error ? <Error message={this.state.errorMessage} action={this.close} />: null}
                    <form className="signUp">
                        <input id="name" type='text' placeholder='NAME' required />
                        <input onBlur={this.verifyEmail} id='email' type='text' placeholder='E-MAIL' required />
                        {this.state.emailError ? <ErrorCaption message={this.state.emailErrorMsg} /> : null}
                        <input onBlur={this.verifyUsername} id='username' type='text' maxLength="12" minLength="3" placeholder='USER NAME' required/>
                        {this.state.usernameError ? <ErrorCaption message={this.state.usernameErrorMsg} /> : null}
                        <input onBlur={this.verifyPassword} id='password' type='password' placeholder='PASSWORD' required />
                        {this.state.passwordError ? <ErrorCaption message={this.state.passwordErrorMsg} /> : null}
                        <input id="confirm-password" type="password" placeholder="CONFIRM PASSWORD" />
                        {this.state.confirmedPasswordError ? <ErrorCaption message={this.state.confirmPasswordMsg} /> : null}
                        <div className="accept-terms">
                            
                            <input onClick={this.over13} id='over-age' name='accept' type='checkbox' required/>
                            <label htmlFor='over-age'>I am over the age of 13</label>
                        </div>
                        <div className="accept-terms">
                            
                            <input onClick={this.agreeToTerms} id='accept' name='accept' type='checkbox' required/>
                            <label htmlFor='accept'>I Have Read and I Agree to the <Link to='/terms'>Terms and Services</Link> And <Link to='/privacy'>Privacy Policy</Link></label>
                        </div>
                        <div className="verify-captcha">
                            <Recaptcha ref={e => this.Recaptcha = e} onChange={this.setToken} onExpired={this.clearToken} onErrored={this.clearToken} sitekey="6LfPcKYZAAAAAJgYfQPJXt-ASRuGDdRITpaobd-F" />
                        </div>
                        {this.state.token !== "" && this.state.emailErrorMsg === 'Valid' && this.state.usernameErrorMsg === 'Valid' && this.state.passwordErrorMsg === "Valid" && this.state.accepted_terms && this.state.over_13 ?
                        <button onClick={this.sign_Up} type='submit'>CREATE ACCOUNT</button>
                         :
                         <button onClick={this.preventDefault} id="null-button" type='submit'>CREATE ACCOUNT</button>
                         }
                        
                        
                    </form>
                    
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
                {this.state.loading ? <SubLoading /> : null}
            </div>
        )
    }
}