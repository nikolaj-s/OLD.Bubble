import React, { Component } from 'react'
import './submenu.css'
import { removeFriend } from '../../../../util/remove';

export class Submenu extends Component {
    constructor(props) {
        super(props)
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
    }
    remove(e) {
        e.stopPropagation()
        removeFriend(this.props.username)
        this.props.removeFriend();
    }
    add(e) {
        e.stopPropagation()
        this.props.addFriend();
    }
    render() {
        return (
            <div className="sub-menu">
                <button onClick={this.props.block} className="top-user-sub-button" id="block-button" >BLOCK</button>
                {
                this.props.friends ? <button className="bottom-user-sub-button" onClick={this.remove}>REMOVE</button> 
                : 
                <button className="bottom-user-sub-button" onClick={this.add} >ADD FRIEND</button>
                }
            </div>
        )
    }
}


