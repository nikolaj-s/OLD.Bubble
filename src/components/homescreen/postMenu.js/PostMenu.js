import React, { Component } from 'react'

import './PostMenu.css';
import { Close } from '../user/edit/editMenuUtil/close';
import { Save } from '../user/edit/editMenuUtil/save';
import { postPost } from '../../../util/postUtil/postCommunication';

import history from '../../history'
import { ImageUploadButton } from './postMenuComponents/ImageUploadButton';
import { Error } from '../../error/error';
import { uploadImage } from '../../../util/postUtil/uploadImage';

import { SubLoading } from '../../loading/subLoading/SubLoading';
import { imageNightMode } from '../../menu/NightMode/nightModeFunction';
import { InfoButtton } from './info/InfoButtton';
import { Info } from './info/Info';
import { Switch } from '../Switches/Switch';

export default class PostMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: "", 
            letterCount: 0, 
            error: false, 
            errorMsg: "", 
            file: "", 
            loading: false,
            likesEnabled: false,
            info: false,
            nsfw: false,
            image: null
        }
        this.update = this.update.bind(this);
        this.close = this.close.bind(this);
        this.post = this.post.bind(this);
        this.closeError = this.closeError.bind(this);
        this.image = this.image.bind(this);
        this.toggleEnableLikes = this.toggleEnableLikes.bind(this);
        this.toggleInfo = this.toggleInfo.bind(this);
        this.toggleNsfw = this.toggleNsfw.bind(this);
    }
    update() {
        const value = document.getElementById('topic');
        const count = value.value.toString().split('').length;
        this.setState({post: value.value, letterCount: count});
    }
    close() {
        this.setState({loading: false})
        this.props.toggle();
    }
    image() {
        const file = document.getElementById('image-file').files;
        if (!file) {
            this.setState({file: null})
            return
        }
        // image file cap is 3MB
        if (file[0].size > 3000000) {
            this.setState({error: true, errorMsg: "Image size exceeds the 3MB limit"})
            return;
        }
        // this will display the image element for preview of image before post
        document.getElementsByClassName('image-prev-container')[0].style.display = 'flex';
        document.getElementById('image-prev').style.display = 'flex';
        document.getElementById('image-prev').style.maxWidth = "70%"

        const reader = new FileReader();

        const image = document.getElementById('image-prev');
        // on load will read image data and display image preview to the image element
        reader.onload = function(e) {
            image.src = e.target.result;
            
        }
        // sets image to state to image file prepare for uploading
        this.setState({image: file[0]});
        reader.readAsDataURL(file[0]);
    }
    closeError() {
        this.setState({error: false, errorMsg: ""})
    }
    async post() {
        let post = this.state.post;
        if (!post) return;
        if (this.state.letterCount > 300) {
             return;
        }
        this.setState({loading: true})

        const urlUpload = this.state.image === null ? null : await uploadImage(this.state.image);
        

        if (urlUpload === 'error uploading image') {
            this.setState({error: true, errorMsg: urlUpload || "Processing Error", loading: false})
            return;
        }
        if (urlUpload) {
            post += ' ' + urlUpload.url;
        }

        const id = urlUpload ? urlUpload.id : null;

        await postPost(post, id, this.state.likesEnabled, this.state.nsfw).then(res => {
            console.log(res)
            this.setState({post: "", letterCount: 0});
            if (res.error) {
                this.setState({error: true, errorMsg: 'error posting at this time', loading: false})
                return
            }
            history.push(`/post/${res}`)
            
            
        }).then(() => {
            this.close();
        })
    }
    toggleEnableLikes() {
        if (this.state.likesEnabled === false) {
            this.setState({likesEnabled: true});
        } else {
            
            this.setState({likesEnabled: false});
        }
    }
    toggleInfo() {
        if (this.state.info) {
            this.setState({info: false})
        } else {
            this.setState({info: true});
        }
    }
    toggleNsfw() {
        if (this.state.nsfw) {
            this.setState({nsfw: false})
        } else {
            this.setState({nsfw: true});
        }
    }
    render() {
        return (
            <div className="post-menu">
                <div className="inner-post-menu">
                    <div className="post-nav">
                        <Close close={this.close} />
                        <h2>New Post</h2>
                        <Save save={this.post} />
                    </div>
                    <form className="post-form">
                        <p className='letter-count'>{this.state.letterCount}/300</p>
                        <textarea placeholder="Discuss a topic, share a link, or make an announcement!" id="topic" maxLength="300" onChange={this.update}></textarea>
                    </form>
                    <div className="image-prev-container">
                        <img style={{filter: imageNightMode()}} id="image-prev" src="" alt={<div></div>} />
                    </div>  
                    <div className="post-options-container">
                        <label className="image-file-upload-button" htmlFor="image-file">
                            <p>Add Image</p>
                            <ImageUploadButton menu={true} />
                            <input onChange={this.image} id="image-file" type="file" accept=".png,.jpg,.jpeg,.webp" />
                        </label>   
                        <div className="enable-likes-container">
                            <p>Enable Likes</p>
                            <Switch action={this.toggleEnableLikes} />
                        </div>
                        <div className="explicit-content-container">
                            <p>NSFW Post</p>
                            <Switch action={this.toggleNsfw} />
                        </div>
                    </div>
                    {this.state.error ? <Error message={this.state.errorMsg} action={this.closeError} /> : null}
                    {-this.state.loading ? <SubLoading /> : null}
                    {this.state.info ? <Info /> : null}
                    <InfoButtton onClick={this.toggleInfo} />
                    <div className='post-menu-spacer'></div>
                </div>
            </div> 
        )
    }
}
