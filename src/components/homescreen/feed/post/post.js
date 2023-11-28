import React from 'react';
import './post.css';
import { imageNightMode, NSFWNightModeFilter } from '../../../menu/NightMode/nightModeFunction';
import { LikePost } from './postutil/LikesUtil/likePost';
import { SendLikePost} from '../../../../util/postUtil/likingPost';
import history from '../../../history';
import { LikeNotification } from './postutil/LikesUtil/LikeNotification';
import { LikesList } from './postutil/LikesUtil/LikesList';
import { SubmenuButton } from '../../../GlobalUiButtons/SubMenuButton';
import { PostSubMenu } from './postutil/postSubMenu/PostSubMenu';
import { MultipleContents } from './postutil/MultipleContents';
import { getTimeDif } from '../../../TimeDifference';
import { VideoPlayerComponent } from '../../../VideoPlayComponent/VideoPlayerComponent';

export const FeedPost = (props) => {
    
    const your_post = props.post.yourPost;

    const [liked, setLike] = React.useState(props.post.liked);
    const [likes, setLikes] = React.useState(props.post.likes.length);
    const [likedNotification, setLikedNotification] = React.useState(false);

    const [likeList, toggleLikeList] = React.useState(false);

    const [subMenu, toggleSubMenu] = React.useState(false);

    const NSFW = props.post.nsfw;

    const imageTypes = ['.jpg', '.png', '.jpeg', '.webp', '.gif'];
    const videoTypes = ['.mp4', '.webm', '?raw=1'];
    let video = null;
    let image = null;
    imageTypes.forEach(i => {
        if (!props.post.content_preview) return;
        if (props.post.content_preview.endsWith(i)) {
            image = true;
        }
    })
    videoTypes.forEach(v => {
        if (!props.post.content_preview) return;
        if (props.post.content_preview.endsWith(v)) {
            video = true;
        }
    })
    const open = () => {
        toggleLikeList(false)
        props.open(props.post.id);
    }

    const toggleLikedNotification = (message) => {
        setLikedNotification(message);
        setTimeout(() => {
            document.getElementsByClassName('like-notification')[0].style.opacity = '0';
            setTimeout(() => {
                setLikedNotification(false);
            }, 250)
        }, 300)
    }
    const deletePost = () => {
        props.deletePost(props.post.id);
    }
    const likePost = (e) => {
        e.stopPropagation();
        if (liked) {
            setLike(false);

            let currentLikes = likes;
            currentLikes-=1;

            setLikes(currentLikes);
            toggleLikedNotification('unliked');
            props.unlikePost(props.post.id);
            SendLikePost(false, props.post.id);
        } else {
            setLike(true);

            let currentLikes = likes;
            currentLikes+=1;
            props.likePost(props.post.id);
            setLikes(currentLikes);
            toggleLikedNotification('liked');
            SendLikePost(true, props.post.id);
        }
    }

    const goToUser = (e) => {
        e.stopPropagation();

        history.push(`/user/${props.post.username}`);
    }

    const openLikesMenu = (e) => {
        e.stopPropagation();
        toggleLikeList(true);
    }

    const closeLikesMenu = (e) => {
        e.stopPropagation();
        toggleLikeList(false);
    }

    const toggleSubMenuFunction = () => {
        if (subMenu) {
            toggleSubMenu(false);
        } else {
            toggleSubMenu(true);
        }
    }

    const unFollow = () => {
        props.unFollow(props.post.username);
    } 

    const report = (e) => {
        e.stopPropagation();
        props.report(props.post.id, NSFW);
        toggleSubMenu(false);
    }

    return (
        <div className="post-container-feed" >
            <div onClick={open} className="feed-post" >

                {likeList ? <LikesList close={closeLikesMenu} likes={props.post.likes} /> : null}

                <div onClick={goToUser} className="post-top-section-container">
                    {props.post.user_image ? 
                    <div className="post-users-profile-picture">
                        <img style={{filter: imageNightMode()}} className="post-users-profile-picture" src={props.post.user_image} alt={"users-profile-pic"} /> 
                    </div>
                    : null}

                    <h3>{props.post.username}</h3>
                </div>
                    
                {NSFW ? <div className="nsfw-post-feed-tag"><h4>NSFW</h4></div> : null}
                
                <SubmenuButton className="post-sub-menu-button" open={toggleSubMenuFunction} />
                {subMenu ? <PostSubMenu report={report} id={props.post.id}  delete={deletePost} alert={props.alert} unFollow={unFollow}  yourPost={your_post} close={toggleSubMenuFunction} /> : null}

                {props.post.contentCount > 1 ? <MultipleContents /> : null}

                {likedNotification !== false ? <LikeNotification message={likedNotification} /> : null}
                <div  className="feed-content-container">
                   
                {
                
                props.post.content_preview ? video ? <VideoPlayerComponent nsfw={NSFW} blurNsfw={props.blurNsfw} inFeed={true} video={props.post.content_preview} />
                
                : image ? <img style={{filter: NSFWNightModeFilter(NSFW, props.blurNsfw)}}  src={props.post.content_preview} alt='feed-post' />
                
                : 
                <div className="url-container-feed">
                    <p className="url">{props.post.content_preview}</p>
                </div>
                 :
                null 
                
                }
                </div>
                {props.post.time ? <p className="post-time">{getTimeDif(props.post.time)}</p> : null}

                <div className="post-menu-container">
                    {
                    props.post.text_preview ? 
                    <p style={{filter: imageNightMode(), color: imageNightMode() ? "white" : "black"}} className="post-title">{props.post.text_preview}...</p> 
                    : <p className="post-title" >New Post By {props.post.username} check it out!</p>
                    }

                    <div className="likes-container">
                        {props.post.likes_enabled ? <LikePost like={likePost} liked={liked} /> : null}
                        {props.post.likes_enabled ? <p onClick={openLikesMenu}>{likes}</p> : null}
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}