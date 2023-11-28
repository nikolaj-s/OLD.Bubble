import React from 'react';
import './messenger.css';


import {Message} from './messengerComponents/message';
import { FriendTab } from './messengerComponents/friendTab';

import { postMessage, getMessages } from '../../../util/messageUtil/messageComs';

import {socket} from '../../../util/socket/socket'
import {scrollToBottom} from './messengerComponents/scrollToBottom'
import { imageNightMode } from '../../menu/NightMode/nightModeFunction';
import { SubLoading } from '../../loading/subLoading/SubLoading';
import { getPostPrev } from '../../../util/postUtil/getPostPrev';
import { SendMessageButton } from './messengerComponents/SendMessageButton';


export class Messenger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "", 
            messages: [], 
            interval: '', 
            friend: '', 
            mounted: false, 
            open: false, 
            socketOpen: false, 
            newMessage: false,
            loading: true,
            listen_token: "",
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.refresh = this.refresh.bind(this);
        this.finishingUpFunc = this.finishingUpFunc.bind(this);
        this.loadPost = this.loadPost.bind(this);
        this.fetchMessages = this.fetchMessages.bind(this);
    }
    shouldComponentUpdate(newProps, nextState) {

        if (this.state.newMessage !== nextState.newMessage || this.state.loading !== nextState.loading || !this.state.socketOpen || this.state.loading) {
            return true
        } else {
            return false
        }
    }
    UNSAFE_componentWillUpdate(newProps) {
        
        if (newProps.match.params.id !== this.state.id) {
         
            this.fetchMessages();
        }
    }
    
    async loadPost(_id) {
        if (!_id) return;
        const messages = this.state.messages;
        const find = (element) => element._id === _id;
        const index = messages.findIndex(find);

        if (!messages[index].post.post_id) return;

        const post_id = messages[index].post.post_id.split('/')[2];
        
        if (!messages[index].post.loading) return;
        await getPostPrev(post_id).then(post => {
            messages[index].post = post;
            this.setState({messages: messages, newMessage: true});
            this.setState({newMessage: false});
        })
        
    }
    finishingUpFunc() {
            scrollToBottom();
            try {
            document.getElementsByClassName('sub-loading-container')[0].style.opacity = "0"
            } catch(e) {
                this.setState({loading: false});
                scrollToBottom();
            }
            setTimeout(() => {
                
                setTimeout(() => {
                    scrollToBottom();
                    this.setState({loading: false});
                }, 400)
            })
            

    }
    fetchMessages() {
        const name = window.location.pathname.split('/')[2];
        const id = window.location.pathname.split('/')[3];
        this.setState({id: id, friend: name, mounted: true});
        getMessages(id, name).then(res => {
            res.messages.forEach(message => {
                if (message.post) {
                    const post_id = message.post;
                    message.post = {post_id: post_id, loading: true}
                }
            })
            if (this.state.mounted === false) return;
            this.setState({messages: res.messages, open: true, listen_token: res.listen_token});
        }).then(() => {
            if (!this.state.socketOpen) {
                this.refresh();
                this.setState({socketOpen: true});
            }  
        }).then(() => {
            this.finishingUpFunc();
        }) 
    }
    componentDidMount() {
         this.fetchMessages();
         document.getElementsByClassName('bottomNav')[0].style.display = 'none';
         document.getElementsByClassName('post-button')[0].style.display = 'none';
    }
    refresh() {
        socket.on(`message${this.state.listen_token}`, data => {
            if (data.post) {
                const post_id = data.post;
                data.post = {post_id: post_id, loading: true};
            }
            const existingMessages = this.state.messages;
            existingMessages.push(data);
            this.setState({messages: existingMessages, newMessage: true});
            
            this.setState({newMessage: false})
            setTimeout(() => {
                scrollToBottom('scroll-container');
            }, 500)
        })
    }
    sendMessage(e) {
        e.preventDefault();
        document.getElementById('messenger-input').focus();
        const id = this.state.id;
        const message = document.getElementById('messenger-input').value;
        if (!message) return;
        document.getElementById('messenger-input').value = ''
        postMessage(id, message).then(res => {
            const existingMessages = this.state.messages;
            existingMessages.push(res);
            this.setState({messages: existingMessages, newMessage: true});
            
        }).then(() => {
            setTimeout(() => {
                scrollToBottom('scroll-container');
            }, 500)
            this.setState({newMessage: false})
        })

    }
    componentWillUnmount() {
        socket.off(`message${this.state.id}`);
        clearInterval(this.state.interval);
        this.setState({_id: "", messages: [], open: false, mounted: false, socketOpen: false})
        document.getElementsByClassName('bottomNav')[0].style = '';
        document.getElementsByClassName('post-button')[0].style = '';
    }
    randomKey() {
        const key = Math.random(Math.floor() * 578);
        return key;
    }
    
    render() {
        return (
            <React.Fragment>
                <FriendTab  friend={this.state.friend} />
                <div  className="messanger-container">
                    {this.state.loading ? <SubLoading transparent="false" /> : null}
                    <div id="scroll-container" className="middle-container">
                        {this.state.messages.map(message => {
                            return <Message loadPost={this.loadPost} key={message._id + Math.random() * 5} friend={this.state.friend} message={message} />
                        })}
                        <div className="message-input-spacer"></div>
                    </div>
                        
                    <div className="input-container">
                        <input style={{filter: imageNightMode(), color: imageNightMode() !== null ? 'white' : 'black'}} maxLength="254" id="messenger-input" type="text" placeholder="Msg..." />
                        <button className="send-button-container" onMouseDown={this.sendMessage}>
                            <SendMessageButton />
                        </button>
                            
                    </div>
                </div>
            </React.Fragment>
                
        )
    }
}