import React from 'react'
import { imageNightMode } from '../../menu/NightMode/nightModeFunction'
import { Replies } from './commentUtil/Replies';
import { UserComponent } from './commentUtil/UserComponent';

export class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {repliesOpen: true, limited: true, limit: 4}
        this.reply = this.reply.bind(this);
        this.openReplies = this.openReplies.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }
    reply(e) {
        e.stopPropagation();
        this.props.reply(this.props.comment._id,'@' + this.props.comment.user);
    }
    openReplies() {
        if (this.props.comment.replies.length === 0) return;
        if (this.state.repliesOpen) {
            this.setState({repliesOpen: false});
        } else {
            this.setState({repliesOpen: true});
        }
    }
    loadMore(e) {
        e.stopPropagation();
        let currentLimit = this.state.limit;
        if (this.props.comment.replies.length >= currentLimit) {
            currentLimit+=5;
            this.setState({limit: currentLimit});
        } else {
            this.setState({limited: false})
        }
    }
    render() {
        return (
            <div onClick={this.openReplies} className="comment">
                    
                <div className="comment-content">
                    <div className="inner-comment-content-container">
                        <UserComponent user={this.props.comment.user} user_image={this.props.comment.user_image} />
                        <p style={{filter: imageNightMode(), color: imageNightMode() !== null ? 'white' : null}}>{this.props.comment.comment}</p>
                    
                    </div>
                    <div className="comment-reply-nav">
                        <p onClick={this.reply}>Reply</p>
                        <p onClick={this.openReplies}>{this.props.comment.replies.length} {this.props.comment.replies.length === 1 ? 'Reply' : 'Replies'}</p>
                    </div>
                </div>
                {
                    this.state.repliesOpen && this.props.comment.replies.length > 0 ?
                    <Replies loadMore={this.loadMore} limit={this.state.limit} limited={this.state.limited} replies={this.props.comment.replies} />
                    :
                    null
                }
            </div>
        )
    }
    
}
