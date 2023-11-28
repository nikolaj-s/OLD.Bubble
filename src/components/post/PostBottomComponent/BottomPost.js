import React, { Component } from 'react'
import { ShareMenu } from '../shareMenu/shareMenu';
import { Comment, Share } from './postNav';
import { Comments } from '../comments/comments';
import { SentNotification } from './SentNotification';

export class BottomPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareMenu: false,
            displayComments: false,
            sent: false,
            message: ""
        }
        this.toggleShareMenu = this.toggleShareMenu.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.toggleSentNotification = this.toggleSentNotification.bind(this);
    }
    toggleShareMenu() {
        if (this.state.shareMenu) {
            this.setState({shareMenu: false})
        } else {
            this.setState({shareMenu: true, displayComments: false})
            document.getElementsByClassName('post-button')[0].style = ''
            document.getElementsByClassName('bottomNav')[0].style = '';
            try {
                document.getElementsByClassName('close-opened-post')[0].style.display = ''
            } catch(error) {

            }
        }
    }
    toggleComments() {
        if (this.state.displayComments) {
            this.setState({displayComments: false})
        } else {
            this.setState({displayComments: true, shareMenu: false})
        }
    }
    toggleSentNotification(msg) {
        this.setState({sent: true, message: msg});
        setTimeout(() => {
            document.getElementsByClassName('sent-container')[0].style.opacity = '0'
            setTimeout(() => {
                this.setState({sent: false, message: ""})
            }, 250)
        }, 250)
    }
    render() {
        return (
            <>
            {this.state.sent ? <SentNotification message={this.state.message} /> : null}
            <div className="clicks-container">
                    {this.props.commentCount === 'disabled' ? null : <Comment onClick={this.toggleComments} />}
                    {this.props.commentCount === 'disabled' ? null : this.props.loading ? <div className="clicks-loading loading-gradient"></div> :<p>{this.props.clicks} /clicks</p>}
                    {this.props.commentCount === 'disabled' ? null : <Share onClick={this.toggleShareMenu} />}
            </div>
            {!this.state.shareMenu && !this.state.displayComments ? <div style={{width: "100%", height: '200px', padding: "2rem 0", flexShrink: '0'}} className="spacer-padding"></div> : null}
            {this.state.shareMenu ? <ShareMenu id={this.props.id} toggleSent={this.toggleSentNotification} /> : null}
            {this.state.displayComments ? <Comments toggleMoreComments={this.props.toggleMoreComments} loadMore={this.props.moreComments} postId={this.props.id} commentCount={this.props.comments}/> : null}
            </>
        )
    }
}
