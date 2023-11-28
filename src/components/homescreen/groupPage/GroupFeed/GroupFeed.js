import React from 'react'
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';

import './GroupFeed.css';
import { GroupPost } from './GroupPost/GroupPost';
import { LoadingMorePosts } from './GroupPostLoading/LoadingMorePosts';


export const GroupFeed = (props) => {

    const posts = props.posts;

    const [largeview, toggleLargeView] = React.useState(false)

    const expand = (img) => {
        toggleLargeView(img);
    }

    const closeLargeView = () => {
        toggleLargeView(false);
    }

    return (
        <div onScroll={props.onScroll} ref={props.scrollRef} className="group-feed-container">
            {props.max ? <p className="group-feed-max-posts-reached">No More Posts</p> : null }
            {props.loadingMorePosts ? <LoadingMorePosts /> : null}
            {posts.map(post => {
                return <GroupPost  expand={expand} set_reply={props.set_reply} deletePost={props.deletePost} owner={props.owner} key={post._id} post={post} />
            })}
            {largeview ? 
            <div style={{backgroundColor: imageNightMode() !== null ? 'white' : 'black'}} onClick={closeLargeView} className="expanded-view">
                <img style={{filter: imageNightMode()}} src={largeview} alt="expanded" />
            </div> : null}
            <div className="group-feed-spacer"></div>
        </div>
    )
}
