import React from 'react';
import './friends.css';


import {LoadingFriends} from './loading/loadingFriends'
import {Friend} from './FriendComponents/Friend';
import {Groups} from './groups/Groups';
import { Recents } from './Recents/Recents';

export class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {friends: ["no friends"], loading: false, reMounting: true}
    }
    UNSAFE_componentWillUpdate(newProps) {
        if (newProps.friends[0] !== this.state.friends[0]) {
            this.setState({friends: newProps.friends});
        } else if (this.state.friends[0] === 'no friends') {
            this.setState({friends: newProps.friends})
        }
    }
    componentDidMount() {
        document.getElementsByClassName('remounting-transition')[0].style.opacity = '0';
        setTimeout(() => {
            this.setState({reMounting: false})
        }, 500)
        
    }
    componentWillUnmount() {
        this.setState({reMounting: true})
    }
    render() {
        return (
            <div className="friends-container">
                {this.state.reMounting ? <div className="remounting-transition"></div> : null}
                <div className="friends-box">
                    {this.props.recents.length === 0 ? null : <Recents clearRecents={this.props.clearRecents} updateRecents={this.props.updateRecents} recents={this.props.recents} />}
                    {this.props.friends.length === 0 ? null :
                    
                    <div className="friend-title-container">
                        <h2>Friends</h2>
                    </div>}
                    {
                    this.props.friends[0] === 'loading' ? 
                    <LoadingFriends /> : 
                    this.state.friends.length === 0 ? 
                    <p className="no-friends-message">
                        No Friends, What are you wating for!
                    </p>
                    :
                    this.props.friends.map(friend => {
                        return <Friend updateRecents={this.props.updateRecents} open={this.props.open} key={friend.friend_name} friend={friend} />
                    })
                    }
                    <Groups updateRecents={this.props.updateRecents} newGroup={this.props.newGroup} groups={this.props.groups}/>
                    <div className="bottom-nav-spacer"></div>
                </div>
            </div>
        )
    }
}


