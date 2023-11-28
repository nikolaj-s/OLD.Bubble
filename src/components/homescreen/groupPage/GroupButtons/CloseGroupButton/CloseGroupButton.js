import React from 'react'
import history from '../../../../history'

import './CloseGroupButton.css';

export const CloseGroupButton = (props) => {

    const goBack = () => {
        document.getElementsByClassName('bottomNav')[0].style = '';
        document.getElementsByClassName('post-button')[0].style = '';
        history.goBack();
    }

    return (
        <div onClick={goBack} className="close-group-container">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.304 11.282L38.718 12.696L12.696 38.716L11.282 37.303L37.304 11.282Z" fill="black"/>
            <path d="M12.696 11.282L38.718 37.302L37.304 38.717L11.282 12.697L12.696 11.282Z" fill="black"/>
            </svg>
        </div>
    )
}
