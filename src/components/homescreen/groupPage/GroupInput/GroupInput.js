import React from 'react'

import './GroupInput.css';
import { AddPost } from '../GroupButtons/AddPost';
import { PostButton } from '../GroupButtons/PostButton';
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';


export const GroupInput = (props) => {

    const [image, selectImage] = React.useState(null);

    const [text, setText] = React.useState("");

    const openFileSelection = () => {
        const file = document.getElementById('group-image-post-upload-input');
        file.click();
    }

    const displayImage = () => {
        const file = document.getElementById('group-image-post-upload-input').files;
        if (!file || !file[0]) return;
        if (!file[0].type.startsWith('image')) return;
        if (file[0].size > 3000000) {
            return;
        }
        
        document.getElementsByClassName("image-display-container")[0].style.display = 'flex';

        const reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById('group-image-post-display').src = e.target.result;
        }

        reader.readAsDataURL(file[0]);
        selectImage(file[0]);
    }

    const setTextFunc = (e) => {
        setText(e.target.value);
    }

    const post = () => {
        if (!text && !image) return;
        
        const post = {
            image: image,
            message: text,
            sending: true,
            replies: []
        }

        props.send(post);
        selectImage(null);
        setText("");
        document.getElementById('group-image-post-display').src = "";
        document.getElementsByClassName("image-display-container")[0].style.display = 'none';

    }

    const reply = () => {
        if (!text) return;

        const reply_obj = props.replying;

        props.reply(reply_obj._id, text);
        setText("");
    }


    return (
        <>
        <div className="image-display-container">
            <img style={{filter: imageNightMode()}} src="" alt={<div/>} id="group-image-post-display" />
        </div>
        {props.replying.user ? 
        <div onClick={props.cancel_reply} className="group-replying-to-container">
            <p>@{props.replying.user}</p>
            <p>X</p>
        </div>
        :
        null
        }
        <div className="group-input-container">
            <input id="group-message-input" onChange={setTextFunc} value={text} type="text" placeholder="Msg..."></input>
            {!props.replying._id ? <AddPost action={openFileSelection} /> : null}
            <PostButton action={props.replying._id ? reply : post}  />
        </div>
        <input style={{filter: imageNightMode(), color: imageNightMode() !== null ? 'white' : 'black', borderColor: imageNightMode() !== null ? 'white' : 'black'}} onChange={displayImage} accept=".png,.jpg,.jpeg,.webp" type="file" id="group-image-post-upload-input" />
        </>
    )
}
