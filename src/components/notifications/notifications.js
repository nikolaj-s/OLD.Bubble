import React from 'react';
import {getNotifications, clearNotifications} from '../../util/authRoutes';
import './notifications.css';
import { ignoreRequest } from '../../util/notificationFetch';
import logo from '../landingpage/logo.png'
import {counter} from './notificationComponents/counter'
import {socket} from '../../util/socket/socket';
import {Message} from './notificationComponents/Message/Message'
import { checkIfMessangerIsOpen } from './notificationComponents/checkIfMessangerIsOpen';
import { FollowRequest } from './notificationComponents/FollowRequest';
import { FriendRequest } from './notificationComponents/FriendRequest/FriendRequest';
import { LikeMessage } from './notificationComponents/LikeMessage';
import {acceptFollow} from '../../util/followComs';
import { RefreshButton } from './refresh/RefreshButton';
import { DeleteIcon } from './notificationComponents/DeleteIcon';
import { GroupInvite } from './notificationComponents/GroupInvite/GroupInvite';
import { ignoreGroupInvite } from '../../util/notificationUtil/notificationUtil';
import { SubLoading } from '../loading/subLoading/SubLoading';
import { BanMessage } from './notificationComponents/BanMessage/BanMessage';
import { GroupMessage } from './notificationComponents/GroupMessage/GroupMessage';
import { checkIfGroupIsOpen } from './notificationComponents/Util/CheckIfGroupIsOpen';


export class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [], 
            interval: [], 
            socketLoaded: false,
            loading: false
        }
        this.clear = this.clear.bind(this);
        this.ignoreRequest = this.ignoreRequest.bind(this);
        this.updateNotification = this.updateNotification.bind(this);
        this.accept = this.accept.bind(this);
        this.filterOut = this.filterOut.bind(this);
        this.followRequest = this.followRequest.bind(this);
        this.getNotifications = this.getNotifications.bind(this);
        this.refresh = this.refresh.bind(this);
        this.removeGroupInvite = this.removeGroupInvite.bind(this);
        this.acceptGroupInvite = this.acceptGroupInvite.bind(this);
        this.openGroupNotification = this.openGroupNotification.bind(this);
    }
    componentDidUpdate() {
        const notifications = this.state.notifications;
        if (notifications.length === 0) {
            return;
        }
        try {
            for (let i = 0; i < notifications.length; i++) {
                const name = notifications[i].user;

                document.getElementsByClassName(name + 'user')[0].style.opacity = '1';
            }
        } catch(error) {

        }
        
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if(newProps.socket_loaded === true && this.state.socketLoaded === false) {
            this.setState({socketLoaded: true});
            this.updateNotification();
        }
    }
    componentDidMount() {
        this.getNotifications();
    }
    async getNotifications() {
        try {
        await getNotifications().then(notifications => {
                if (notifications.length === 0) return;
                if (!notifications) return;
                this.setState({notifications: notifications.notifications});
                    
                const notificationCount = this.state.notifications.length;
                if (notificationCount > 0) {
                    document.getElementsByClassName('notification-counter')[0].innerHTML = notificationCount;
                    document.getElementsByClassName('notification-counter')[0].style.opacity = "1";
                } else {
                    document.getElementsByClassName('notification-counter')[0].innerHTML = "";
                    document.getElementsByClassName('notification-counter')[0].style.opacity = "0";
                }
                })   
        } catch(error) {
            this.setState({notifications: ['error retrieving notifications']})
        }
    }
    pushNotification(notification) {
        // this function is for web notifications and pushing them to the desktop
        if (notification.accepted === false) return;
        const notify = new Notification('New message from Buubl', {
            body: notification,
            icon: logo
        })
        notify.onclick = (e) => {
            window.location.href = window.location.pathname;
        }
    }
    refresh(e) {
        e.stopPropagation();
        document.getElementsByClassName('refresh-spinner')[0].classList.add('refreshAnimation');
        setTimeout(() => {
            this.getNotifications().then(() => {
                setTimeout(() => {
                    document.getElementsByClassName('refresh-spinner')[0].classList.remove('refreshAnimation');
                })
            })
        }, 1000)
            

    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
        this.setState({notifications: []})
    }
    ignoreRequest(id) {
        const existingNotifications = this.state.notifications;
        const foundElement = (element) => element._id === id;
        const index = existingNotifications.findIndex(foundElement);
        existingNotifications.splice(index, 1);
        this.setState({notifications: existingNotifications});
        counter(this.state.notifications.length)
        ignoreRequest(id);
    }
    randomKey() {
        const key = Math.random(Math.floor() * 578);
        return key;
    }
    updateNotification(n) {
        socket.on('notification', data => {

            if (data.type === 'group-message') {
                const status = checkIfGroupIsOpen(data.group_name);

                if (status) {
                    return;
                }
            }

            const messangerOpen = checkIfMessangerIsOpen(data);
            if (messangerOpen) return;
            const existingNotifications = this.state.notifications;
            existingNotifications.unshift(data);
            this.setState({notifications: existingNotifications});
            counter(this.state.notifications.length);
            try {
                this.pushNotification(data.msg);
            } catch(error) {

            }
        })
        
    }
    openGroupNotification(group_name) {
        const notifications = this.state.notifications;

        const filtered = [];

        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i].group_name !== group_name) {
                filtered.push(notifications[i])
            }
        }

        this.setState({notifications: filtered});

        this.props.openGroupNotification(group_name);

        this.props.close();

        counter(filtered.length);
    }
    clear(e) {
        e.stopPropagation();
        const notifications = this.state.notifications;
        
        counter(0);
        if (notifications.length === 0) {
            return;
        }
        this.setState({notifications: []});
        if (window.location.pathname === '/friends') {
            document.getElementsByClassName('friend-alert')[0].style.opacity = '0';
        }
        clearNotifications()
        
    }
    accept(_id, users) {
        const existingNotifications = this.state.notifications;
        const foundElement = (element) => element.friend_id === _id;
        const index = existingNotifications.findIndex(foundElement);
        existingNotifications.splice(index, 1);
        this.setState({notifications: existingNotifications});
        counter(this.state.notifications.length)
        this.props.accept(_id, users);
    }
    filterOut(user) {
        const messages = [];

        this.state.notifications.forEach(n => {
            if (n.type !== 'message' && n.user !== user) {
                messages.push(n);
            }
        })
        counter(messages.length);
        this.setState({notifications: messages});
        this.props.close();
    }
    followRequest(user, option) {
        const existingNotifications = this.state.notifications;
        const foundElement = (element) => element.user === user && element.type === 'follow request';
        const index = existingNotifications.findIndex(foundElement);
        existingNotifications.splice(index, 1);
        this.setState({notifications: existingNotifications});
        acceptFollow(user, option);
        counter(this.state.notifications.length);
    }
    removeGroupInvite(name) {
        const current = this.state.notifications;
        const index = current.findIndex(element => element.name === name && element.type === 'group_invite');
        current.splice(index, 1);
        this.setState({notifications: current});
        counter(this.state.notifications.length);
        ignoreGroupInvite(name);
    }
    acceptGroupInvite(inviteToken, name) {
        this.setState({loading: true});
        const current = this.state.notifications;
        const index = current.findIndex(element => element.invite_token === inviteToken);
        current.splice(index, 1);
        this.props.acceptGroupInvite(inviteToken).then(res => {
            this.setState({loading: false});
            this.removeGroupInvite(name);
        })
    }
    render() {
        return (  
            <div className="notification-container">
                <div className="inner-notification-container">
                    {this.state.loading ? <SubLoading /> : null}
                {this.state.notifications.length === 0 ? <h2 className="no-notif">No Notifications</h2> :
                    this.state.notifications.map(obj => {
                        return (
                            obj.type === 'follow request' ?
                            <FollowRequest option={this.followRequest} request={obj} key={obj.date} />
                            : obj.type === 'friend request' ?
                            <FriendRequest accept={this.accept} ignore={this.ignoreRequest} request={obj} key={obj.date} />
                            : obj.type === 'like' ? 
                            <LikeMessage key={obj.date} like={obj} />
                            : obj.type === 'group_invite' ?
                            <GroupInvite accept={this.acceptGroupInvite} ignore={this.removeGroupInvite} invite={obj} key={obj.date} />
                            : obj.type === 'ban-message' ? 
                            <BanMessage message={obj} key={obj.time} /> : 
                            obj.type === 'group-message' ? 
                            <GroupMessage openGroupNotification={this.openGroupNotification} message={obj} key={obj.time} />
                            :
                            <Message filterOut={this.filterOut} key={obj.date} message={obj} />
                        ) 
                    })
                }
                <RefreshButton action={this.refresh} />
                {this.state.notifications.length > 0 ? <div onClick={this.clear} className='clear-container'>
                    <DeleteIcon />
                </div> : null}
                <div style={{flexShrink: 0, height: 150, width: '100%'}}></div>
                </div>
                
            </div>
        )
    }
}