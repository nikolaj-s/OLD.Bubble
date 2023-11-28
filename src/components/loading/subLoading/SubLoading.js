import React from 'react'
import './SubLoading.css';


export const SubLoading = (props) => {
    return (
        <div style={{backgroundColor: props.transparent === "false" ? "rgb(151, 151, 151)" : "rgba(151, 151, 151, 0.466)"}} className="sub-loading-container">
            <div className="inner-sub-loading-container">
                <svg className="sub-loading-icon" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 50C21.626 50 18.3496 49.3408 15.2686 48.0371C12.29 46.7773 9.61914 44.9707 7.32422 42.6758C5.0293 40.3809 3.22266 37.71 1.96289 34.7314C0.65918 31.6504 0 28.374 0 25C0 24.0283 0.786133 23.2422 1.75781 23.2422C2.72949 23.2422 3.51562 24.0283 3.51562 25C3.51562 27.9004 4.08203 30.7129 5.20508 33.3643C6.28906 35.9229 7.83691 38.2227 9.80957 40.1953C11.7822 42.168 14.082 43.7207 16.6406 44.7998C19.2871 45.918 22.0996 46.4844 25 46.4844C27.9004 46.4844 30.7129 45.918 33.3643 44.7949C35.9229 43.7109 38.2227 42.1631 40.1953 40.1904C42.168 38.2178 43.7207 35.918 44.7998 33.3594C45.918 30.7129 46.4844 27.9004 46.4844 25C46.4844 22.0996 45.918 19.2871 44.7949 16.6357C43.7146 14.0833 42.1511 11.7637 40.1904 9.80469C38.2336 7.84139 35.9134 6.27752 33.3594 5.2002C30.7129 4.08203 27.9004 3.51562 25 3.51562C24.0283 3.51562 23.2422 2.72949 23.2422 1.75781C23.2422 0.786133 24.0283 0 25 0C28.374 0 31.6504 0.65918 34.7314 1.96289C37.71 3.22266 40.3809 5.0293 42.6758 7.32422C44.9707 9.61914 46.7725 12.2949 48.0322 15.2686C49.3359 18.3496 49.9951 21.626 49.9951 25C49.9951 28.374 49.3359 31.6504 48.0322 34.7314C46.7773 37.71 44.9707 40.3809 42.6758 42.6758C40.3809 44.9707 37.7051 46.7725 34.7314 48.0322C31.6504 49.3408 28.374 50 25 50V50Z" fill="black"/>
                </svg>
            </div>
        </div>
    )
}