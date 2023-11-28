import React from 'react'
import { imageNightMode } from '../menu/NightMode/nightModeFunction'

export const Image = (props) => {
    return (
        <div onClick={props.expand} className="image-container">
            <img style={{filter: imageNightMode()}} src={props.image} alt="post" />
        </div>
    )
}
