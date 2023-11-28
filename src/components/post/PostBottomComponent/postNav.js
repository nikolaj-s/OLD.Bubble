import React from 'react'


export const Share = (props) => {
    return (
        <div style={{marginRight: '0.5rem'}} onClick={props.onClick} className="post-nav-button-container">
            <svg className="post-share-button" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.9243 0.654907C49.5933 0.39888 49.1911 0.235762 48.7644 0.184562C48.3378 0.133362 47.9043 0.196189 47.5144 0.365721L0.737061 20.8223V24.7807L20.3845 32.1027L32.9871 50.1672H37.2365L50.6632 2.81189C50.772 2.42408 50.7604 2.01543 50.6296 1.63354C50.4988 1.25166 50.2542 0.912269 49.9243 0.654907V0.654907ZM34.6129 46.3918L23.7804 30.8643L40.4496 13.854L37.8122 11.6104L21.0124 28.7532L4.81305 22.7161L46.493 4.48815L34.6129 46.3918Z" fill="black"/>
            </svg>
        </div>
    )
}

export const Comment = (props) => {
    return (
        <div style={{marginLeft: '0.5rem'}} onClick={props.onClick} className="post-nav-button-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C10.6868 2 9.38641 2.25866 8.17315 2.7612C6.9599 3.26375 5.85751 4.00035 4.92892 4.92893C3.05356 6.8043 1.99999 9.34784 1.99999 12C1.99125 14.3091 2.79078 16.5485 4.25999 18.33L2.25999 20.33C2.12123 20.4706 2.02723 20.6492 1.98986 20.8432C1.95249 21.0372 1.97341 21.2379 2.04999 21.42C2.13305 21.5999 2.26769 21.7511 2.43683 21.8544C2.60598 21.9577 2.80199 22.0083 2.99999 22H12C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2V2ZM12 20H5.40999L6.33999 19.07C6.52624 18.8826 6.63078 18.6292 6.63078 18.365C6.63078 18.1008 6.52624 17.8474 6.33999 17.66C5.03057 16.352 4.21516 14.6305 4.03268 12.7888C3.8502 10.947 4.31193 9.09901 5.33922 7.55952C6.3665 6.02004 7.89578 4.88436 9.6665 4.34597C11.4372 3.80759 13.3398 3.8998 15.0502 4.60691C16.7606 5.31402 18.1728 6.59227 19.0464 8.22389C19.92 9.85551 20.2009 11.7395 19.8411 13.555C19.4814 15.3705 18.5033 17.005 17.0735 18.1802C15.6438 19.3554 13.8508 19.9985 12 20V20Z" fill="black"/>
            </svg>
        </div>
        
    )
}