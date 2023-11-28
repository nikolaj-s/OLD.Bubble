import React from 'react';
import './landingpage.css';
import {
    Link, } from 'react-router-dom';


import { WelcomeSlideShow } from './landingpageComponents/WelcomeSlideShow';
import { CopyRight } from '../copyRight/CopyRight';
import { Helmet } from 'react-helmet';


export class LandingPage extends React.Component {
    render() {
        return (
            <div className="landingPage">
                <Helmet>
                    <meta property="og:image" content="https://res.cloudinary.com/drlkgoter/image/upload/v1616188826/Nor.%20X%20west/Bubblead_pba7et.jpg" data-rh="true" />
                </Helmet>
                <div className="inner-landing-page-container">
                    <h1>BUBBLE</h1>
                    <WelcomeSlideShow />
                    <Link to='/log-in'><button>ENTER</button></Link>
                    <p>Created By Nor. X West Designs</p>
                    <CopyRight landingPage={true} />
                </div>
                <div className="landing-page-bubbles-container">
                    <div className="loading-container">
                        <div className="bub-1 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-2 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-3 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-4 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-5 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-6 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-7 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-8 buble">
                        <div className="laccent"></div>
                        </div>
                        <div className="bub-9 buble">
                            <div className="laccent"></div>
                        </div>
                        <div className="bub-10 buble">
                            <div className="laccent"></div>
                        </div>
                    </div>
                </div>
                <div className="landing-page-shape-accent-container">
                    <div className="round-1"></div>
                    <div className="round-2"></div>
                    <div className="round-3"></div>
                </div>
            </div>
        )
    }
}