import React from 'react'
import { updatePassword } from '../../util/account/updateAccount';
import { CopyRight } from '../copyRight/CopyRight';
import { Error } from '../error/error';
import { SubLoading } from '../loading/subLoading/SubLoading';

import './RecoveryPasswordUpdate.css';

export class RecoveryPasswordUpdate extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            newPassword: "",
            confirmPassword: "",
            valid: false,
            error: false,
            loading: false,
            updated: false
        }

        this.setPassword = this.setPassword.bind(this);
        this.setNewPassword = this.setNewPassword.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.closeError = this.closeError.bind(this);
    }

    componentDidMount() {
        this.setState({id: this.props.id.match.params.id});
    }

    setPassword(e) {
        this.setState({newPassword: e.currentTarget.value});
    }

    setNewPassword(e) {
        this.setState({confirmPassword: e.currentTarget.value});

        if (this.state.newPassword === e.currentTarget.value) {
            this.setState({valid: true});
        }
    }

    updatePassword() {
        if (!this.state.valid) return;
        if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({error: "error passwords do not match"});
            return;
        }  

        this.setState({loading: true})

        updatePassword(this.state.newPassword, this.state.confirmPassword, this.state.id).then(res => {
            if (res.error) {
                this.setState({loading: false, error: res.error});
                return;
            }
            this.setState({loading: false, error: "Updated"});
            setTimeout(() => {
                window.location.pathname = '/log-in';
            }, 1000)
        })

    }

    closeError() {
        this.setState({error: false});
    }


    render() {
        return (
            <div className="password-update-outer-container">
            <div className="inner-password-update-container">
                <h2>Reset Password</h2>
                <input onChange={this.setPassword} type="password" id='new-password-value' placeholder="New password" />
                <input onChange={this.setNewPassword} type="password" id="confirm-new-password" placeholder="Confirm Password" />
                <p>New password must be more than 10 characters long, include a special character, number, upper and lower case letter.</p>
                <button onClick={this.updatePassword} className={this.state.valid ? 'button-valid' : 'button-not-valid'}>Update</button>
                <CopyRight />
                {this.state.error ? <Error message={this.state.error} action={this.closeError} /> : null}
                {this.state.loading ? <SubLoading /> : null}
            </div>
        </div>
        )
    }
}
