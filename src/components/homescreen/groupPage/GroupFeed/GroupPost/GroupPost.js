import React from 'react'

import "./GroupPost.css";
import { GroupPostSubMenuButton } from './GroupPostUtil/SubMenu/SubMenuButton/GroupPostSubMenuButton';
import { SendingIndicator } from './GroupPostUtil/SendingIndicator/SendingIndicator';
import { imageNightMode } from '../../../../menu/NightMode/nightModeFunction';
import history from '../../../../history';
import { GroupPostSubMenu } from './GroupPostUtil/SubMenu/GroupPostSubMenu';
import { getTimeDif } from '../../../../TimeDifference';
import {Replies} from './GroupPostUtil/Replies/Replies'
import { VideoPlayerComponent } from '../../../../VideoPlayComponent/VideoPlayerComponent';


export const GroupPost = (props) => {

    const [menuOpen, ToggleMenuOpen] = React.useState(false);

    const [visibleReplies, increaseVisibleReplies] = React.useState(2);

    const post = props.post;

    const image = post.image;

    const text = post.message;

    const video_link = post.video_link;

    const image_link = post.image_link;

    const website = post.website;

    const user = post.user;

    const date = post.time;

    const TimeDifference = getTimeDif(date);

    const toggleMenu = () => {
        if (menuOpen) {
            ToggleMenuOpen(false);
        } else {
            ToggleMenuOpen(true);
        }
    }

    const can_edit = post.your_post ? true : props.owner ? true : false;

    const user_image = post.user_image;

    const replies = post.replies.slice(0, visibleReplies);

    const deletePost = () => {
        if (!can_edit) return;

        if (post.secondary_id) {
            props.deletePost(post.secondary_id);
            return;
        }

        props.deletePost(post._id);
    }

    const goToUser = () => {
        history.push(`/user/${user}`);
    }

    const reply = () => {

        const _id = post.secondary_id ? post.secondary_id : post._id;

        props.set_reply(user, _id);
    }

    const showMoreReplies = () => {
        let current = visibleReplies;

        current+=5;

        increaseVisibleReplies(current);
    }
    
    const expand = () => {
        if (props.post.secondary_image !== undefined) {
            props.expand(props.post.secondary_image);
            return;
        }
        props.expand(image || image_link);
    }

    return (
        <>
        <div className="group-post-container">
            {menuOpen && can_edit ? <GroupPostSubMenu deletePost={deletePost} toggle={toggleMenu} /> : null}
            <div className="top-group-post-container">

                {props.post.sending ? <div className="sending-group-post loading-gradient"></div> : 
                <div onClick={goToUser} className="user-group-post-container">
                    <div className="user-group-post-image-container">
                        <img style={{filter: imageNightMode()}} src={user_image} alt={<div />} />
                    </div>
                    <h3>{user}</h3>
                </div>}
                {can_edit ? <GroupPostSubMenuButton action={toggleMenu} /> : null}
            </div>
            <div className="middle-group-post-container">
                {image ? <div className="middle-group-post-image-container">
                    <img onClick={expand} style={{filter: imageNightMode()}} id={post.sending_id} src={image} alt={<div />} />
                </div> : null}
                {video_link ? 
                <div className="middle-group-post-image-container">
                    <VideoPlayerComponent video={video_link} />
                </div>
                : image_link ? 
                <div className="middle-group-post-image-container">
                    <img onClick={expand} style={{filter: imageNightMode()}} id={post.sending_id} src={image_link} alt={<div />} />
                </div> : website ? 
                <div className="middle-group-post-image-container">
                    <a href={website} rel="noopener noreferrer image_src" target="_blank">{website}</a>
                </div>
                :
                 null
                }
                <div className="middle-group-text-container">
                    <p>{text}</p>
                    <p className="group-post-date">{TimeDifference}</p>
                </div>
            </div>
            <div className="bottom-group-post-container">
                {props.post.sending ? <div style={{width: 140, height: 50}}></div> : <h3 onClick={reply}>Reply</h3>}
                {props.post.replies.length > 0 ? <p style={{opacity: 0.4, cursor: "default"}}>{props.post.replies.length} replies</p> : null}
                <SendingIndicator sending={props.post.sending} />
            </div>
        </div>
        {replies.length === 0 ? null : <Replies allReplies={props.post.replies} showMoreReplies={showMoreReplies} visibleReplies={visibleReplies} replies={replies} />}
        </>
    )
}
