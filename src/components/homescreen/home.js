import React from 'react';
import './home.css'

import {Nav} from '../homeNav/nav';

import {getAccount, acceptFriendRequest, getFriends} from '../../util/authRoutes';
import { Menu } from '../menu/menu';
import { Notifications } from '../notifications/notifications';
import { Friends } from './friends/friends';
import {Error} from '../error/error';
import { Switch, Route, Router } from 'react-router-dom';
import { Messenger } from './messenger/messenger';
import { User } from './user/user';
import PostMenu from './postMenu.js/PostMenu';
import { Post } from '../post/post';
import { NotFound } from '../NotFound/NotFound';

import history from '../history';
import BottomNav from '../bottomNav/BottomNav';
import {Feed} from './feed/feed';

import {connectToSocket, socket} from '../../util/socket/socket';
import { toggleNightMode } from '../menu/NightMode/nightModeFunction';
import { Loading } from '../loading/loading';
import { getSuggestions } from '../../util/suggestions/suggestions';
import { getTrendingPosts } from '../../util/postUtil/trending';
import { recentsSlideTransition } from './transitionUtil.js/recentsSlideTransition';
import { fetchGroups, acceptGroupInvite } from '../../util/groupUtil/groupBackEndComs';
import { GroupPage } from './groupPage/GroupPage';
import { updateTrendingPref, updateBlurNsfwPref} from '../../util/account/updateAccount';
import { IntroComponent } from './IntroComponent/IntroComponent';
import { TermsAndServices } from '../TermsAndServices/TermsAndServices';
import { ContentPolicy } from '../ContentPolicy/ContentPolicy';
import { PrivacyPolicy } from '../PrivacyPolicy/PrivacyPolicy';
import { Support } from './Support/Support';
import { SubLoading } from '../loading/subLoading/SubLoading';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            friends: ["loading"],
            menuOpen: false, 
            title: 'BUBBLE', 
            notificationsOpen: false,
            notificationCount: 0,
            loading: true,
            error: false,
            errorMessage: "",
            messangerOpen: false,
            selectedFriend: {},
            postMenuOpen: false,
            socket_loaded: false,
            suggestions: [],
            trendingPosts: [],
            recents: [],
            posts: [],
            PostScrollPosition: 0,
            morePosts: true,
            postCount: 5,
            refreshPosts: false,
            groups: [],
            feedRefresh: false,
            blurNSFW: false,
            firstTimeSignIn: false,
            subLoading: false
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.logOut = this.logOut.bind(this);
        this.toggleNotifications = this.toggleNotifications.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.throwError = this.throwError.bind(this);
        this.closeError = this.closeError.bind(this);
        this.closeNotifications = this.closeNotifications.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.togglePostMenu = this.togglePostMenu.bind(this);
        this.unShiftToRecents = this.unShiftToRecents.bind(this);
        this.updatePosts = this.updatePosts.bind(this);
        this.updatePostScrollPosition = this.updatePostScrollPosition.bind(this);
        this.clearRecents = this.clearRecents.bind(this);
        this.refreshFeed = this.refreshFeed.bind(this);
        this.pushNewGroup = this.pushNewGroup.bind(this);
        this.stopRefreshing = this.stopRefreshing.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.acceptGroupInvite = this.acceptGroupInvite.bind(this);
        this.leaveGroup = this.leaveGroup.bind(this);
        this.switchTrendingPref = this.switchTrendingPref.bind(this);
        this.toggleNSFWBlur = this.toggleNSFWBlur.bind(this);
        this.finishSetUp = this.finishSetUp.bind(this);
        this.openGroupNotification = this.openGroupNotification.bind(this);
        this.block = this.block.bind(this);
    }
    clearRecents() {
        recentsSlideTransition().then(() => {
            setTimeout(() => {
                document.getElementsByClassName('clear-recents')[0].style.transition = '';
                setTimeout(() => {
                    this.setState({recents: []})
                })
            }, 500)    
        })
        
    }
    componentWillUnmount() {
        socket.disconnect();
    }
    unShiftToRecents(data) {
        const recents = this.state.recents;

        if (recents.length === 5) {
            recents.pop();
        }
        for (let i = 0; i < recents.length; i++) {
            if (data.friend_name) {
                if (data.friend_name === recents[i].friend_name) {
                    recents.splice(i, 1);
                }
            } else if (data.group_name) {
                if (data.group_name === recents[i].group_name) {
                    recents.splice(i, 1);
                }
            }
            
        }

        recents.unshift(data);
        this.setState({recents: recents});
    }
    updatePosts(posts, morePosts, count) {
        this.setState({posts: posts, morePosts: morePosts, postCount: count});
    }
    updatePostScrollPosition(position) {
        this.setState({PostScrollPosition: position});
    }
    componentDidMount(evt) {
        

        getAccount().then(account => {
            if (account.error === 'Access Denied') {
                document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                window.location.pathname = '/log-in';
                return
            }
            if (!account) {
                this.logOut();
                return;
            }
            if (account.darkMode) {
                toggleNightMode(account.darkMode);
            } else {
                toggleNightMode(false);
            }
            
            if (account.disableinstallpopup) {
                this.props.disableInstallNotification();
            }
            this.setState({account: account, recents: account.recents, blurNSFW: account.blurNsfwPosts, firstTimeSignIn: account.firstTimeSignIn});
            
        }).then(() => {
            getFriends().then(res => {
                
                this.setState({friends: res})
            })
            fetchGroups().then(res => {
               
                if (res.error) return;
                this.setState({groups: res})
            })
            connectToSocket(this.state.account.username)
        }).then(() => {
            this.setState({socket_loaded: true})
        }).then(() => {
            getSuggestions().then(res => {
                if (res.error) return;
                this.setState({suggestions: res});
            })
            getTrendingPosts().then(res => {
                if (res.error || res.length === 0) return;
                this.setState({trendingPosts: res});
            })
        }).then(() => {
            document.getElementsByClassName('loading-outer-container')[0].style.opacity = '0';
            setTimeout(() => {
                this.setState({loading: false})
            }, 500)
        })
    }
    shouldComponentUpdate(nextState) {
        if (this.state.account === nextState) {
            return false
        }
        return true
    }
    openMenu() {
        if (this.state.menuOpen === true) return;
        this.setState({title: "MENU", menuOpen: true})
        setTimeout(() => {
            document.getElementById('menu-container').style.transform = 'translateX(0)';
        })
    }
    closeMenu() {
        if (this.state.menuOpen === false) {
            return;
        }
        this.setState({title: "BUBBLE"})
        document.getElementById('menu-container').style.transform = 'translateX(300%)';
        setTimeout(() => {
            this.setState({menuOpen: false})
        }, 700);
    }
    finishSetUp(bio, image) {
        const account = this.state.account;

        document.getElementsByClassName('intro-component-container')[0].style.opacity = '0';

        account.profilepic = image;
        account.bio = bio;
        setTimeout(() => {
            this.setState({account: account, firstTimeSignIn: false});
        }, 500)
        

    }
    toggleMenu() {
        if (this.state.menuOpen) {
            this.setState({title: "BUBBLE"})
            document.getElementById('menu-container').style.transform = 'translateX(300%)';
            setTimeout(() => {
                this.setState({menuOpen: false})
            }, 500);
        } else {
            this.setState({title: "MENU", menuOpen: true})
            setTimeout(() => {
                document.getElementById('menu-container').style.transform = 'translateX(0)';
            })
            
        }
    }
    toggleNotifications() {
        if (this.state.notificationsOpen) {
            this.setState({notificationsOpen: false});
            document.getElementsByClassName('notification-container')[0].style.display = 'none'
        } else {
            this.setState({notificationsOpen: true});
            document.getElementsByClassName('notification-container')[0].style.display = 'flex'
        }
    }
    logOut() {
        this.setState({SubLoading: true})
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        
        setTimeout(() => {
            this.props.signOut();
        }, 1000)
        
    }
    acceptRequest(id, username) {
        acceptFriendRequest(id, username).then(friend => {
            getFriends().then(res => {
                this.setState({friends: res})
            })
        })
    }
    throwError(message) {
        this.setState({error: true, errorMessage: message});
    }
    closeError(e) {
        e.preventDefault();
        this.setState({error: false, errorMessage: ""})
    }
    closeNotifications() {
        if (this.state.notificationsOpen) {
            this.setState({notificationsOpen: false})
            document.getElementsByClassName('notification-container')[0].style.display = 'none'
        }
    }
    togglePostMenu() {
        if (this.state.postMenuOpen) {
            document.getElementsByClassName('post-menu')[0].style.transform = 'translate(-50%, 100%)';
            setTimeout(() => {
                this.setState({postMenuOpen: false})
            }, 300)
        } else {
            this.setState({postMenuOpen: true});
            setTimeout(() => {
                document.getElementsByClassName('post-menu')[0].style.transform = 'translate(-50%, 0)';
            })
            
        }
    }
    pushNewGroup(group) {
        const existing = this.state.groups;
        existing.push(group);
        setTimeout(() => {
            history.push({pathname: `/group/${group.group_name}`, state: group._id})
        }, 1)
        
        this.setState({groups: existing});
        
    }
    refreshFeed() {
        if (this.state.feedRefresh) return;
        this.setState({feedRefresh: true})
    }
    stopRefreshing() {
        this.setState({feedRefresh: false})
    }
    async acceptGroupInvite(_id) {
        return await acceptGroupInvite(_id).then(res => {
            if (res.error) {
                this.setState({error: true, errorMessage: res.error})
                this.toggleNotifications();
                return false;
            }
            const current = this.state.groups;
            current.push(res);
            this.setState({groups: current});
            this.toggleNotifications();
            return true;
        })
    }
    deleteGroup(_id) {
        const existing_group = this.state.groups;

        const recents = this.state.recents;

        const recents_index = this.state.recents.findIndex(element => element._id === _id);

        if (recents_index !== -1) {
            recents.splice(recents_index, 1);
        }

        const index = existing_group.findIndex(element => element._id === _id);

        existing_group.splice(index, 1);

        this.setState({groups: existing_group, recents: recents});

        history.push('/friends');
    }
    leaveGroup(group_id) {
        const current = this.state.groups;

        const recents = this.state.recents;

        const group_index = current.findIndex(g => g._id === group_id);

        const recents_index = recents.findIndex(r => r._id === group_id);

        current.splice(group_index, 1);

        if (recents_index !== -1) {
            recents.splice(recents_index, 1);
        }

        this.setState({groups: current, recents: recents});
        history.push('/friends');
    }
    async switchTrendingPref(bool) {
        const account = this.state.account;

        account.trendingAppWide = bool;

        await updateTrendingPref(bool).then(res => {
            if (res.error) {
                this.setState({errorMessage: res.error, error: true});
                return;
            }

            getTrendingPosts().then(res => {
                if (res.error) {
                    this.setState({errorMessage: res.error, error: true});
                    return;
                }
                this.setState({trendingPosts: res});
            })


        })
    }
    toggleNSFWBlur(bool) {
        
        if (this.state.blurNSFW) {
            this.setState({blurNSFW: false});
            updateBlurNsfwPref(false);
        } else {
            this.setState({blurNSFW: true});
            updateBlurNsfwPref(true);
        }
        
       
    }
    openGroupNotification(group_name) {

        const group = this.state.groups;

        const group_index = group.findIndex(e => e.group_name === group_name);

        if (group_index === -1) {
            this.setState({error: true, errorMessage: "unexpected error has occured"});
            return;
        }

        history.push({pathname: `/group/${group[group_index].group_name}`, state: group[group_index]._id});

    }
    block(user) {
        const friends = this.state.friends;
        console.log(friends);
        const index = friends.findIndex(e => e.friend_name === user);

        const posts = this.state.posts;

        if (index !== -1) {
            friends.splice(index, 1);
        }

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].username === user) {
                posts.splice(i, 1);
            }
        }

        this.setState({friends: friends, posts: posts});

        history.goBack();
    }
    render() {
        return (
        <Router history={history} >  
                <div onClick={this.closeNotifications} className='home'>
                    {this.state.error ? <Error action={this.closeError} message={this.state.errorMessage} /> : null}
                    {this.state.SubLoading ? <SubLoading /> : null}
                    {this.state.loading ? <Loading /> : null}
                    <Nav refreshFeed={this.refreshFeed} openPostMenu={this.togglePostMenu} image={this.state.account.profilepic} username={this.state.account.username} toggleNotifications={this.toggleNotifications} count={this.state.notificationCount} title={this.state.title} toggle={this.toggleMenu}/>
                    <Notifications 
                    acceptGroupInvite={this.acceptGroupInvite}
                    close={this.closeNotifications} 
                    socket_loaded={this.state.socket_loaded} 
                    accept={this.acceptRequest} 
                    count={this.updateNotificationCount} 
                    openGroupNotification={this.openGroupNotification}
                    open={this.state.notificationsOpen} />
                    <Switch>

                        <Route path='/' exact render={props => <Feed
                        name={this.state.account.username} 
                        stopRefreshing={this.stopRefreshing}
                        refreshing={this.state.feedRefresh}
                        morePosts={this.state.morePosts} 
                        count={this.state.postCount} 
                        updatePosts={this.updatePosts} 
                        updateScrollPosition={this.updatePostScrollPosition} 
                        posts={this.state.posts} 
                        scrollPosition={this.state.PostScrollPosition} 
                        blurNsfw={this.state.blurNSFW}
                        
                        />} 
                        />
                        <Route path='/privacy-policy' component={PrivacyPolicy} />
                        <Route path='/terms-and-services' component={TermsAndServices} />
                        <Route path='/content-policy' component={ContentPolicy} />
                        <Route path='/error' component={NotFound} />
                        <Route path='/user/:name' render={props => <User block={this.block} props={props} />} />
                        <Route path='/post/:id' component={Post} />
                        <Route path='/friends' render={props => <Friends newGroup={this.pushNewGroup} groups={this.state.groups} clearRecents={this.clearRecents} updateRecents={this.unShiftToRecents} recents={this.state.recents} friends={this.state.friends} />} />
                        <Route path="/message/:user/:id" component={Messenger} />
                        <Route path="/support" component={Support} />
                        <Route path="/group/:id" 
                        render={props => 
                        <GroupPage match={props} leaveGroup={this.leaveGroup} friends={this.state.friends} deleteGroup={this.deleteGroup} />
                        } 
                        />
                    </Switch> 

                    {this.state.firstTimeSignIn ? <IntroComponent finishSetUp={this.finishSetUp} /> : null}
                    
                    {this.state.menuOpen ? <Menu install={this.props.install} toggleNSFWBlur={this.toggleNSFWBlur} blurNsfw={this.state.blurNSFW} updateTrendingPref={this.switchTrendingPref} trendingOptions={this.state.account.trendingAppWide} trending={this.state.trendingPosts} suggestions={this.state.suggestions} toggleMenu={this.toggleMenu} update={this.updateState} error={this.throwError} profilepic={this.state.account.profilepic} logOut={this.logOut} username={this.state.account.username} /> : null}
                    
                    {this.state.postMenuOpen ? <PostMenu toggle={this.togglePostMenu} /> : null}
                    <BottomNav toggle={this.togglePostMenu} refreshFeed={this.refreshFeed} />
                </div>
            </Router>  
        )
    }
}