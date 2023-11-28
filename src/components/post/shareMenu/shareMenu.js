import React from 'react';
import './shareMenu.css';
import { CopyLink } from './copyLink';
import { getFriends } from '../../../util/authRoutes';

import { LoadingShareMenu } from './LoadingShareMenu';
import { FriendShare } from './FriendShare';
import { postMessage } from '../../../util/messageUtil/messageComs';

export class ShareMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            loading: true,
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.copyLink = this.copyLink.bind(this);
    }
    componentDidMount() {
        getFriends().then(res => {
            this.setState({friends: res, loading: false})
        })
    }
    sendMessage(id) {
        const link = `/post/${this.props.id}`;
        this.props.toggleSent("SENT");

        const index = this.state.friends.findIndex(e => e.messageId === id);

        const friends = this.state.friends;

        if (index === -1) {
            return;
        }

        friends.splice(index, 1);

        postMessage(id, link).then(() => {
            
        })
        
    }
    copyLink() {
        const link = window.location.pathname === '/' ? window.location.href + `post/${this.props.id}` : window.location.href
        document.getElementsByClassName('post-link')[0].value = link
        document.getElementsByClassName('post-link')[0].select()
        document.getElementsByClassName('post-link')[0].setSelectionRange(0, 99999);
        document.execCommand('copy')
        this.props.toggleSent("COPIED")
        
    }
    render() {
        return (
            <div className="share-menu-container">
                <textarea readOnly className="post-link"></textarea>
                {this.state.loading ? null : <CopyLink copy={this.copyLink} />}
                {
                this.state.loading ? 
                <LoadingShareMenu />
                 :
                this.state.friends.map(f => {
                    return ( 
                        <FriendShare sendMessage={this.sendMessage} key={f.messageId} f={f} />
                        )
                })}
                <div className="bottom-nav-spacer"></div>
            </div>
        )
    }
}