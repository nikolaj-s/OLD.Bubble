

import React, { Component } from 'react'


import './welcomeSlideShow.css';

export class WelcomeSlideShow extends Component {
   
    render() {

        return (
            <div className="welcome-slide-show-container">
                <div className="slide-show-inner-container">
                    <div className="landing-page-image-container">
                        <img src="https://res.cloudinary.com/drlkgoter/image/upload/v1616188826/Nor.%20X%20west/Bubblead_pba7et.jpg" alt="panel-slide" />
                    </div>
                    <div className="slide-info-panel">
                        <p>
                           Welcome to the Bubble, an open social media platform.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}


