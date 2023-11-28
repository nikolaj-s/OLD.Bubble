import React from 'react'

import './MiniPrivaledgeCard.css';

export const MiniPrivaledgeCard = (props) => {

    const card = props.permission;
  
    const update = () => {
        props.update(card);
    }

    return (
        <label style={{filter: props.selected ? 'invert()' : null}} htmlFor={card.type} className="mini-privaledge-card-container">
            <label htmlFor={card.type}>{card.type}</label>
            <input onChange={update} type="radio" checked={props.selected} id={card.type} />
        </label>
    )
}
