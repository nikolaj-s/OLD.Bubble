import React from 'react'

import './GroupInfoButton.css';

export const LackRequiredPermissions = (props) => {

    const [open, openMessage] = React.useState(false)

    const openMessageToggle = () => {
        if (open) {
            openMessage(false)
        } else {
            openMessage(true);
        }
    }
    return (
        <div className="group-info-button-container">
            {open ? <p>{props.message}</p> : null}
            <svg onClick={openMessageToggle} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.7101 1.28874C12.6991 1.48765 14.5545 2.38125 15.9501 3.81249C17.4704 5.35699 18.3693 7.40695 18.4754 9.57162C18.5814 11.7363 17.8872 13.8643 16.5251 15.55C15.2722 17.1072 13.5141 18.1772 11.5554 18.5744C9.59658 18.9716 7.56055 18.6712 5.80005 17.725C4.03577 16.7583 2.65846 15.2133 1.90005 13.35C1.13825 11.4771 1.03685 9.40068 1.61255 7.46249C2.18702 5.53186 3.40999 3.85854 5.07505 2.72499C6.72611 1.59863 8.72128 1.0901 10.7101 1.28874V1.28874ZM11.3 17.35C12.9786 17.0095 14.4859 16.0945 15.5625 14.7625C16.7283 13.3137 17.3214 11.4872 17.2292 9.62987C17.1371 7.77256 16.366 6.01377 15.0626 4.68749C13.8686 3.46876 12.2844 2.70839 10.5867 2.53931C8.889 2.37023 7.18589 2.80318 5.77505 3.76249C4.71309 4.49424 3.85555 5.48499 3.28364 6.6409C2.71174 7.79681 2.44442 9.07959 2.50701 10.3677C2.5696 11.6559 2.96003 12.9067 3.64131 14.0017C4.32259 15.0967 5.27215 15.9997 6.40005 16.625C7.89796 17.4334 9.63222 17.69 11.3 17.35ZM9.2188 7.49999H10.7813V6.24999H9.2188V7.49999ZM10.7813 8.74999V13.75H9.2188V8.74999H10.7813Z" fill="black"/>
            </svg>      
        </div>
    )
}
