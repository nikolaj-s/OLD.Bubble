import Axios from 'axios';

import {Token, URL, API_KEY} from './accessInfo';

export const acceptFollow = (user, option) => {
    return Axios({
        url: URL + '/user/follow-request/accept',
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {user: user, option: option}
    }).then(res => {
        return res.data;
    })
}

export const follow = (username) => {
    return Axios({
        url: URL + '/user/follow/' + username,
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data;
    })
}

export const unFollow = (username) => {
    return Axios({
        url: URL + '/user/unfollow/' + username,
        method: "DELETE",
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data;
    })
}