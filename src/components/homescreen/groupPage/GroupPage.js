import React, { Component } from 'react'

import './GroupPage.css';
import { MenuButton } from './GroupButtons/MenuButton/MenuButton';
import { getGroupData, deleteGroup, inviteUser, updatePermission, addPermission, deletePermission, assignNewPermissions, updateGroupLimit, leaveGroup, updateGroupName, updateGroupImage, sendPost, fetchMorePosts, deleteGroupPost, replyToGroupPost, banUser, unBanUser, toggleGroupNotifications } from '../../../util/groupUtil/groupBackEndComs';
import { Error } from '../../error/error';
import { socket } from '../../../util/socket/socket';
import { GroupMenu } from './GroupMenu/GroupMenu';
import { toggleMenu } from './GroupMenu/GroupMenuUtil/ToggleMenu';
import { GroupNameContainer } from './GroupNameContainer/GroupNameContainer';
import { imageNightMode } from '../../menu/NightMode/nightModeFunction';
import { matchMedia } from '../../matchMedia';
import { SubLoading } from '../../loading/subLoading/SubLoading';
import { InviteAlert } from './GroupMenu/InviteMenu/InviteMenuUtil/InviteAlert';
import { LackRequiredPermissions } from './GroupButtons/InfoButton/LackRequiredPermissions';
import { GroupInput } from './GroupInput/GroupInput';
import { GroupFeed } from './GroupFeed/GroupFeed';
import { BanPopUp } from './BanPopUp/BanPopUp';

export class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            loading: true,
            can_ban_users: false,
            group_name: "",
            group_image: "",
            users: [],
            posts: [],
            permissions: [],
            banList: [],
            owner: false,
            can_update: false,
            can_invite: false,
            error: false,
            group_menu_open: false,
            owner_name: "",
            inviteAlert: false,
            can_update_perms: false,
            can_user_post: false,
            transitionLoading: false,
            limit: 5,
            currentPostCount: 8,
            maximum: false,
            loadingMorePosts: false,
            scrollPosition: 0,
            replyToo: {},
            socketLoaded: false,
            banned: false,
            banReason: "",
            notifications: false
        }
        this.scrollPos = React.createRef();
        this.closeError = this.closeError.bind(this);
        this.fetchGroup = this.fetchGroup.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.inviteUser = this.inviteUser.bind(this);
        this.updatePrivaledge = this.updatePrivaledge.bind(this);
        this.addPrivaledge = this.addPrivaledge.bind(this);
        this.deletePrivaledge = this.deletePrivaledge.bind(this);
        this.assignNewPrivaledge = this.assignNewPrivaledge.bind(this);
        this.fadeOutLoading = this.fadeOutLoading.bind(this);
        this.updateGroupLimit = this.updateGroupLimit.bind(this);
        this.leaveGroup = this.leaveGroup.bind(this);
        this.editGroupName = this.editGroupName.bind(this);
        this.updateGroupImage = this.updateGroupImage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.fetchMorePosts = this.fetchMorePosts.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.set_reply = this.set_reply.bind(this);
        this.cancel_reply = this.cancel_reply.bind(this);
        this.reply = this.reply.bind(this);
        this.groupSocket = this.groupSocket.bind(this);
        this.banUser = this.banUser.bind(this);
        this.unBanUser = this.unBanUser.bind(this);
        this.UpdateNotifications = this.UpdateNotifications.bind(this);
    }
    componentDidMount() {
        const _id = this.props.match.location.state;
        this.fetchGroup(_id);
        document.getElementsByClassName('bottomNav')[0].style.display = 'none';
        document.getElementsByClassName('post-button')[0].style.display = 'none';
    }
    fadeOutLoading(alert) {
        
        setTimeout(() => {
            try {
                document.getElementsByClassName('sub-loading-container')[0].style.opacity = '0';
            } catch (error) {
                setTimeout(() => {
                    this.setState({transitionLoading: false});
                    this.setState({inviteAlert: alert});
                    setTimeout(() => {
                        this.setState({inviteAlert: false});
                    }, 500)
                }, 500)
            }
            
            setTimeout(() => {
                this.setState({transitionLoading: false});
                this.setState({inviteAlert: alert});
                setTimeout(() => {
                    this.setState({inviteAlert: false});
                }, 500)
            }, 500)
        })
            
    }
    fetchGroup(_id) {
        getGroupData(_id).then(res => {
            if (res.error) return this.setState({error: res.error});
            this.setState({
                _id: _id,
                limit: res.limit,
                can_ban_users: res.can_ban_users,
                can_user_post: res.can_post,
                can_update_perms: res.can_update_perms,
                permissions: res.permissions,
                group_image: res.group_image,
                owner_name: res.owner_name,
                group_name: res.group_name,
                posts: res.messages,
                owner: res.owner,
                can_invite: res.can_invite,
                can_update: res.can_update,
                banList: res.banList,
                users: res.users,
                listen_token: res.listen_token,
                notifications: res.notifications
            })
            
        }).then(() => {
            
            if (!this.state.socketLoaded) {
                this.groupSocket();
                this.setState({socketLoaded: true});
            }
            
            setTimeout(() => {
                
                const feed = document.getElementsByClassName('group-feed-container')[0];
                if (feed) {
                    feed.scrollTop = feed.scrollHeight;
                }
                document.getElementsByClassName('sub-loading-container')[0].style.opacity = '0'
                setTimeout(() => {
                    this.setState({loading: false})
                }, 400)
            }, 400) 
        })
    }
    componentWillUnmount() {
        socket.off(`/${this.state.listen_token}/new-group-data`);
        if (!matchMedia()) {
            document.getElementsByClassName('bottomNav')[0].style.display = 'flex';
            document.getElementsByClassName('post-button')[0].style.display = 'flex';
        }  
    }
    closeError() {
        if (this.state.error === "you are not a member of this group" || this.state.error === 'error validating token') {
            window.location.pathname = '/friends';
        }
        this.setState({error: false});
    }
    deleteGroup() {
        this.setState({loading: true});
        deleteGroup(this.state._id).then(res => {
            if (res.error) {
                this.setState({error: res.error});
                return;
            }
            this.props.deleteGroup(this.state._id);
        })
        
    }
    inviteUser(username) {
        inviteUser(username, this.state._id).then(res => {
            if (res.error) {
                this.setState({error: res.error});
                return;
            } else {
                this.setState({inviteAlert: res.success})
                setTimeout(() => {
                    this.setState({inviteAlert: false})
                }, 1000)
            }
        }) 
    }
    toggleMenu() {
        if (this.state.group_menu_open) {
            toggleMenu(false)
            setTimeout(() => {
                this.setState({group_menu_open: false})
            }, 500)
           
        } else {
            this.setState({group_menu_open: true})
            setTimeout(() => {
                toggleMenu(true);
            }, 10);
        }
    }
    deletePrivaledge(object) {

        if (object.type === 'Guest') {
            this.setState({error: 'Cannot Delete Default Permissions'});
            return;
        }
        this.setState({transitionLoading: true});
        const current = this.state.permissions;

        deletePermission(object, this.state._id).then(res => {
            if (res.error) {
                this.setState({error: res.error, transitionLoading: false});
                return;
            }

            const guest_index = current.findIndex(e => e.type === "Guest");

            const index = current.findIndex(e => e.type === object.type);

            const users = this.state.users;

            for (let i = 0; i < users.length; i++) {
                if (users[i].privaledge.type === object.type) {
                    users[i].privaledge = current[guest_index];
                }
            }

            current.splice(index, 1);

            this.setState({permissions: current});
            this.fadeOutLoading("Deleted");
        })
        
    }
    addPrivaledge(object) {
        const current = this.state.permissions;
        this.setState({transitionLoading: true});
        addPermission(object, this.state._id).then(res => {
            if (res.error) {
                this.setState({error: res.error, transitionLoading: false});
                return;
            }
            current.push(object);

            this.setState({permissions: current});
            this.fadeOutLoading("Added")
        })
        
    }
    updatePrivaledge(object) {
        const current = this.state.permissions;
        this.setState({transitionLoading: true});
        const index = current.findIndex(e => e.type === object.type);

        if (index === -1) {
            return;
        }
        updatePermission(object, this.state._id).then(res => {
            if (res.error) {
                this.setState({error: res.error, transitionLoading: false});
                return;
            }
            current[index] = object;
            this.setState({permissions: current});
            this.fadeOutLoading("Updated");
        })
        
    }
    assignNewPrivaledge(user, perm) {
        this.setState({transitionLoading: true});
        const current = this.state.users;

        const index = current.findIndex(e => e.username === user.username);
        assignNewPermissions(user, perm, this.state._id).then(res => {
            if (res.error) {
                this.setState({error: res.error, transitionLoading: false});
                return;
            }
            current[index].privaledge = res.privaledge;

            this.setState({users: current});
            this.fadeOutLoading("Updated");
        })
    }
    updateGroupLimit(limit) {
        if (limit > 25) return;
        this.setState({transitionLoading: true});
        
        updateGroupLimit(this.state._id, limit).then(res => {

            if (res.error) {
                this.setState({error: res.error, transitionLoading: false});
                return;
            }

            this.setState({limit: res.limit});

            this.fadeOutLoading("Updated");
        })
        
    }
    editGroupName(name) {
        if (!name || name.split('').length > 20) {
            this.setState({error: "invalid name"});
            return;
        }
        if (name === this.state.group_name) return;

        this.setState({transitionLoading: true})

        updateGroupName(this.state._id, name).then(res => {
            if (res.error) {
                this.setState({error: res.error, transitionLoading: false});
                return;
            }
            this.setState({group_name: name});

            this.fadeOutLoading("Updated");
        })

        

    }
    
    updateGroupImage(image) {
        this.setState({transitionLoading: true});

        const data = new FormData();

        data.append("image", image);

        updateGroupImage(this.state._id, data).then(res => {
            if (res.error) {
                this.setState({error: res.error, transitionLoading: false});
                return;
            }

            this.setState({group_image: res.image});
            this.fadeOutLoading("Updated")
        })
    }
    leaveGroup() {
        this.setState({transitionLoading: true});

        leaveGroup(this.state._id).then(res => {
            if (res.error) {
                this.setState({error: res.error})
                return;
            }
            this.props.leaveGroup(this.state._id);
        })
        
    }
    scrollToBottom() {
        const feed = document.getElementsByClassName('group-feed-container')[0];
        if (feed) {
            setTimeout(() => {
                feed.scrollTop = feed.scrollHeight;
            }, 50)
        }    
        
    }
    sendMessage(post) {

        if (!this.state.can_user_post) return;

        const sending_id = this.state.posts.length + 5;

        const current = this.state.posts;

        post._id = sending_id;

        post.sending_id = sending_id;

        current.push(post);

        this.setState({posts: current});

        setTimeout(() => {
            if (post.image) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    document.getElementById(sending_id).src = e.target.result;
                }

                reader.readAsDataURL(post.image);
                setTimeout(() => {
                    this.scrollToBottom();
                }, 5)
            } else {
                this.scrollToBottom();
            }
        })
         
        
        
        const data = new FormData();

        data.append("image", post.image);
        data.append("sending_id", sending_id);
        data.append("text", post.message);
            
        sendPost(this.state._id, data).then(res => {

           
            const current = this.state.posts;

            const index = current.findIndex(e => e._id === Number(res.sending_id));

            if (index === -1) {

                this.setState({error: 'unexpected error has occured'});
                return;
            }

            if (res.error) {
                current.splice(index, 1);
                this.setState({posts: current, error: res.error});
                return;
            }

            let post_to_update = current[index];
           
            post_to_update.message = res.post.message;
            post_to_update.video_link = res.post.video_link;
            post_to_update.image_link = res.post.image_link;
            post_to_update.website = res.post.website;
            post_to_update.secondary_id = res.post._id;
            post_to_update.sending = null;
            post_to_update.user = res.post.user;
            post_to_update.user_image = res.post.user_image;
            post_to_update.time = res.post.time;

            post_to_update.secondary_image = res.post.image;

            current[index] = post_to_update;
            this.setState({posts: current});
        }).then(() => {
            this.scrollToBottom();
        })

    }
    fetchMorePosts() {
        if (this.state.maximum) return;

        this.setState({loadingMorePosts: true});

        let maximum = this.state.currentPostCount;

        maximum+=7;

        this.setState({scrollPosition: document.getElementsByClassName('group-feed-container')[0].scrollHeight})
        
        fetchMorePosts(this.state._id, maximum).then(res => {
            
            if (res.error) {
                this.setState({error: res.error, maximum: true, loadingMorePosts: false});
                return;
            }
            this.setState({posts: res.posts, maximum: res.maximum, currentPostCount: maximum, loadingMorePosts: false});
            
        }).then(() => {
            setTimeout(() => {
                document.getElementsByClassName('group-feed-container')[0].scrollTop = (document.getElementsByClassName('group-feed-container')[0].scrollHeight - this.state.scrollPosition)
            }, 30)
           
        })
    }
    deletePost(_id) {
        const current = this.state.posts;

        this.setState({transitionLoading: true});

        deleteGroupPost(this.state._id, _id).then(res => {
            if (res.error) {
                this.setState({transitionLoading: false, error: res.error});
                return;
            }

            const index = current.findIndex(e => e._id === _id || e.secondary_id === _id);

            if (index === -1) {
                this.setState({error: "unexpected error", transitionLoading: false});
                return;
            }

            current.splice(index, 1);
            this.setState({posts: current});
            this.fadeOutLoading("Deleted");
        })
        
    } 
    onScroll() {
        if (this.state.maximum || this.state.loadingMorePosts) return;
        if (this.scrollPos.current.scrollTop === 0) {
            this.fetchMorePosts();
        }
    }
    set_reply(user, _id) {
        this.setState({replyToo: {
            user: user,
            _id: _id
        }})
        document.getElementById('group-message-input').focus();
    }
    cancel_reply() {
        this.setState({replyToo: {}});
    }
    reply(_id, message) {
        const current = this.state.posts;

        const post_index = current.findIndex(e => e._id === _id || e.secondary_id === _id);

        if (post_index === -1) {
            this.setState({error: "unexpected error"});
            return;
        }

        const post = current[post_index];

        const post_placement_id = post.replies.length + _id

        const reply_object = {
            posting: true,
            post_placement_id: post_placement_id,
            message: message
        }

        current[post_index].replies.unshift(reply_object);

        this.setState({posts: current});

        replyToGroupPost(this.state._id, message, _id).then(res => {
            
            const reply_index = current[post_index].replies.findIndex(e => e.post_placement_id = post_placement_id);

            if (reply_index === -1) {
                this.setState({error: "unexpected error has occured"});
            }

            if (res.error) {

                current[post_index].replies.splice(reply_index, 1);

                this.setState({posts: current, error: res.error, replyToo: {}});
                return;
            }

            current[post_index].replies[reply_index].posting = false;
            current[post_index].replies[reply_index].user = res.user;
            current[post_index].replies[reply_index].time = res.time;

            this.setState({posts: current, replyToo: {}});
        })
        

    }
    groupSocket() {
        setTimeout(() => {
            try {
                socket.on(`/${this.state.listen_token}/new-group-data`, data => {
                    console.log(data);
                    const current = this.state.posts;
                    if (data.type === 'post') {
                        current.push(data.object);
                        this.setState({posts: current});
                        return;
                    } else if (data.type === 'reply') {
                        const reply = data.object;
                        const post_index = current.findIndex(e => e._id === reply.post_id || e.secondary_id === reply.post_id);
                        if (post_index === -1) {
                            return;
                        }
                        current[post_index].replies.unshift(reply);
                        this.setState({posts: current});
                        return;
                    } else if (data.type === 'image-update') {
                        this.setState({group_image: data.object})
                    } else if (data.type === 'new-group-name') {
                        this.setState({group_name: data.object});
                    } else if (data.type === 'ban-message') {
                        this.setState({banned: true, banReason: data.message})
                    }
                })
            } catch (error) {
                this.setState({error: "socket error, try refreshing"});
            }
        }, 1000);
        
        
    }
    banUser(user, banReason) {
        this.setState({transitionLoading: true});

        if (!banReason) {
            this.setState({error: "error there must be a band reason"});
            return;
        }

        if (banReason.split('') > 150) {
            this.setState({error: "ban reason is can only be a maximum of 150 characters"});
            return;
        }

        if (!user) return;

        banUser(this.state._id, user, banReason).then(res => {
            console.log(res);
            if (res.error) {
                this.setState({error: res.error, transitionLoading: false});
                return;
            }
            const users = this.state.users;

            const index = users.findIndex(element => element.username === user);

            if (index === -1) {
                this.setState({error: "unexpected error has occured", transitionLoading: false});
                return;
            }

            const posts = this.state.posts;

            for (let i = 0; i < posts.length; i++) {
                if (posts[i].user === user) {
                    posts.splice(i, 1);
                }
            }

            users.splice(index, 1);


            this.setState({users: users, posts: posts});

            this.fadeOutLoading("User Banned");

        })
    }
    unBanUser(user) {
        const banList = this.state.banList;

        this.setState({transitionLoading: true});

        unBanUser(this.state._id, user).then(res => {
            if (res.error) {
                this.setState({error: res.error, transitionLoading: false});
                return;
            }

            const index = banList.findIndex(e => e.user === user);

            if (index === -1) {
                this.setState({error: "unexpected error has occured", transitionLoading: false});
                return;
            }

            banList.splice(index, 1);

            this.setState({banList: banList});
            this.fadeOutLoading('Un Banned');
        })
    }
    UpdateNotifications() {
        if (this.state.transitionLoading) return;

        this.setState({transitionLoading: true});

        if (this.state.notifications) {
            this.setState({notifications: false})
        } else {
            this.setState({notifications: true});
        }
        toggleGroupNotifications(this.state._id).then(res => {
            if (res.error) {
                this.setState({error: res.error, transitionLoading: false});
                return;
            }
            this.fadeOutLoading('Updated')
        })
        
    }
    render() {
        return (

            <>
            <GroupNameContainer image={this.state.group_image} group_name={this.state.group_name} loading={this.state.loading} />
            <div style={{backgroundColor: imageNightMode() === null ? 'black' : 'rgb(185, 185, 185)'}} className="black-bar-spacer"></div>
            <div className="group-outer-container">
                {this.state.inviteAlert ? <InviteAlert msg={this.state.inviteAlert}/> : null}
                {this.state.group_menu_open ? 
                <GroupMenu 
                updateGroupImage={this.updateGroupImage}
                group_image={this.state.group_image}
                limit={this.state.limit}
                deletePrivaledge={this.deletePrivaledge}
                permissions={this.state.permissions}
                name={this.state.group_name} 
                deleteGroup={this.deleteGroup}
                owner={this.state.owner_name} 
                image={this.state.group_image} 
                auth={this.state.owner}
                users={this.state.users} 
                can_invite={this.state.can_invite}
                friends={this.props.friends}
                inviteUser={this.inviteUser}
                can_ban_users={this.state.can_ban_users}
                can_update_perms={this.state.can_update_perms}
                updatePrivaledge={this.updatePrivaledge}
                addPrivaledge={this.addPrivaledge}
                assignNewPrivaledge={this.assignNewPrivaledge}
                updateGroupLimit={this.updateGroupLimit}
                leaveGroup={this.leaveGroup}
                editGroupName={this.editGroupName}
                banUser={this.banUser}
                banList={this.state.banList}
                unBanUser={this.unBanUser}
                notifications={this.state.notifications}
                UpdateNotifications={this.UpdateNotifications}
                /> 
                : null}
                {this.state.transitionLoading ? <SubLoading /> : null}
                {this.state.error !== false ? <Error action={this.closeError} message={this.state.error} /> : null}
                {this.state.loading ? null : <MenuButton toggle={this.toggleMenu} />}
                {this.state.loading ? <SubLoading transparent="false" /> : null}
                <GroupFeed 
                
                set_reply={this.set_reply}
                deletePost={this.deletePost}
                loadingMorePosts={this.state.loadingMorePosts} 
                onScroll={this.onScroll} 
                scrollRef={this.scrollPos} 
                posts={this.state.posts} 
                max={this.state.maximum}
                owner={this.state.owner}
                />
                {this.state.can_user_post ? 
                <GroupInput reply={this.reply} cancel_reply={this.cancel_reply} replying={this.state.replyToo} send={this.sendMessage} />
                : 
                <LackRequiredPermissions message="You Do Not Have Permission To Post In This Group"/>
                }
                {this.state.banned ? <BanPopUp reason={this.state.banReason} /> : null}
            </div>
            </>
        )
    }
}
