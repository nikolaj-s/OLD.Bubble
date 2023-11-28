import React from 'react'

import history from '../../../../history'
import { imageNightMode } from '../../../../menu/NightMode/nightModeFunction'

export const Bubble = (props) => {
    const open = () => {
        history.push('/post/' + props.post.id)
    }
    const p = props.post
    
    return (
        <div onClick={open} className="post-bubble-preview">
            {
                            
                p.content_preview ? 
                    p.content_preview.endsWith('.mp4') || 
                    p.content_preview.endsWith('.webm') ||
                    p.content_preview.endsWith('.avi') ?
                    <video style={{filter: imageNightMode()}} src={p.content_preview} className="post-bubble-video" /> :
                    p.content_preview.endsWith(".png") ||
                    p.content_preview.endsWith(".jpg")   ||
                    p.content_preview.endsWith(".webp")  ||
                    p.content_preview.endsWith(".jpeg") ?
                    <img style={{filter: imageNightMode()}} className="post-bubble-image" width="150px" height="150px" loading="lazy" src={p.content_preview} alt="user-post" /> : null
                    :
                <p className="post-bubble-text">{p.text_preview}</p>

            }
        </div>  
    )
}
