import React from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {Error} from './components/error/error';
import {Login} from './components/loginscreen/login'
import {LandingPage} from './components/landingpage/landingpage'
import {Signup} from './components/signupscreen/signup'
import {Home} from './components/homescreen/home'
import {ErrorConnecting} from './components/errorConnectingToServer/ErrorConnecting'
import {Token, setApiKey} from './util/accessInfo'


import { Loading } from './components/loading/loading';
import { Verify } from './components/verifyPage.js/verify';
import { toggleNightMode } from './components/menu/NightMode/nightModeFunction';
import { TermsAndServices } from './components/TermsAndServices/TermsAndServices';
import { PrivacyPolicy } from './components/PrivacyPolicy/PrivacyPolicy';
import { ContentPolicy } from './components/ContentPolicy/ContentPolicy';
import { Recover } from './components/Recover/Recover';
import { RecoveryPasswordUpdate } from './components/RecoveryPasswordUpdate/RecoveryPasswordUpdate';
import './mobileScalingQuirks.css'
import './scalling.css';
import { InstallPrompt } from './components/InstallComponent/InstallPrompt';
import { toggleInstallPopup } from './util/account/updateAccount';
import { Public } from './components/Public/Public';

export const ios = () => {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loggedIn: false, account: {}, friends: [], error: false, errorMessage: "", loading: true, installPrompt: true, deferredPrompt: null}
    this.closeError = this.closeError.bind(this);
    this.throwError = this.throwError.bind(this);
    this.signOut = this.signOut.bind(this);
    this.login = this.login.bind(this);
    this.cancelInstall = this.cancelInstall.bind(this);
    this.install = this.install.bind(this);
    this.disableInstallNotification = this.disableInstallNotification.bind(this);
  }
  
  async componentDidMount() {
    const auth = Token;

    await setApiKey();

    const regex = /\/recovery/

    const isStandalone = window.matchMedia('(display-mode:  standalone)').matches
    
    if (navigator.standalone || isStandalone || ios() || this.state.loggedIn || window.location.pathname !== '/') {
      this.setState({installPrompt: false})
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()

      this.setState({deferredPrompt: e})
    })
    

    if (auth === "undefined" || auth === undefined || !auth) {
      

      const r = /\/post\/\.*/


      if (r.test(window.location.pathname)) {
        this.setState({loggedIn: false, loading: false})
        return;
      }

      if (window.location.pathname !== '/' && window.location.pathname !== '/sign-up' && window.location.pathname !== '/log-in' && window.location.pathname !== '/privacy' && window.location.pathname !== '/terms' && !regex.test(window.location.pathname) && window.location.pathname !== '/recover') {
        window.location.pathname = '/'
      }
      this.setState({loggedIn: false, loading: false})
    } else {
      this.setState({loading: false, loggedIn: true})
    }
    // disable pop up if app installed runs
    window.addEventListener('appinstalled', () => {
      
      this.setState({installPrompt: false, deferredPrompt: null})

    })
   
  }
  disableInstallNotification() {
    if (this.state.loggedIn) {
      toggleInstallPopup().then(res => {
        if (res.error) {
          this.setState({error: true, errorMessage: res.error})
          return
        }
        this.setState({installPrompt: false})
      })
    }
  }
  cancelInstall() {
    this.setState({installPrompt: false})
    this.disableInstallNotification()
  }
  async install() {
    try {
      let deferredPrompt = this.state.deferredPrompt;

    this.setState({installPrompt: false})

    deferredPrompt.prompt()
   
    const {outcome} = await deferredPrompt.userChoice
    console.log(outcome)
    this.setState({deferredPrompt: null})
    this.disableInstallNotification();
    } catch (error) {
      // only purpose to prevent app crash in dev mode
     
      this.setState({error: true, errorMessage: "Sorry not a supported device, support for more devices coming soon!"})
      return
    }
  }
  signOut() {
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    toggleNightMode(false);
    setTimeout(() => {
      this.setState({loggedIn: false});
      window.location.pathname = '/'
    }, 500)
    
  }
  login() {
    
    this.setState({loading: true, loggedIn: true});
    window.location.pathname = '/';
    
  }
  throwError(message) {
    this.setState({error: true, errorMessage: message});
  }
  closeError(e) {
    e.preventDefault();
    this.setState({error: false, errorMessage: ""})
  }
  render() {
    return (
      <>
      <Router>
        
        {this.state.error ? <Error action={this.closeError} message={this.state.errorMessage} /> : null}
        <Switch>
          <Route path='/log-in' exact render={(props) => <Login login={this.login} error={this.throwError} signin={this.signIn} />} />
          <Route path='/sign-up' exact render={(props) => <Signup login={this.login} signup={this.signUp} error={this.throwError} />} />
          <Route path='/verify' exact component={(props) => <Verify />} />
          <Route path='/connection-error' exact component={ErrorConnecting} />
          <Route path='/terms' component={TermsAndServices} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/content" component={ContentPolicy} />
          <Route path="/recover" component={Recover} />
          {!Token ? <Route path="/post/:id" component={Public} /> : null}
          <Route path="/recovery/:id" render={props => <RecoveryPasswordUpdate id={props} />} />
          <Route path="/" render={props => this.state.loggedIn ? <Home install={this.install} signOut={this.signOut} disableInstallNotification={this.cancelInstall} /> : <LandingPage />} />
         
        </Switch>  
      </Router>
      {this.state.installPrompt ? <InstallPrompt install={this.install} cancel={this.cancelInstall} /> : null}
      {this.state.loading ? <Loading /> : null}
      </>
      
    )
  }
}

export default App;
