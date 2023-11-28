import React from 'react'
import { Link } from 'react-router-dom'

import './CopyRight.css';

export const CopyRight = (props) => {
    return (
        <div className="copy-right-component">
            <div className="copy-right-top">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 0C11.2 0 0 11.2 0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0ZM25 45C14 45 5 36 5 25C5 14 14 5 25 5C36 5 45 14 45 25C45 36 36 45 25 45Z" fill="#4D5357"/>
                    <path d="M18.3999 17.3C19.2999 16.3 20.3999 15.5 21.6999 15C22.9999 14.4 24.2999 14.1 25.6999 14.1C27.3999 14.1 29.0999 14.5 30.4999 15.4C31.8999 16.2 33.1999 17.4 34.0999 18.7L37.6999 16C36.2999 14.2 34.5999 12.6 32.5999 11.6C30.4999 10.5 28.2999 10 25.7999 10C23.7999 10 21.7999 10.4 19.9999 11.2C18.1999 12 16.5999 13.1 15.2999 14.4C13.9999 15.8 12.8999 17.3 12.0999 19.2C11.2999 21 10.8999 23 10.8999 25C10.8999 27.1 11.2999 29 12.0999 30.8C12.8999 32.6 13.8999 34.2 15.2999 35.6C16.5999 37 18.1999 38 19.9999 38.8C21.7999 39.6 23.6999 40 25.7999 40C28.2999 40 30.5999 39.5 32.5999 38.4C34.5999 37.3 36.3999 35.8 37.6999 34L34.0999 31.3C33.1999 32.7 31.9999 33.8 30.4999 34.6C28.9999 35.4 27.3999 35.8 25.6999 35.8C24.2999 35.8 22.9999 35.5 21.6999 34.9C20.4999 34.3 19.3999 33.5 18.3999 32.6C17.4999 31.6 16.6999 30.5 16.1999 29.2C15.6999 27.9 15.3999 26.5 15.3999 25C15.3999 23.5 15.6999 22.1 16.1999 20.8C16.6999 19.5 17.4999 18.3 18.3999 17.3Z" fill="#4D5357"/>
                </svg>
                <p>The Bubble Network</p>
            </div>
               
            <div className="terms-link-container">
                <div className="black-circle"></div>
                <Link onClick={props.toggleMenu ? props.toggleMenu : null} to={props.landingPage ? '/terms' : '/terms-and-services'}>Terms And Services</Link>
                <div className="black-circle"></div>
            </div>
            <div className="terms-link-container">
                <div className="black-circle"></div>
                <Link onClick={props.toggleMenu ? props.toggleMenu : null} to={props.landingPage ? '/content' : '/content-policy'}>Content Policy</Link>
                <div className="black-circle"></div>
            </div>
            <div className="terms-link-container">
                <div className="black-circle"></div>
                <Link onClick={props.toggleMenu ? props.toggleMenu : null} to={props.landingPage ? '/privacy' : '/privacy-policy'}>Privacy Policy</Link>
                <div className="black-circle"></div>
            </div>
        </div>
    )
}
