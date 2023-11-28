import React from 'react';
import './comments.css';
import { Comment } from './comment';
import { postComment, getComments } from '../../../util/commentsCommunication'


import {matchMedia} from '../../matchMedia';
import { imageNightMode } from '../../menu/NightMode/nightModeFunction';
import { ReplyFunction } from './commentUtil/ReplyFunction';

export class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            current: 0,
            commentCount: 10,
            comment: "",
            loading: false,
            moreComments: true,
            replyTo: "",
            replyId: "",
            replying: false
        }
        this.scroll = React.createRef();
        this.updateComment = this.updateComment.bind(this);
        this.post = this.post.bind(this);
        this.getMoreComments = this.getMoreComments.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.reply = this.reply.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
        this.sendReply = this.sendReply.bind(this);
    }
    cancelReply(e) {
        e.preventDefault();
        this.setState({replyTo: "", replyId: "", replying: ""});
    }
    reply(id, user) {
        this.setState({replyTo: user, replyId: id, replying: true});
        document.getElementById('comment-input').focus();
    }
    async sendReply(e) {
        e.preventDefault();
        const current_comments = this.state.comments;

        const comment = document.getElementById('comment-input').value;

        const replyingTo = this.state.replyTo;
        const comment_id = this.state.replyId;
        const post_id = this.props.postId;

        if (!replyingTo || !comment_id || !post_id || !current_comments || !comment || comment.length > 100) {
            return;
        }

        const reply = await ReplyFunction(current_comments, replyingTo, comment, comment_id, post_id);
        
        this.setState({comments: reply, replyTo: "", replyId: "", replying: ""});
        
    }
    updateComment() {
        const data = document.getElementById('comment-input').value;
        this.setState({comment: data});
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.loadMore === true && this.state.loading === false) {
            this.getMoreComments();
        }
    }
    componentDidMount() {
        this.setState({loading: true})
        getComments(this.state.current, this.state.commentCount, this.props.postId).then(res => {
            if (res.error) return;
            this.setState({comments: res, loading: false});
        })
        
    }
    post(e) {
        e.preventDefault();
        if (!this.state.comment) return;
        if (!this.props.postId) return
        this.setState({comment: ""})
        document.getElementById('comment-input').value = ""
        postComment(this.props.postId, this.state.comment).then(res => {
            console.log(res);
            if (res.error) return;
            const currentComments = this.state.comments;
            currentComments.unshift(res)
            this.setState({comments: currentComments});
        })
    }
    componentWillUnmount() {
        this.onUnFocus();
        document.getElementsByClassName('post-button')[0].style.display = ''
        document.getElementsByClassName('bottomNav')[0].style.display = ''
        document.getElementsByClassName('post-comment')[0].style.bottom = ''
    }
    getMoreComments() {
        if (this.state.loading === true) return;
        if (this.props.commentCount + 10 <= this.state.commentCount) return;
        if (!this.state.moreComments) return;
        let current = this.state.current;
        current+=10;
        let next = this.state.commentCount;
        next+=10;
        this.setState({loading: true})
        getComments(current, next, this.props.postId).then(res => {
            const newComments = this.state.comments.concat(res);
            return newComments;
        }).then(c => {
            if (this.state.comments.length === c.length) {
                this.setState({moreComments: false, loading: false});
                return;
            }
            this.setState({comments: c, current: current, commentCount: next, loading: false})
        })
    }
    generateRandomKey() {
        return Math.random() * 32
    }
    onFocus() {
        if (matchMedia()) return;

        // on mobile this will make the nav items disapear
        document.getElementsByClassName('post-button')[0].style.display = 'none'
        document.getElementsByClassName('bottomNav')[0].style.display = 'none'
        document.getElementsByClassName('post-comment')[0].style.bottom = '10px'
        try {
            document.getElementsByClassName('close-opened-post')[0].style.display = 'none'
        } catch (error) {

        }
    }
    onUnFocus() {
        if (matchMedia()) return;
        //on mobile  this will make the nav menu items re-apear
        document.getElementsByClassName('post-button')[0].style.display = ''
        document.getElementsByClassName('bottomNav')[0].style.display = ''
        document.getElementsByClassName('post-comment')[0].style.bottom = ''
        try {
            document.getElementsByClassName('close-opened-post')[0].style.display = ''
        } catch (error) {

        }
    }
    onScroll() {
        // detects scroll position, when it gets close to the bottom it will call more comments
        const scroll = this.scroll.current;
        if ((scroll.scrollHeight - scroll.scrollTop) <= scroll.clientHeight + 5) {
            if (!this.state.loading) {
                this.getMoreComments();
            }
            
        } 
    }
    render() {
        return (
            <React.Fragment>
                <div onScroll={this.onScroll} ref={this.scroll} id="comment-section" className="comments">
                    {this.state.comments.map((c, index) => {
                        return <Comment reply={this.reply} key={this.generateRandomKey()} comment={c} />
                    })}
                    {this.state.loading ? <h4>Loading...</h4> : null}
                </div>
                <div className='post-comment'>
                    {
                    this.state.replying ? 
                    <div className="replying-to-container">
                        <p>{this.state.replyTo}</p>
                        <p onMouseDown={this.cancelReply}>x</p>
                    </div>
                    :
                    null
                    }
                    <div className="input-comment-container">
                        <input style={{filter: imageNightMode(), color: imageNightMode() !== null ? 'white' : 'black', borderColor: imageNightMode() !== null ? 'white' : 'black'}} onFocus={this.onFocus} onBlur={this.onUnFocus} maxLength="50" type="text" id="comment-input" placeholder="Comment..." onChange={this.updateComment} />
                        {this.state.replying ? <button onMouseDown={this.sendReply}>Reply</button> : <button onMouseDown={this.post}>Post</button>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}