import React from 'react'

import './PWANAV.css'

export const PWANAV = (props) => {
    
    return (
        <>
            <div className="minimize-button">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.8125 32.8125H2.1875C0.977539 32.8125 0 31.835 0 30.625C0 29.415 0.977539 28.4375 2.1875 28.4375H32.8125C34.0225 28.4375 35 29.415 35 30.625C35 31.835 34.0225 32.8125 32.8125 32.8125Z" fill="black"/>
            </svg>

            </div>
            <div className="maximize-button">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 0C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V8.5C0 8.89782 0.158035 9.27936 0.43934 9.56066C0.720644 9.84196 1.10218 10 1.5 10H8.5C8.89782 10 9.27936 9.84196 9.56066 9.56066C9.84196 9.27936 10 8.89782 10 8.5V1.5C10 1.10218 9.84196 0.720644 9.56066 0.43934C9.27936 0.158035 8.89782 0 8.5 0H1.5ZM1.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645C8.94732 1.24021 9 1.36739 9 1.5V8.5C9 8.63261 8.94732 8.75979 8.85355 8.85355C8.75979 8.94732 8.63261 9 8.5 9H1.5C1.36739 9 1.24021 8.94732 1.14645 8.85355C1.05268 8.75979 1 8.63261 1 8.5V1.5C1 1.36739 1.05268 1.24021 1.14645 1.14645C1.24021 1.05268 1.36739 1 1.5 1V1Z" fill="black"/>
            </svg>


            </div>
            <div className="close-button">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.3042 0.281998L27.7182 1.696L1.69623 27.716L0.282227 26.303L26.3042 0.281998Z" fill="black"/>
            <path d="M1.69623 0.281998L27.7182 26.302L26.3042 27.717L0.282227 1.697L1.69623 0.281998Z" fill="black"/>
            </svg>


            </div>
        </>
    )
}