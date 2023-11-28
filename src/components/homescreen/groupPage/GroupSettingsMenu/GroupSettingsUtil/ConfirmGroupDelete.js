import React from 'react'

export const ConfirmGroupDelete = (props) => {
    return (
        <div className="confirm-delete-container">
            <div className="inner-confirm-delete-container">
                <p>Are you sure you want to delete this group? deleting means it is gone for ever.</p>
                <div className="confirm-buttons-container">
                    <button onClick={props.delete}>Yes</button>
                    <button onClick={props.abort}>No</button>
                </div>
            </div>
        </div>
    )
}
