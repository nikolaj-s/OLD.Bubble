import React from 'react';
import './nav.css';
import { Link} from 'react-router-dom';
import { imageNightMode } from '../menu/NightMode/nightModeFunction';
import { HomeButton } from '../bottomNav/home';
import { FriendsButton } from '../bottomNav/friends';
import { PostButton } from '../bottomNav/postButton/postButton';
import history from '../history';

const MenuButton = (props) => {
    return (
        <div className='nav-button-container'>
        <svg className="menu-button" onClick={props.toggle} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31.25 37.5C32.4006 37.5 33.3333 38.4327 33.3333 39.5833V39.5833C33.3333 40.7339 32.4006 41.6667 31.25 41.6667H12.5C11.3494 41.6667 10.4167 40.7339 10.4167 39.5833V39.5833C10.4167 38.4327 11.3494 37.5 12.5 37.5H31.25ZM41.6667 22.9167C42.8173 22.9167 43.75 23.8494 43.75 25V25C43.75 26.1506 42.8173 27.0833 41.6667 27.0833H8.33333C7.18274 27.0833 6.25 26.1506 6.25 25V25C6.25 23.8494 7.18274 22.9167 8.33333 22.9167H41.6667ZM37.5 8.33333C38.6506 8.33333 39.5833 9.26607 39.5833 10.4167V10.4167C39.5833 11.5673 38.6506 12.5 37.5 12.5H18.75C17.5994 12.5 16.6667 11.5673 16.6667 10.4167V10.4167C16.6667 9.26607 17.5994 8.33333 18.75 8.33333H37.5Z" fill="black"/>
</svg>

        </div>
    )
}
const NotificationButton = (props) => {
    return (
        <div onClick={props.toggle} className="nav-button-container">
        <div  className="notification-button">
            <div style={{filter: imageNightMode()}} className="notification-counter">
                <p>{null}</p>
            </div>
           
            <svg className="notification-button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C13.1 22 14 21.1 14 20H9.99999C9.99999 20.5304 10.2107 21.0391 10.5858 21.4142C10.9609 21.7893 11.4696 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.62999 5.36 5.99999 7.92 5.99999 11V16L4.70999 17.29C4.07999 17.92 4.51999 19 5.40999 19H18.58C19.47 19 19.92 17.92 19.29 17.29L18 16Z" fill="black"/>
            </svg>
        </div>
        </div> 

    )
}
const Profile = props => {
    return (
        <svg className="profile-button" width="50" height="46" viewBox="0 0 50 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 0C21.5909 0 18.9276 1.20018 17.0099 3.60054C15.0923 6.00091 14.1335 9.06929 14.1335 12.8057C14.1098 17.4479 15.6723 21.1277 18.821 23.8451C19.2235 24.2074 19.3655 24.6717 19.2472 25.2378L18.4304 26.8682C18.17 27.4117 17.7853 27.8363 17.2763 28.142C16.7673 28.4477 15.696 28.8836 14.0625 29.4497C13.9915 29.4724 12.4941 29.9366 9.57031 30.8424C6.64654 31.7482 5.08996 32.2464 4.90057 32.337C2.91193 33.1295 1.60985 33.9561 0.994318 34.8166C0.331439 36.2432 0 39.8551 0 45.6522H50C50 39.8551 49.6686 36.2432 49.0057 34.8166C48.3902 33.9561 47.0881 33.1295 45.0994 32.337C44.91 32.2464 43.3535 31.7482 40.4297 30.8424C37.5059 29.9366 36.0085 29.4724 35.9375 29.4497C34.304 28.8836 33.2327 28.4477 32.7237 28.142C32.2147 27.8363 31.83 27.4117 31.5696 26.8682L30.7528 25.2378C30.6345 24.6717 30.7765 24.2074 31.179 23.8451C34.3277 21.1277 35.8902 17.4479 35.8665 12.8057C35.8665 9.06929 34.9077 6.00091 32.9901 3.60054C31.0724 1.20018 28.4091 0 25 0Z" fill="black"/>
        </svg>

    )
}
export class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.openProfile = this.openProfile.bind(this);
        this.feed = this.feed.bind(this);
    }
    openProfile() {
        if (!this.props.username) {
            return;
        }
        window.location.pathname = `/user/${this.props.username}`
    }
    feed() {
        if (window.location.pathname === '/') {
            document.getElementsByClassName('feed-container')[0].scrollTo(0, 0);
            setTimeout(() => {
                this.props.refreshFeed();
            }, 700)
            return;
        }
        history.push('/');
    }
    create_account() {
        window.location.pathname = "/sign-up"
    }
    render() {
        return (
            <nav className="nav-container">
                <Link className="nav-title" to="/"><h1 className="app-title">BUBBLE</h1></Link>
                
                <div className="nav-buttons">
                    
                    {!this.props.public ? 
                    <>
                    <HomeButton action={this.feed} className="home-button-desktop desktop-nav-icons"/>
                    <FriendsButton className="friend-button-desktop desktop-nav-icons" />
                    
                    <NotificationButton toggle={this.props.toggleNotifications} count={this.props.count} />
                    <Link to={`/user/${this.props.username}`} className="profile-button-container" >
                        {this.props.image ? <img src={this.props.image} style={{filter: imageNightMode()}} className="profile-button" alt="profile" /> : <Profile />}
                    </Link>

                    <PostButton toggle={this.props.openPostMenu} className="desktop-nav-icons" />

                    <MenuButton toggle={this.props.toggle} />
                    </>
                : 
                   null
                }
                    
                </div>
                
            </nav>
        )
    }
}
