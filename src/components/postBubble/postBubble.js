import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './postBubble.css';

export class PostBubble extends Component {
    render() {
        return (
            <Link className="bubble" to={`/post/${this.props.id}`}>
            <div id={this.props.id}>
                <div className="accent">
               </div>    
            </div>
            </Link>
        )
    }
}
