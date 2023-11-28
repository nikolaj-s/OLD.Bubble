import Axios from 'axios';

import {Token, URL, API_KEY} from '../accessInfo';


export const feed = (limit) => {
    return Axios({
        url: URL + '/feed',
        method: "GET",
        headers: {"auth_token": Token, "limit": limit, "API_KEY": API_KEY}
    }).then(res => {
        const data = res.data;
        return data;
    })
}

export const userFeed = (user, limit) => {
    return Axios({
        url: URL + '/feed/' + user,
        method: "GET",
        headers: {"auth_token": Token, "limit": limit, "API_KEY": API_KEY}
    }).then(res => {
        const data = res.data;
        return data;
    })
}

export const ReportPost = (_id, report) => {
    return Axios({
        url: URL + '/feed/' +  _id + '/report',
        method: "PUT",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {report: report}
    }).then(res => {
        return res.data;
    })
}

export const PinPost = (_id) => {
    return Axios({
        url: URL + '/post/' + _id + '/pin-post',
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {post_id: _id}
    }).then(res => {
        return res.data;
    })
}