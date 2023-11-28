import React from 'react'
import { imageNightMode } from '../../../../menu/NightMode/nightModeFunction';
import { VideoPlayerComponent } from '../../../../VideoPlayComponent/VideoPlayerComponent';

import './PinnedPost.css';

export const PinnedPost = (props) => {
    
    return (
        <div className="pinned-post-container">
            <div className="pinned-header-container">
            <div className="featured-container-pin">
                <svg className="pinned-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 5V12H13.722C13.316 12 12.944 11.914 12.605 11.742C12.2603 11.565 11.9609 11.3111 11.73 11H8.87C8.72867 11.3008 8.54479 11.5796 8.324 11.828C8.10796 12.0705 7.86082 12.2833 7.589 12.461C7.319 12.638 7.024 12.771 6.707 12.859C6.38609 12.9481 6.05503 12.9955 5.722 13H5.222V9H2L1 8.5L2 8H5.222V4H5.722C6.061 4 6.386 4.047 6.699 4.14C7.011 4.234 7.306 4.367 7.582 4.54C8.14432 4.89089 8.59197 5.39831 8.87 6H11.729C11.9617 5.69256 12.2608 5.44165 12.604 5.266C12.942 5.094 13.314 5.006 13.721 5H14ZM13.222 6.086C13.1083 6.1221 13.0005 6.17466 12.902 6.242C12.7274 6.36326 12.5808 6.52044 12.472 6.703L12.285 7H8.183L8.066 6.664C7.92449 6.2589 7.67936 5.89793 7.355 5.617C7.027 5.331 6.427 5.09 6 5V12C6.427 11.912 7.027 11.67 7.355 11.383C7.683 11.096 7.92 10.747 8.065 10.336L8.184 10H12.286L12.466 10.297C12.523 10.391 12.588 10.474 12.661 10.547C12.734 10.62 12.814 10.69 12.903 10.757C12.991 10.826 13.098 10.877 13.223 10.914V6.086H13.222Z" fill="black"/>
                </svg>
                <h3>Pinned</h3>
            </div>
            
                <div className="remove-pinned-post-container">
                    {props.your_profile ? <svg onClick={props.removePinnedPost} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                    <path d="M11.5 -0.0310059C9.542 -0.0310059 7.969 1.59599 7.969 3.56299V3.99999H4C3.449 3.99999 3 4.44899 3 4.99999V5.99999H2V7.99999H4V23C4 24.645 5.355 26 7 26H19C20.645 26 22 24.645 22 23V7.99999H24V5.99999H23V4.99999C23 4.44899 22.551 3.99999 22 3.99999H18.031V3.56199C18.031 1.59599 16.458 -0.0310059 14.5 -0.0310059H11.5V-0.0310059ZM11.5 2.03099H14.5C15.304 2.03099 15.969 2.68699 15.969 3.56199V3.99999H10.03V3.56199C10.03 2.68699 10.695 2.03199 11.499 2.03199L11.5 2.03099ZM6 7.99999H11.125C11.249 8.01299 11.372 8.03099 11.5 8.03099H14.5C14.628 8.03099 14.75 8.01299 14.875 7.99999H20V23C20 23.563 19.563 24 19 24H7C6.437 24 6 23.563 6 23V7.99999ZM8 9.99999V22H10V9.99999H8ZM12 9.99999V22H14V9.99999H12ZM16 9.99999V22H18V9.99999H16Z" fill="black"/>
                    </g>
                    <defs>
                    <clipPath id="clip0">
                    <rect width="26" height="26" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                : null}
                </div>
            </div>
            <div className="pinned-post-content-container">
                {
                    props.pinned.preview_content ? 
                    props.pinned.preview_content.endsWith('.jpg') || props.pinned.preview_content.endsWith('.jpeg') || props.pinned.preview_content.endsWith('.webp') || props.pinned.preview_content.endsWith('.gif') || props.pinned.preview_content.endsWith('.png') ?
                    <img style={{filter: imageNightMode()}} src={props.pinned.preview_content} alt="pinned-post" className="pinned-image" /> : props.pinned.preview_content.endsWith('.mp4') || props.pinned.preview_content.endsWith('.webm') ?
                    <VideoPlayerComponent video={props.pinned.preview_content} /> : null : null
                }
            </div>
            <div className="pinned-post-info-container">
                <p style={{marginLeft: '.5rem'}}>{props.pinned.preview_text}</p>
                <p style={{opacity: 0.5, marginRight: '.5rem'}}>{props.pinned.clicks} / clicks</p>
            </div>
        </div>
    )
}
