import React from 'react'

import './BioExpanded.css';

export const BioExpanded = (props) => {
    console.log(props.bio)
    return (
        <div onClick={props.toggle} className="outer-expanded-container">
            <div className="inner-expanded-container">
                <p>{props.bio}</p>
            </div>
        </div>
    )
}
