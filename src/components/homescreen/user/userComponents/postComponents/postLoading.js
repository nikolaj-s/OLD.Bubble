import React from 'react'
import {matchMedia} from '../../../../matchMedia'
export const PostLoading = () => {
    return (
        
        <React.Fragment>

        {
        matchMedia() ? 
        <>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>  
        </>
        : 
        <>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div>
        <div className="post-loading-container">
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
            <div className="post-loading loading-gradient"></div>
        </div> 
        </>
        }
        
        </React.Fragment>
    )
}
