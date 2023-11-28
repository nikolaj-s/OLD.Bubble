import React from 'react'
import { NSFWNightModeFilter } from '../NightMode/nightModeFunction'
import history from '../../history';

export const TrendingBubble = (props) => {
    const p = props.post;
    const open = () => {
        history.push(`/post/${p._id}`)
        props.toggleMenu();
    }
    
    return (
        <div onClick={open} className="trending-post-bubble-preview">
            {
                            
                p.content_preview ? 
                    p.content_preview.endsWith('.mp4') || 
                    p.content_preview.endsWith('.webm') ||
                    p.content_preview.endsWith('.avi') ?
                    <video style={{filter: NSFWNightModeFilter(p.nsfw, props.blurNsfw)}} src={p.content_preview} className="post-bubble-video" /> :
                    p.content_preview.endsWith(".png") ||
                    p.content_preview.endsWith(".jpg")   ||
                    p.content_preview.endsWith(".webp")  || 
                    p.content_preview.endsWith('.gif') ||
                    p.content_preview.endsWith(".jpeg") ?
                    <img style={{filter: NSFWNightModeFilter(p.nsfw, props.blurNsfw)}} className="post-bubble-image" src={p.content_preview} alt="user-post" /> : null
                    :
                <p className="post-bubble-text">{p.text_preview}</p>

            }
        </div> 
    )
}
