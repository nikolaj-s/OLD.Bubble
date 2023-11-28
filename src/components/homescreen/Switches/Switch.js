import React from 'react'

import './Switch.css';

export const Switch = (props) => {

    const [toggle, setToggle] = React.useState(false)

    if (toggle === false && props.dark) {
        setToggle(true);
    }

    const onClick = (e) => {
  
        if (toggle) {
            setToggle(false);
            
            e.currentTarget.style.justifyContent = 'flex-start';
        } else {
            setToggle(true);
            
            e.currentTarget.style.justifyContent = 'flex-end';
        }

        props.action();
    }

    return (
        <div onClick={onClick} className="component-switch-container">
            <div className="inner-switch"></div>
        </div>
    )
}
