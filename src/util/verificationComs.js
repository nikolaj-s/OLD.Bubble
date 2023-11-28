import Axios from 'axios';

import {Token, URL, API_KEY} from './accessInfo';

export const verify = async (code) => {
    return Axios({
        url: URL + '/verify',
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {code: code}
    }).then(res => {
        return res.data;
    })
}

export const reSend = async () => {
    return Axios({
        url: URL + '/verify/resend',
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data
    })
}