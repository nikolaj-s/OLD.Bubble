import React from 'react'

import './EditGroupImage.css';
import { imageNightMode } from '../../../../menu/NightMode/nightModeFunction';


export const EditGroupImage = (props) => {

    const [image] = React.useState(props.group_image);

    const [saveButton, toggleSaveButton] = React.useState(false);

    const [file, setImageFile] = React.useState({});

    const displayImage = () => {
        const file = document.getElementById('edit-group-image-file-upload').files;
        if (!file || !file[0]) return;
        if (!file[0].type.startsWith('image')) return;
        if (file[0].size > 3000000) {
            return;
        }
        
        const reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById('edit-group-image-back-splash').src = e.target.result;
            document.getElementById('edit-group-image-circle').src = e.target.result;
        }

        reader.readAsDataURL(file[0]);
        setImageFile(file[0]);
        toggleSaveButton(true);
    }

    const Update = (e) => {
        e.stopPropagation();

        props.updateGroupImage(file);
        toggleSaveButton(false);
    }

    return (
        <div className="edit-group-image-outer-container">
            {saveButton ? <h4 onClick={Update} className="group-image-update-button">Update</h4> : null}
            <label htmlFor="edit-group-image-file-upload" className="edit-group-image-container">
                
                <img style={{filter: imageNightMode()}} id="edit-group-image-back-splash" src={image} alt={<div />} />
                <div className="circle-group-image-display">
                    <img style={{filter: imageNightMode()}} id="edit-group-image-circle" src={image} alt={<div />} />
                </div>
                <h3>Update Group Image</h3>
                <div className="white-back-splash"></div>
                <input onChange={displayImage} type="file" id="edit-group-image-file-upload" accept=".png,.jpg,.jpeg,.webp"/>
            </label>
        </div>     
    )
}
