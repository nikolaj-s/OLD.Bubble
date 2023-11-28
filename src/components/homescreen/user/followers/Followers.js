import React, { Component } from 'react'
import { getFollowers } from '../../../../util/account/getFollowers';
import './Followers.css';
import { CloseFollowers } from './CloseFollowers';
import { Follower } from './Follower';

export default class Followers extends Component {
    constructor(props) {
        super(props);
        this.state = {followers: [], loading: true}
    }
    componentDidMount() {
        setTimeout(() => {
            const user = this.props.username;

            getFollowers(user).then(res => {
                if (res.error) return this.setState({loading: false});
                this.setState({followers: res, loading: false});
            })
        }, 500)
    }
    
    render() {
        return (
            <div className="followers-container">
                <div className="follower-nav-container">
                    <h3>Followers</h3>
                    <CloseFollowers close={this.props.toggleFollowerMenu} />
                </div>
                <div className="followers-inner-container">
                    {this.state.loading ? 
                        Array(this.props.followers).fill('token').map((x, i) => {
                            return (<div key={i} className="follower-container loading-gradient" ></div>)
                        })
                     : 
                    this.state.followers.length === 0 ? 
                    <p>No Followers To See Here</p>
                    :
                    this.state.followers.map(user => {
                        return (
                            <Follower user={user} key={user.username} />
                        )
                    })}
                </div>
            </div>
        )
    }
}
