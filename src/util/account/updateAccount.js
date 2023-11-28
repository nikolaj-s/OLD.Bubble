import Axios from 'axios';

import {Token, URL, API_KEY} from '../accessInfo';


export const updateUser = async (image, bio, cloudinary_id) => {
    const update = await Axios({
        url: URL + '/update/account',
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {"image": image, "bio": bio, cloudinary_id: cloudinary_id}
    }).then(response => {
        const data = response.data;
        return data;
    })
    return update;
}

export const authorizePassword = async (data) => {
    return Axios({
        url: URL + '/update/verify-password',
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {"password": data}
    }).then(res => {
        return res.data;
    })
}

export const updatePassword = async (data, confirmPassword, recover) => {
    return Axios({
        url: URL + '/update/update-password',
        method: "POST",
        headers: {"auth_token": recover ? recover : Token, "API_KEY": API_KEY},
        data: {"password": data, confirmPassword: confirmPassword}
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}

export const updateRecents = async (data) => {
    return Axios({
        url: URL + '/update/update-recents',
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {recents: data}
    }).then(res => {
        return res.data;
    })
}

export const updateTrendingPref = async (bool) => {
    return Axios({
        url: URL + '/update/update-trending-pref',
        method: "PUT",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {trendingOption: bool}
    }).then(res => {
        return res.data;
    })
}

export const updateBlurNsfwPref = async (bool) => {
    return Axios({
        url: URL + '/update/toggle-nsfw-blur',
        method: "PUT",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {option: bool}
    }).then(res => {
        return res.data;
    })
}

export const removePinnedPost = async () => {
    return Axios({
        url: URL + '/update/remove-pinned-post',
        method: "PUT",
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data;
    })
}

export const toggleInstallPopup = async (bool=true) => {
    return Axios({
        url: URL + '/preference/disable-install-pop-up',
        method: "PUT",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {choice: bool}
    }).then(res => {
        return res.data;
    })
}