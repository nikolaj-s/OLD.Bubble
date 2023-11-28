import React from 'react';
import './results.css';
import {Default} from '../../defaulicon/default';
import { imageNightMode } from '../NightMode/nightModeFunction';
import history from '../../history';


const User = (props) => {
    const goToUser = () => {
        history.push(`/user/${props.account.username}`);
        props.toggleMenu();
    }
    return (
        <div onClick={goToUser} key={props.account.username} className="account-box">
                {
                props.account.profilepic === undefined || !props.account.profilepic ? <Default /> :
                <img style={{filter: imageNightMode()}} className="pro-pic" src={props.account.profilepic} alt="pic" loading="lazy" />
                }
                <h4>{props.account.username}</h4>
        </div>
    )
}

export class Results extends React.Component {

    render() {
        
        return (
            <div className="results">
                <h2>Suggestions</h2>
                {
                this.props.accounts === undefined ? <h5>No Suggestions</h5> :
                this.props.accounts.length === 0  ? <h5>No Suggestions</h5> : null}
                {
                this.props.accounts === undefined ? <h5>No Results</h5> :
                this.props.accounts === 'no results' ? <h5>No Results</h5> :
                this.props.accounts.map(account => {
                return (
                    <User toggleMenu={this.props.toggleMenu} username={this.props.username} addFriend={this.props.addFriend} key={account.username} account={account} />
                )   
                    
                })}
            </div>
        )
    }
}