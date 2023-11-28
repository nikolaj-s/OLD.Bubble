import React from 'react'

import history from '../../../history';

const Close = (props) => {
    const goBack = () => {
        history.goBack()
    }

    return (
        <div className="close-messenger-container">
        <svg className="close-messenger" onClick={goBack} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.304 0.281998L27.718 1.696L1.69598 27.716L0.281982 26.303L26.304 0.281998Z" fill="white"/>
        <path d="M1.69598 0.281998L27.718 26.302L26.304 27.717L0.281982 1.697L1.69598 0.281998Z" fill="white"/>
        </svg>
        </div>
    )
}




export const FriendTab = (props) => {
    const goToUser = () => {
        history.push(`/user/${props.friend}`)
    }
    return (
        <div className="friend-name">
            <h1 onClick={goToUser}>{props.friend}</h1>
            <Close />
        </div>
    )
}
