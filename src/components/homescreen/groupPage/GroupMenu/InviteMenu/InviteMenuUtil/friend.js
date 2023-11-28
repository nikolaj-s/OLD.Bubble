import React from 'react'
import { imageNightMode } from '../../../../../menu/NightMode/nightModeFunction'
import { InviteButton } from '../../GroupMenuUtil/InviteButton'

export const Friend = (props) => {

    const [invited, invite] = React.useState(false);

    const inviteFunc = () => {

        if (invited) return;

        invite(true);

        props.invite(props.name);
    }

    return (
        <div className="invite-friend-container">
            <div className="invite-friend-image-container">
                <img style={{filter: imageNightMode()}} src={props.image} alt={<div></div>} />
            </div>
            
            <h4>{props.name}</h4>
            {!invited ? <InviteButton action={inviteFunc} /> : <div style={{width: '35px', height: '35px'}}></div>}
        </div>
    )
}
