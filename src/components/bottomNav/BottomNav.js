import React, { Component } from 'react'
import './BottomNav.css';
import { HomeButton } from './home';
import { FriendsButton } from './friends';
import history from '../history'
import { PostButton } from './postButton/postButton';

export default class BottomNav extends Component {
    constructor(props) {
        super(props);
        this.goHome = this.goHome.bind(this);
    }
    goHome() {
        if (window.location.pathname !== '/') {
            history.push('/')
        } else {
            document.getElementsByClassName('feed-container')[0].scrollTo(0, 0)
            setTimeout(() => {
                this.props.refreshFeed();
            }, 6)
            
        }
    }
    render() {
        return (
            <div id="bottom-nav-visible" className="bottomNav">
                <div className="home-button">
                    <HomeButton className="bottom-nav-button-container" action={this.goHome} feed={this.goHome} />
                    
                </div>
                <>
                    <PostButton className="post-button" toggle={this.props.toggle} />
                </>
                <div className="friend-button">
                    
                    <FriendsButton className="bottom-nav-button-container" />
                    
                </div>
            </div>
        )
    }
}
