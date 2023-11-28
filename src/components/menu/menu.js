import React from 'react';
import './menu.css';
import {searchForFriends, addFriend} from '../../util/authRoutes';
import { Results } from './results/results';
import { NightMode } from './NightMode/NightMode';
import { TopPostsOfTheDay } from './topPostsOfTheDay/TopPostsOfTheDay';
import { TrendingPostsPanelOptions } from './TrendingPostsPanelOptions/TrendingPostsPanelOptions';
import { BlurNsfw } from './BlurNSFW/BlurNsfw';
import {CopyRight} from '../copyRight/CopyRight';
import { SupportButton } from './SupportButton/SupportButton';
import { InstallPwa } from './InstallPWA/InstallPwa';



export class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {input: '', results: [], editpic: false, editTrendingOpen: false, isStandalone: false}
        this.search = this.search.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.toggleEditTrending = this.toggleEditTrending.bind(this);
    }
    search(e) {
        e.preventDefault();
        const value = document.getElementById('friend-search').value;
        if (!value) {
            this.setState({results: this.props.suggestions});
            return;
        }
        searchForFriends(value).then(accounts => {
     
            this.setState({results: accounts});
        })
    }
    componentDidMount() {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        this.setState({results: this.props.suggestions, isStandalone: isStandalone})
        
    }
    addFriend(username) {
        addFriend(username).then(sent => {
                if (sent.error) {
                    this.props.error(sent.error);
                    return;
                }
                this.setState({results: []})
                document.getElementById('friend-search').value = '';
                this.props.error("Friend Request sent")
                return;
        })
    }
    toggleEditTrending() {
        if (this.state.editTrendingOpen) {
            this.setState({editTrendingOpen: false});
        } else {
            this.setState({editTrendingOpen: true});
        }
    }
    render() {
        return (
            <div id="menu-container">
                <div className="outer-div-container">
                    <div className="search-container">
                        
                        <input onChange={this.search}  id="friend-search" type="text" placeholder="FIND USERS" />
                        <svg onClick={this.search} className="search-button" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M53.2969 50.0684L38.0801 34.8516C40.4414 31.7988 41.7187 28.0664 41.7187 24.1406C41.7187 19.4414 39.8848 15.0352 36.5684 11.7129C33.2519 8.39062 28.834 6.5625 24.1406 6.5625C19.4473 6.5625 15.0293 8.39648 11.7129 11.7129C8.39062 15.0293 6.5625 19.4414 6.5625 24.1406C6.5625 28.834 8.39648 33.2519 11.7129 36.5684C15.0293 39.8906 19.4414 41.7187 24.1406 41.7187C28.0664 41.7187 31.793 40.4414 34.8457 38.0859L50.0625 53.2969C50.1071 53.3415 50.1601 53.3769 50.2184 53.4011C50.2767 53.4253 50.3392 53.4377 50.4023 53.4377C50.4655 53.4377 50.528 53.4253 50.5863 53.4011C50.6446 53.3769 50.6976 53.3415 50.7422 53.2969L53.2969 50.748C53.3415 50.7034 53.3769 50.6504 53.4011 50.5921C53.4253 50.5338 53.4377 50.4713 53.4377 50.4082C53.4377 50.3451 53.4253 50.2826 53.4011 50.2243C53.3769 50.166 53.3415 50.113 53.2969 50.0684ZM33.4219 33.4219C30.9375 35.9004 27.6445 37.2656 24.1406 37.2656C20.6367 37.2656 17.3438 35.9004 14.8594 33.4219C12.3809 30.9375 11.0156 27.6445 11.0156 24.1406C11.0156 20.6367 12.3809 17.3379 14.8594 14.8594C17.3438 12.3809 20.6367 11.0156 24.1406 11.0156C27.6445 11.0156 30.9434 12.375 33.4219 14.8594C35.9004 17.3438 37.2656 20.6367 37.2656 24.1406C37.2656 27.6445 35.9004 30.9434 33.4219 33.4219Z" fill="black"/>
                        </svg>
                    </div>
                        
                    <Results  toggleMenu={this.props.toggleMenu} username={this.props.username} addFriend={this.addFriend} accounts={this.state.results} />
                    <TopPostsOfTheDay blurNsfw={this.props.blurNsfw} toggleEditTrending={this.toggleEditTrending} toggleMenu={this.props.toggleMenu} posts={this.props.trending} />
                    <div className="menu-items">
                        <NightMode />
                        {this.state.isStandalone || navigator.standalone ? null : <InstallPwa install={this.props.install} />}
                        <BlurNsfw toggleNSFWBlur={this.props.toggleNSFWBlur} blurNsfw={this.props.blurNsfw} />
                        <button onClick={this.props.logOut} className="log-out">LOG OUT</button>
                        <p>Created By Nor. X West Designs</p>
                    </div>
                    {this.state.editTrendingOpen ? <TrendingPostsPanelOptions updateTrendingPref={this.props.updateTrendingPref} toggleEditTrending={this.toggleEditTrending} trendingOptions={this.props.trendingOptions} /> : null}
                    <CopyRight toggleMenu={this.props.toggleMenu}/>
                    <SupportButton toggleMenu={this.props.toggleMenu} />
                    <div className="menu-bottom-spacer-container"></div>
                </div>
                
            </div>
        )
    }
}