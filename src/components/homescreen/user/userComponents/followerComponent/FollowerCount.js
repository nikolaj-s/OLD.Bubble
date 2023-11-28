import React from 'react'

export const FollowerCount = (props) => {

    const followers = props.followers;

    return (
        <div onClick={props.openFollowers} className="follower-count">
            <h5 className="follower-counter-button-text" ><span style={{fontSize: 20}}>{followers}</span><br />Follower{followers === 1 ? null : 's'}</h5>
        </div>
    )
}
