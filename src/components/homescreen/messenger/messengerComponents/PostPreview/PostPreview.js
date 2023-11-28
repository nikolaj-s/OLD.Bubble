import React, { Component } from 'react'
import './PostPreview.css';
import history from '../../../../history'
import { imageNightMode } from '../../../../menu/NightMode/nightModeFunction';
import VisibleContainer from 'react-visibility-sensor'

export class PostPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {message_id: "", id: "",loading: true, content: "", text: "post", username: "", visible: false, loaded: false}
        this.openPost = this.openPost.bind(this);
        this.isVisisble = this.isVisisble.bind(this);
        this.visible = React.createRef();
    }
    shouldComponentUpdate() {
        if (this.state.loaded) {
            return false;
        } else {
            return true;
        }
    }
    openPost() {
        if (!this.props.post._id) return; 
        const id = this.props.post._id
        history.push('/post/' + id);
    }
    isVisisble(visible) {
        if (visible && this.props._id && this.state.loaded === false) {
            this.props.loadPost(this.props._id);   
        }
    }
    render() {
        return (
            <VisibleContainer ref={this.visible} onChange={this.isVisisble} >
            <div onClick={this.openPost} className="message-post-container">
                {this.props.post.loading ? <div className="loading-gradient post-prev-cont-loading"></div>
                 : 
                <div className="post-prev-container">
                <h4>{this.props.post.username}</h4>
                {this.props.post.previewContent ? <img style={{filter: imageNightMode()}} src={this.props.post.previewContent} alt={<div></div>} /> : !this.props.post.previewText ? <p style={{color: 'black', cursor: "default", padding: "4rem 0", textAlign: "center"}}>This post has been deleted</p> : null}
                <p style={{filter: imageNightMode(), color: imageNightMode() ? "white" : "black"}} id="pre-subtext">{this.props.post.previewText}</p>
                </div>
                }
            </div>
            </VisibleContainer>
        )
    }
}
