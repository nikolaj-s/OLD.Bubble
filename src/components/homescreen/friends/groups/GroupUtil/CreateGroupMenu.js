

import React from 'react'

import './CreateGroupMenu.css';

import {ImageGroupUploadButton} from './ImageGroupUploadButton';
import { CloseMenu } from './CloseMenu';
import { imageNightMode } from '../../../../menu/NightMode/nightModeFunction';
import { SubLoading } from '../../../../loading/subLoading/SubLoading';
import {Error} from '../../../../error/error'
import {sendGroupData} from '../../../../../util/groupUtil/groupBackEndComs';

export const CreateGroupMenu = (props) => {

    const [GroupImage, setGroupImage] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const updateImage = () => {
        const image = document.getElementById('group-image-upload').files
        if (!image) return;
        if (!image[0].type.startsWith('image')) return setError("Not Supported File Type");
        if (image[0].size > 2500000) return setError("Image Size Is Too Large");
        document.getElementById('image-upload-preview').style.display = 'flex';

        const reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById('image-upload-preview').src = e.target.result;
        }

        reader.readAsDataURL(image[0]);
        setGroupImage(image[0]);
    }

  

    const createGroup = async () => {
        setLoading(true);
        const group_name = document.getElementById('group-name').value;
        if (!group_name) {
            setError('Must Provide A Group Name')
            setLoading(false)
            return
        };

        const image = GroupImage;

        const data = new FormData();

        data.append('group_name', group_name);
        data.append('image', image);

        await sendGroupData(data)
        .then(res => {
            if (res.error) {
                setError(res.error);
                setLoading(false);
                return;
            }
            setLoading(false);
            props.newGroup(res);
            

        })

    }

    const closeError = () => {
        setError(false);
    }

    return (
        <div className="create-group-container">
            {loading ? <SubLoading /> : null}
            {error !== false ? <Error message={error} action={closeError} /> : null}
            <div className="create-group-nav">
                <h2>Create Group</h2>
                <CloseMenu close={props.close} /> 
            </div>
            <div className="inner-create-group-container">
                <p>Set Image</p>
                <div className="set-picture-container">
                    <input onChange={updateImage} accept=".png,.jpg,.jpeg,.webp" type="file" id="group-image-upload" />
                    <img style={{filter: imageNightMode()}} src="" alt="display" id="image-upload-preview" />
                    <label htmlFor="group-image-upload">
                        <ImageGroupUploadButton />
                    </label>
                </div>
                <p>Group Name</p>
                <input maxLength="20" type="text" id='group-name' />
                

                <button onClick={createGroup} className="create-group-button menu-create-group-button">Create Group</button>
            </div>
        </div>
    )
}
