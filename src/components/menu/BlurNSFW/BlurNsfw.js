import React from 'react'
import { Switch } from '../../homescreen/Switches/Switch'
import './BlurNsfw.css';

export const BlurNsfw = (props) => {

    const [mounted, setMounted] = React.useState(false);

    if (!mounted) {
        setTimeout(() => {
            
            if (props.blurNsfw && !mounted) {
                 document.querySelector('.blur-nsfw-container .component-switch-container').style.justifyContent = 'flex-end';  
            }
            setMounted(true);
          
        })
    }

    const toggle = () => {
        if (mounted === false) return;
        props.toggleNSFWBlur();
    }

    return (
        <div className="blur-nsfw-container">
            <div className="nsfw-info-container">
                <p>Blur NSFW Posts</p>
            </div>
           
            <Switch dark={props.blurNsfw} action={toggle} />
        </div>
    )
}
