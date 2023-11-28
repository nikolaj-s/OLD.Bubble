import React from 'react';
import './edit.css';
import { Close } from './editMenuUtil/close';
import { Save } from './editMenuUtil/save';
import { updateUser, updatePassword } from '../../../../util/account/updateAccount'; 
import { Arrow } from './editMenuUtil/arrow';
import { toggleImageMenu } from './editMenuUtil/menuToggle/toggleImageMenu';
import { toggleBioMenu } from './editMenuUtil/menuToggle/toggleBioMenu';
import { ImageUploadButton } from './editMenuUtil/ImageUploadButton';

import { uploadImage } from '../../../../util/postUtil/uploadImage';
import { Error } from '../../../error/error';
import {togglePasswordMenu} from './editMenuUtil/menuToggle/togglePasswordMenu';
import { PasswordUtil } from './editMenuUtil/passwordUtil/PasswordUtil';
import { SubLoading } from '../../../loading/subLoading/SubLoading';
import { imageNightMode } from '../../../menu/NightMode/nightModeFunction';
import { toggleprivateMenu } from './editMenuUtil/menuToggle/togglePrivateMenu';
import { setAccountPrivate } from '../../../../util/userpreferences/setAccountPrivate';
import { Switch } from '../../Switches/Switch';
import { toggleBlockMenu } from './editMenuUtil/menuToggle/toggleBlockMenu';
import { BlockedList } from './editMenuUtil/BlockedList/BlockedList';
import { UnBlockUser } from '../../../../util/account/BlockUser';

export class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: "", 
            newPicture: false, 
            bio: "", 
            imageMenu: false, 
            bioMenu: false, 
            loading: false,
            error: false,
            errorMsg: "",
            passwordMenu: false,
            correctPassword: false,
            newPassword: false,
            password: "",
            privateMenuOpen: false,
            private: false,
            blockedMenu: false
        }
        this.updatePicture = this.updatePicture.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
        this.toggleBioMenu = this.toggleBioMenu.bind(this);
        this.toggleImageMenu = this.toggleImageMenu.bind(this);
        this.togglePassworMenu = this.togglePassworMenu.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.togglePrivateMenu = this.togglePrivateMenu.bind(this);
        this.togglePrivateSwitch = this.togglePrivateSwitch.bind(this);
        this.toggleBlockMenu = this.toggleBlockMenu.bind(this);
        this.unBlock = this.unBlock.bind(this);
        this.closeError = this.closeError.bind(this);
    }
    
    componentDidMount() {
        this.setState({picture: this.props.picture, bio: this.props.bio, private: this.props.private});
        if (this.props.private) {
            document.querySelector(".edit-private-container .component-switch-container").click();
        }
    }
    updatePassword(data) {
        this.setState({newPassword: true, password: data});
    }
    updatePicture() {
        const file = document.getElementById('edit-image-upload').files;
        if (!file) return;
        if (!file[0].type.startsWith('image')) return this.setState({error: true, errorMsg: "Not Supported File Type"});
        if (file[0].size > 3000000) {
            this.setState({error: true, errorMsg: "File is to large"});
            return;
        }
        this.setState({picture: "preview"})
        const reader = new FileReader();

        reader.onload = function(e) {
            document.getElementsByClassName('image-preview-edit')[0].src = e.target.result;
        }

        reader.readAsDataURL(file[0]);
        this.setState({newPicture: file[0]});
    }
    updateBio() {
        const bio = document.getElementById('bio').value
        this.setState({bio: bio});
    }
    close() {
        this.setState({picture: "", bio: "", loading: false});
        this.props.toggle();
    }
    async save() {
        this.setState({loading: true})
        let image = this.state.picture;
        const bio = this.state.bio;
        
        let url;

        if (this.state.newPicture !== false) {
            url = await uploadImage(this.state.newPicture).then(res => {
                if (res.error) {
                    this.setState({error: true, errorMsg: res.error})
                    return
                }
            })
        } 

        if (this.state.newPassword) {
            await updatePassword(this.state.password).then(res => {
                if (res.error) {
                    this.setState({error: true, errorMsg: 'Error Updating Password'});
                    return;
                }
            })
        }
        if (url) {
            if (!url.error) {
                image = url.url;
            }
        }
        
            await setAccountPrivate(this.state.private).then(res => {
                if (res.error) {
                    this.setState({error: true, errorMsg: 'Error Updating Acount'});
                    return;
                }
            })
        
        const id = url ? url.id : null;
        if (this.state.error) {
            this.setState({loading: false})
            return;
        }
        await updateUser(image, bio, id).then(response => {
            this.props.update(image, bio);
        }).then(() => {
            this.close();
        })
    }
    togglePrivateSwitch() {
        if (this.state.private) {
            this.setState({private: false});
        } else {
            this.setState({private: true});
        }
    }
    toggleBioMenu() {
        if (this.state.bioMenu) {
            toggleBioMenu(false);
            this.setState({bioMenu: false})
        } else {
            toggleBioMenu(true);
            this.setState({bioMenu: true})
        }
    }
    toggleImageMenu(e) {
        if (this.state.imageMenu) {
            toggleImageMenu(false);
            this.setState({imageMenu: false})
        } else {
            toggleImageMenu(true);
            this.setState({imageMenu: true})
        }
    }
    togglePassworMenu() {
        if (this.state.passwordMenu) {
            togglePasswordMenu(false);
            this.setState({passwordMenu: false})
        } else {
            togglePasswordMenu(true);
            this.setState({passwordMenu: true})
        }
    }
    togglePrivateMenu() {
        if (this.state.privateMenuOpen) {
            toggleprivateMenu(false);
            this.setState({privateMenuOpen: false})
        } else {
            toggleprivateMenu(true);
            this.setState({privateMenuOpen: true});
        }
    }
    toggleBlockMenu() {
        if (this.state.blockedMenu) {
            toggleBlockMenu(false);
            this.setState({blockedMenu: false})
        } else {
            toggleBlockMenu(true);
            this.setState({blockedMenu: true});
        }
    }
    unBlock(user) {
        this.setState({loading: true});
        UnBlockUser(user).then(res => {
            if (res.error) {
                this.setState({SubLoading: false, error: true, errorMsg: res.error});
                return;
            }
            this.setState({loading: false});
            this.props.unBlock(user);
        })
    }
    closeError() {
        this.setState({error: false})
    }
    render() {
        
        return (
            <div className="pro-edit-container">
                <div className="edit-buttons">
                        <Close close={this.close} />
                        <h2>EDIT</h2>
                        <Save save={this.save}/>
                </div>
                <div className='inner-edit-container'>
                    <form>
                        <div onClick={this.toggleImageMenu} className="edit-user-button">
                            <h4>Change Picture</h4>
                            <div className="arrow-container picture-edit-arrow">
                                <Arrow />
                            </div>
                        </div>
                        <div className="edit-picture-container">
                            <label htmlFor="edit-image-upload" className="image-edit-sub-container">
                                
                               
                                {this.state.picture ? <img style={{filter: imageNightMode()}} className="image-preview-edit" src={this.state.picture} alt={<div></div>} /> : null}
                                <ImageUploadButton />
                               
                                <input onChange={this.updatePicture} type="file" id="edit-image-upload" accept=".png,.jpg,.jpeg,.webp" />
                            </label>
                        </div>

                        <div onClick={this.toggleBioMenu} className="edit-user-button">
                            <h4>Edit Bio</h4>
                            <div className="arrow-container bio-edit-arrow">
                                <Arrow />
                            </div>
                        </div>
                        <div className="edit-bio-container">
                            <textarea className="edit-textarea" maxLength="150" name="bio" id="bio" type="text" defaultValue={this.state.bio} onChange={this.updateBio} />
                            <label htmlFor="bio">Bio</label>
                        </div>

                        <div onClick={this.togglePassworMenu} className="edit-user-button">
                            <h4>Change Password</h4>
                            <div className="arrow-container password-edit-arrow">
                                <Arrow />
                            </div>
                        </div>
                        <PasswordUtil updatePassword={this.updatePassword} correctPassword={this.state.correctPassword} />
                        <div onClick={this.toggleBlockMenu} className="edit-user-button">
                            <h4>Blocked List</h4>
                            <div className="arrow-container block-edit-arrow">
                                <Arrow />
                            </div>
                        </div>
                       
                        <BlockedList unBlock={this.unBlock} blocked={this.props.blocked} />
                        
                        <div onClick={this.togglePrivateMenu} className="edit-user-button">
                            <h4>Set Private</h4>
                            <div className="arrow-container private-edit-arrow">
                                <Arrow />
                            </div>
                        </div>
                        <div className="edit-private-container">
                            <p>Setting your account to private means only followers can see your posts, you must accept new follow requests, and your posts will never be visible to the public in trending.</p>
                            <Switch action={this.togglePrivateSwitch} />
                        </div>
                    </form>
                    <div className="user-edit-padding-spacer"></div>
                </div>
                {this.state.error ? <Error action={this.closeError} message={this.state.errorMsg} /> : null}
                {this.state.loading ? <SubLoading /> : null}
            </div>
        )
    }
}