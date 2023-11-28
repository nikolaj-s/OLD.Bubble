import React from 'react'


import './LeaveGroup.css';

export const LeaveGroupConfirm = (props) => {
    return (
        <div className="outer-confirm-leave-container">

            <div onClick={props.toggle} className="close-confirm-leave-container"></div>

            <div className="inner-confirm-leave-container">
                <p>Are you sure you want to leave, the only way back is by invite.</p>
                <p className="disclaimer">Posts you have not manualy deleted will remain.</p>
                <div className="confirm-leave-buttons-container">

                    <h3 onClick={props.leave}>Leave</h3>
                    <h3 onClick={props.toggle}>Cancel</h3>
                    
                </div>
            </div>
            
        </div>
    )
}
