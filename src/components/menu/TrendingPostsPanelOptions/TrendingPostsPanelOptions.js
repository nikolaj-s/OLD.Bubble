import React from 'react'

import './TrendingPostsPanelOptions.css';
import { CloseButton } from '../../GlobalUiButtons/CloseButton';
import { Switch } from '../../homescreen/Switches/Switch';

export const TrendingPostsPanelOptions = (props) => {

    const [appWide, toggleAppWide] = React.useState(props.trendingOptions);

    const [launch, setLaunched] = React.useState(false);

    const [change, toggleChange] = React.useState(false);

    if (launch === false) {
        setTimeout(() => {
            if (appWide === false) {
                document.querySelector('.inner-trending-posts-panel-container .component-switch-container').click();
            }
            setTimeout(() => {
                setLaunched(true);
            }, 10)
        })
    }

    const toggle = () => {
        if (!launch) return;
        if (appWide) {
            toggleAppWide(false);
        } else {
            toggleAppWide(true);
        }
        if (!change) {
            toggleChange(true);
        }
    }

    const update = (e) => {
        e.preventDefault();
        if (props.trendingOptions === appWide) {
            props.toggleEditTrending();
            return;
        }
        props.updateTrendingPref(appWide);
        setTimeout(() => {
            props.toggleEditTrending();
        }, 20)
        
    }

    return (
        <div className="trending-posts-panel-options-container">
            <CloseButton action={props.toggleEditTrending} className="close-trending-post-panel" />
            <div onClick={props.toggleEditTrending} className="back-splash-close-trending-options"></div>
            <form className="inner-trending-posts-panel-container">
                <p>
                    <span style={{opacity: appWide ? 1 : 0.5}} className="option-1">
                        See Trending posts From All Users
                    </span>
                    /
                    <span style={{opacity: appWide ? 0.5 : 1}} className="option-2">
                        Only See Trending Posts From Who You Follow
                    </span>
                </p>
                <Switch action={toggle} />
                <button 
                onClick={update}
                style={{opacity: change ? 1 : 0.3}}
                className={`update-trending-pref-button ${change ? 'update-trending-pref-button-hover' : null}`}>Update</button>
            </form> 
        </div>
    )
}
