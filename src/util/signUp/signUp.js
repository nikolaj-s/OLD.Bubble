import Axios from 'axios';
import { URL, API_KEY } from '../accessInfo';


export const signUp = async (data) => {
    try {
        return Axios({
            method: "POST",
            url: URL + '/sign-up',
            data: data,
            headers: {"API_KEY": API_KEY}
        }).then(res => {
            return res.data;
        })
    } catch(error) {
        return {error: "error creating account"}
    }
}

export const verifyUsername = async (data) => {
    return Axios({
        method: "POST",
        url: URL + '/sign-up/username',
        headers: {"API_KEY": API_KEY},
        data: {username: data}
    }).then(res => {
        return res.data
    }).catch(error => {
        return false;
    })
}

export const verifyPassword = async (data) => {
    return Axios({
        method: "POST",
        url: URL + '/sign-up/password',
        headers: {"API_KEY": API_KEY},
        data: {password: data}
    }).then(res => {
        return res.data
    }).catch(error => {
        return false;
    })
}

export const verifyEmail = async (data) => {
    return Axios({
        method: "POST",
        url: URL + '/sign-up/email',
        headers: {"API_KEY": API_KEY},
        data: {email: data}
    }).then(res => {
        return res.data
    }).catch(error => {
        return false;
    })
}