import React from 'react'
import { TrendingBubble } from './TrendingBubble'


export const PostContainer = (props) => {
    return (
        <div style={{paddingTop: props.padding ? 30 : 0}} className="trending-posts-container">
            
            {
                props.posts.map(p => {
                    return (
                        <TrendingBubble blurNsfw={props.blurNsfw} toggleMenu={props.toggleMenu} key={p._id} post={p} />
                    )
                })
            }
        </div>
    )
}
