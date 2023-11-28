import React from 'react'
import { Bubble } from './Bubble'

export const PostPreview = (props) => {
    const randomKey = () => {
        const key = Math.random(Math.floor() * 578);
        return key;
    }
    return (
        <div style={{marginTop: props.style ? '30px' : '5px'}} className="post-preview-container">
            {
               props.posts.map(p => {
                   return (
                        <Bubble key={randomKey()} post={p} />
                   )
               }) 
            }
        </div>
    )
}
