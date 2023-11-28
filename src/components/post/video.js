import React from 'react'
import { VideoPlayerComponent } from '../VideoPlayComponent/VideoPlayerComponent'

export const Video = (props) => {
    return (
        <div className="post-video">
            <VideoPlayerComponent video={props.video} />
        </div>
    )
}
