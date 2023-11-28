import React from 'react'

import './IntroComponent.css';
import { imageNightMode } from '../../menu/NightMode/nightModeFunction';
import { ImageUploadButton } from '../user/edit/editMenuUtil/ImageUploadButton';
import { SubLoading } from '../../loading/subLoading/SubLoading';
import { uploadImage } from '../../../util/postUtil/uploadImage';
import { Error } from '../../error/error';
import { updateUser } from '../../../util/account/updateAccount';

export const IntroComponent = (props) => {
    const [image, setImage] = React.useState(null);

    const [newPicture, setNewPicture] = React.useState({});

    const [loading, setLoading] = React.useState(false);

    const [error, setError] = React.useState(false);

    const updatePicture = () => {
        const file = document.getElementById('intro-edit-image-upload').files;
        if (!file) return;
        if (!file[0].type.startsWith('image')) return;
        if (file[0].size > 3000000) {
            setError("Image is too large")
            return;
        }
        setImage(true);

        const reader = new FileReader();

        reader.onload = function(e) {
            document.getElementsByClassName('intro-image-preview-edit')[0].src = e.target.result;
        }

        reader.readAsDataURL(file[0]);
        setNewPicture(file[0]);
    }

    const update = async () => {

        setLoading(true);

        let image = {};

        let url;

        if (newPicture) {
            url = await uploadImage(newPicture);
        }

        

        if (url) {
            if (url.error) {
                setError(url.error);
                setLoading(false);
                return;
            }
            if (!url.error) {
                image = url.url;
            }
        }

        const id = url ? url.id : null;

        const bio = document.getElementById('intro-new-bio-setup').value;

        updateUser(image, bio, id).then(res => {
            if (res.error) {
                setError(res.error);
                setLoading(false);
                return;
            }

            props.finishSetUp(bio, image);

        })

    }

    const closeError = () => {
        setError(false);
    }

    return (
        <div className="intro-component-container">
            <div className="inner-intro-component-container">
                <h2>Welcome To Bubble</h2>
                <p>Lets set up your account, starting with a profile picture.</p>
                <label htmlFor="intro-edit-image-upload" className="intro-image-upload-container">
                    <ImageUploadButton />
                    {image ? <img style={{filter: imageNightMode()}} className="intro-image-preview-edit" src="" alt={<div></div>} /> : null}
                </label>
                <p>Maximum 2MB image size</p>
                <input onChange={updatePicture} type="file" id="intro-edit-image-upload" accept=".png,.jpg,.jpeg,.webp" />
                <p>Now for a bio</p>
                <textarea id="intro-new-bio-setup" className="intro-set-bio" maxLength="200">

                </textarea>
                
                <div className="intro-buttons-container">
                    <button onClick={update}>Continue</button>
                </div>
               {error ? <Error action={closeError} message={error} /> : null}
            </div>
            {loading ? <SubLoading /> : null}
        </div>
    )
}
