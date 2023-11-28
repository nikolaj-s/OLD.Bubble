import Axios from 'axios';
import {dateStamp} from './dateStamp'

import {Token, URL, API_KEY} from '../accessInfo';

export const getMessages = async (id, name) => {
    return Axios({
        url: URL + '/messages/' + id,
        method: "GET",
        headers: {"auth_token": Token, "name": name, "API_KEY": API_KEY}
    }).then(res => {
        if (res.data.error) {
            window.location.pathname = '/error'
        }
        return res.data;
    })
}

export const postMessage = async (id, data) => {
    return Axios({
        url: URL + '/messages/' + id,
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {message: data, time: dateStamp()}
    }).then(res => {
        return res.data;
    })
}