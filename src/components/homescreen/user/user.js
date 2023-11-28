import React from 'react';
import './user.css';
import { fetchPublicAccount } from '../../../util/account/fetchPublicUser';
import { DefaultUserIcon } from './userComponents/defaulticon'
import { Edit } from './edit/edit';
import { SubmenuButton } from './submenu/submenubutton';
import { Submenu } from './submenu/Submenu';
import { addFriend } from '../../../util/authRoutes';
import { Error } from '../../error/error';
import { follow, unFollow } from '../../../util/followComs';
import { SendMessage } from './userComponents/SendMessage';
import {PostSection} from './userComponents/postComponents/PostSection'
import { PostLoading } from './userComponents/postComponents/postLoading';
import { userFeed } from '../../../util/postUtil/feedComs'; 
import './userComponents/postComponents/postComponents.css';
import { imageNightMode } from '../../menu/NightMode/nightModeFunction';
import { FollowerCount } from './userComponents/followerComponent/FollowerCount';
import Followers from './followers/Followers';
import history from '../../history';
import { BioLoading } from './loading/BioLoading';
import { SubLoading } from '../../loading/subLoading/SubLoading';
import { BlockUser } from '../../../util/account/BlockUser';
import { BioExpanded } from './BioExpanded/BioExpanded';
import { TogglePostPreview } from './userComponents/TogglePostPreview/TogglePostPreview';
import { NsfwAccountAlert } from './userComponents/NsfwAccountAlert/NsfwAccountAlert';
import { PinnedPost } from './userComponents/PinnedPost/PinnedPost';
import { removePinnedPost } from '../../../util/account/updateAccount';


export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            picture: "",
            posts: [], 
            username: "", 
            bio: "", 
            yourAccount: false, 
            editOpen: false, 
            friends: false, 
            menuOpen: false,
            error: false,
            errorMessage: "",
            loading: true,
            followerCount: 0,
            bioToggled: false,
            BioExpanded: false,
            limit: 17,
            postsLoading: true,
            imageExpanded: false,
            morePosts: true,
            private: false,
            followerMenuOpen: false,
            initialPostLoad: true,
            loadingMorePosts: false,
            subLoading: false,
            blocked: [],
            yourBlocked: false,
            altPostPreview: false,
            following: false,
            nsfwAlert: false,
            pinnedPost: false
        }
        this.removeFriend = this.removeFriend.bind(this);
        this.toggleEditWindow = this.toggleEditWindow.bind(this);
        this.update = this.update.bind(this);
        this.toggleSubMenu = this.toggleSubMenu.bind(this);
        this.closeSubMenu = this.closeSubMenu.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.close = this.close.bind(this);
        this.addPost = this.addPost.bind(this);
        this.follow = this.follow.bind(this);
        this.unFollow = this.unFollow.bind(this);
        this.updateBioStatus = this.updateBioStatus.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.scroll = React.createRef();
        this.fetchMorePosts = this.fetchMorePosts.bind(this);
        this.setAccount = this.setAccount.bind(this);
        this.toggleFollowerMenu = this.toggleFollowerMenu.bind(this);
        this.block = this.block.bind(this);
        this.unBlock = this.unBlock.bind(this);
        this.togglePostPrev = this.togglePostPrev.bind(this);
        this.closeNsfwAlert = this.closeNsfwAlert.bind(this);
        this.removePinnedPost = this.removePinnedPost.bind(this);
    }
    removeFriend() {
        this.setState({friends: false, menuOpen: false});
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        const user = newProps.props.match.params.name
        if (this.state.username !== newProps.props.match.params.name) {
            this.setState({loading: true, postsLoading: true, initialPostLoad: true, posts: []});
            if (this.state.followerMenuOpen) {
                this.toggleFollowerMenu();
            }
            this.setAccount(user);
        } else {
            this.setState({loading: false, postsLoading: false})
        }
        
    }
    setAccount(user) {
        fetchPublicAccount(user).then(account => {
       
            if (!account.error) {
                this.setState(
                {
                    picture: account.user.profilepic, 
                    username: account.user.username,
                    yourAccount: account.user.yourAccount,
                    bio: account.user.bio,
                    friends: account.user.friends,
                    following: account.user.following,
                    followerCount: account.user.followers.type === Number ? account.user.followers : account.user.followers.length,
                    private: account.user.private,
                    postsLoading: false,
                    blocked: account.user.blockedList,
                    yourBlocked: account.user.blocked,
                    nsfwAlert: account.user.nsfw,
                    pinnedPost: account.user.pinnedPost
                })  
            } else {
                this.setState({error: true, errorMessage: "error finding user"})
            }
        }).then(() => {
            setTimeout(() => {
                this.setState({loading: false})
            })
        }).then(() => {
            if (this.state.error) {
                this.setState({postsLoading: false, initialPostLoad: false, posts: []});
                return; 
            } 
            userFeed(this.state.username, this.state.limit).then(posts => {
                
                if (posts.error) {
                    this.setState({posts: [], postsLoading: false, initialPostLoad: false});
                    return;
                };
                this.setState({posts: posts.posts, postsLoading: false, initialPostLoad: false})
            })
        })
    }
    componentDidMount() {
        const user_path = window.location.pathname.split('/')[2];
        if (user_path === this.state.username) {
            this.setState({loading: false});
            return;
        } else {
            this.setAccount(user_path)
        }         
    }
    addFriend() {
        const username = this.state.username;
        this.setState({menuOpen: false});
        
        addFriend(username).then((sent) => {
            if (sent.error) {
                this.setState({error: true, errorMessage: sent.error})
            } else {
                this.setState({error: true, errorMessage: "friend request sent"});
            }
        })
    }
    closeSubMenu(e) {
        this.setState({bioToggled: false});
        try {
            document.getElementsByClassName('user-bio')[0].style = "";
        } catch(error) {
            if (this.state.menuOpen) {
                this.setState({menuOpen: false})
             }
        }
        if (this.state.menuOpen) {
           this.setState({menuOpen: false})
        } 
    }
    toggleSubMenu() {
        if (this.state.menuOpen) {
            this.setState({menuOpen: false})
        } else {
            this.setState({menuOpen: true})
        }
    }
    update(image, bio) {
        this.setState({bio: bio, picture: image})
    }
    toggleEditWindow() {
        if (this.state.editOpen) {
            document.getElementsByClassName('pro-edit-container')[0].style.opacity = '0'
            setTimeout(() => {
                this.setState({editOpen: false})
            }, 1)
        } else {
            this.setState({editOpen: true})
            
            setTimeout(() => {
                document.getElementsByClassName('pro-edit-container')[0].style.opacity = '1'
            })
        }
    }
    follow() {
        follow(this.state.username).then(res => {
            if (res.error) {
                this.setState({error: true, errorMessage: 'error requesting to follow at this time'});
                return;
            }
            if(res.request === 'following') {
                let followerCount = this.state.followerCount;
                followerCount+=1;
                this.setState({following: true, followerCount: followerCount})
                return;
            }
            if (res.request === 'request is pending') {
                this.setState({error: true, errorMessage: 'request is pending'});
                return;
            }
            if (res.request === 'request sent') {
                this.setState({error: true, errorMessage: 'request sent'});
                return;
            }
        })
    }
    unFollow() {
        if (this.state.following) {
            unFollow(this.state.username).then(res => {
                if (!res.error) {
                    let followerCount = this.state.followerCount;
                    followerCount-=1;
                    this.setState({following: false, followerCount: followerCount});
                    if (this.state.private) {
                        this.setState({posts: []});
                    }
                }
            })
        }
    }
    close() {
        if (this.state.errorMessage === 'error finding user') {
            history.goBack();
            return;
        }
        this.setState({error: false})
    }
    addPost(id) {
        const currentPost = this.state.posts;
        currentPost.unshift(id);
        this.setState({posts: currentPost});
    }
    updateBioStatus() {
        if (this.state.BioExpanded) {
            this.setState({BioExpanded: false})
        } else {
            this.setState({BioExpanded: true})
        }
        
    }
    fetchMorePosts() {
        let limit = this.state.limit;
        if (this.state.posts.length === 0) return;
        if (!this.state.morePosts) return;
        if (this.state.loadingMorePosts) return;
        if (this.state.postsLoading) return;
        this.setState({loadingMorePosts: true})
        limit+=10;
        userFeed(this.state.username, limit).then(posts => {
            if (posts.posts.length < limit) {
                this.setState({morePosts: false, posts: posts.posts, postsLoading: false, limit: limit, loadingMorePosts: false})
            } else {
                this.setState({limit: limit, posts: posts.posts, postsLoading: false, loadingMorePosts: false});
            }
        })

    }
    onScroll() {
        const scroll = this.scroll.current;
        if (this.state.loadingMorePosts) return;
        if ((scroll.scrollHeight - scroll.scrollTop) <= scroll.clientHeight) {
            if (!this.state.postsLoading && this.state.morePosts) {
                this.fetchMorePosts();
            }
            
        }
    }
    followingOnMouseOver(e) {
        document.getElementsByClassName('following')[0].innerHTML = 'UNFOLLOW'
    }
    followingOnMouseOut(e) {
        document.getElementsByClassName('following')[0].innerHTML = 'FOLLOWING'
    }
    toggleFollowerMenu() {
        if (this.state.followerMenuOpen) {
            document.getElementsByClassName('followers-container')[0].style.top = '100%';
            setTimeout(() => {
                this.setState({followerMenuOpen: false});
            }, 600 )
        } else {
            this.setState({followerMenuOpen: true});
            setTimeout(() => {
                document.getElementsByClassName('followers-container')[0].style.top = '50px';
            })
            
        }
    }
    block(e) {
        e.stopPropagation();
        this.setState({subLoading: true, menuOpen: false});
        BlockUser(this.state.username).then(res => {
            console.log(res);
            if (res.error) {
                this.setState({error: true, errorMessage: res.error, subLoading: false});
                return;
            }
            this.setState({subLoading: false});
            this.props.block(this.state.username);
        })
    }
    unBlock(user) {
        const blocked = this.state.blocked;

        const index = blocked.findIndex(e => e.username === user);

        blocked.splice(index, 1);

        this.setState({blocked: blocked});
    }
    togglePostPrev() {
        if (this.state.altPostPreview) {
            this.setState({altPostPreview: false});
        } else {
            this.setState({altPostPreview: true});
        }
    }
    closeNsfwAlert() {
        this.setState({nsfwAlert: false})
    }
    removePinnedPost() {
        this.setState({pinnedPost: false})

        removePinnedPost().then(res => {
            if (res.error) {
                this.setState({error: true, errorMessage: res.error});
            }
        })
    }
    render() {
        return (
            
                <div onScroll={this.onScroll} ref={this.scroll} onClick={this.closeSubMenu} className="user-profile">
                    {this.state.BioExpanded ? <BioExpanded toggle={this.updateBioStatus} bio={this.state.bio} /> : null}
                    {this.state.menuOpen ? <Submenu block={this.block} removeFriend={this.removeFriend} addFriend={this.addFriend} username={this.state.username} friends={this.state.friends} /> : null}
                    {this.state.error ? <Error action={this.close} message={this.state.errorMessage} /> : null}
                    {this.state.nsfwAlert && !this.state.yourAccount ? <NsfwAccountAlert close={this.closeNsfwAlert} /> : null}
                    <div className="user-container">

                        
                    
                        <div className="profile-container">
                            
                            <div className="picture-follower-container">
                                {this.state.loading ? <div className='default-user-icon loading-gradient' /> :
                                this.state.picture ? <img style={{filter: imageNightMode(), border: imageNightMode() !== null ? 'solid white 2px' : 'solid black 2px'}} width="80" height="80" src={this.state.picture} className="default-user-icon" alt="profile" /> 
                                :
                                <DefaultUserIcon />}
                                {this.state.loading || this.state.yourBlocked ? null : <FollowerCount openFollowers={this.toggleFollowerMenu} followers={this.state.followerCount} />}
                            </div>
                            <div className="user-info">
                                {this.state.loading ?
                                    <h2 className="loading-gradient username-loading">{null}</h2> 
                                    :
                                    <h2>{this.state.username}</h2>}
                                <div className="friends-follow-container">
                                {
                                this.state.loading ? <div className="loading-gradient bio-loading"></div> :
                                this.state.friends ? <h4>FRIENDS</h4> : null
                                }
                                {
                                    this.state.yourAccount || this.state.loading || this.state.yourBlocked ? null :
                                    this.state.following ? <h4 onClick={this.unFollow} onMouseEnter={this.followingOnMouseOver} onMouseLeave={this.followingOnMouseOut} className="follow-button following">FOLLOWING</h4>
                                    :
                                    this.state.username === "" ? null :
                                    <h4 className="follow-button" onClick={this.follow}>FOLLOW</h4>
                                }
                                </div>
                                {
                                this.state.loading ? 
                                <BioLoading />
                                :
                                this.state.bio ? 
                                <div onClick={this.updateBioStatus}  className="user-bio">
                                    <p className="user-bio">{this.state.bio}</p> 
                                </div>
                                : 
                                <p>...</p>
                                }
                            </div>
                            {
                            this.state.loading ? null :
                            this.state.yourAccount ? <button onClick={this.toggleEditWindow} className="edit-account">EDIT</button> 
                            : this.state.username === "" ? 
                            null : this.state.yourBlocked ? null :
                            <SubmenuButton  toggle={this.toggleSubMenu} />
                            }
                            {this.state.friends ? <SendMessage username={this.state.username} id={this.state.friends} /> : null}
                        </div>
                        {this.state.pinnedPost ? <PinnedPost removePinnedPost={this.removePinnedPost} your_profile={this.state.yourAccount} pinned={this.state.pinnedPost} /> : null}
                        {this.state.posts.length === 0 ? null : <TogglePostPreview togglePrev={this.togglePostPrev} altPostPreview={this.state.altPostPreview} />}
                    
                        <div  className="posts-container">
                            {
                            this.state.initialPostLoad ? 
                            <PostLoading />
                            
                            
                            :
                            this.state.posts.length > 0 ? 
                            <PostSection altPrev={this.state.altPostPreview} posts={this.state.posts} />
                            : 
                            this.state.yourBlocked ? <p className="post-placeholder">You've been blocked</p> :
                            this.state.posts.length === 0 && this.state.private && this.state.following === false && this.state.yourAccount === false ?
                            <p className="post-placeholder">Private Account, Only followers can see posts</p>
                            :
                            <p className="post-placeholder">NO POSTS</p>}
                            {this.state.postsLoading ? <PostLoading /> : null}
                           
                        
                    </div>
                   
                    </div>
                    {this.state.editOpen && this.state.yourAccount ? <Edit unBlock={this.unBlock} blocked={this.state.blocked} private={this.state.private} update={this.update} toggle={this.toggleEditWindow} picture={this.state.picture} bio={this.state.bio} /> : null}
                    {this.state.subLoading ? <SubLoading /> : null}
                    {this.state.followerMenuOpen ? <Followers toggleFollowerMenu={this.toggleFollowerMenu} followers={this.state.followerCount} username={this.state.username} /> : null}
                    {this.state.loadingMorePosts ? 
                            <div className="user-post-loading-spinner-container">
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 50C21.626 50 18.3496 49.3408 15.2686 48.0371C12.29 46.7773 9.61914 44.9707 7.32422 42.6758C5.0293 40.3809 3.22266 37.71 1.96289 34.7314C0.65918 31.6504 0 28.374 0 25C0 24.0283 0.786133 23.2422 1.75781 23.2422C2.72949 23.2422 3.51562 24.0283 3.51562 25C3.51562 27.9004 4.08203 30.7129 5.20508 33.3643C6.28906 35.9229 7.83691 38.2227 9.80957 40.1953C11.7822 42.168 14.082 43.7207 16.6406 44.7998C19.2871 45.918 22.0996 46.4844 25 46.4844C27.9004 46.4844 30.7129 45.918 33.3643 44.7949C35.9229 43.7109 38.2227 42.1631 40.1953 40.1904C42.168 38.2178 43.7207 35.918 44.7998 33.3594C45.918 30.7129 46.4844 27.9004 46.4844 25C46.4844 22.0996 45.918 19.2871 44.7949 16.6357C43.7146 14.0833 42.1511 11.7637 40.1904 9.80469C38.2336 7.84139 35.9134 6.27752 33.3594 5.2002C30.7129 4.08203 27.9004 3.51562 25 3.51562C24.0283 3.51562 23.2422 2.72949 23.2422 1.75781C23.2422 0.786133 24.0283 0 25 0C28.374 0 31.6504 0.65918 34.7314 1.96289C37.71 3.22266 40.3809 5.0293 42.6758 7.32422C44.9707 9.61914 46.7725 12.2949 48.0322 15.2686C49.3359 18.3496 49.9951 21.626 49.9951 25C49.9951 28.374 49.3359 31.6504 48.0322 34.7314C46.7773 37.71 44.9707 40.3809 42.6758 42.6758C40.3809 44.9707 37.7051 46.7725 34.7314 48.0322C31.6504 49.3408 28.374 50 25 50Z" fill="black"/>
                            </svg>
                        </div>
                        :
                    null}
                </div>
                    
        )
    }
}