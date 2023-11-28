import Axios from 'axios';

import {Token, URL, API_KEY} from './accessInfo';

export const replyToComment = (comment_id, comment, post_id) => {
    return Axios({
        method: "POST",
        url: URL + '/comments/reply/' + comment_id,
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {comment: comment, post_id: post_id}
    }).then(res => {
        return res.data;
    })
}

export const postComment = (id, data) => {
    try {
        return Axios({
            method: "POST",
            url: URL + '/comments/' + id,
            headers: {"auth_token": Token, "API_KEY": API_KEY},
            data: {comment: data}
        }).then(res => {
            return res.data
        })
    } catch(error) {
        console.log(error)
    }
}

export const getComments = (current, next, id) => {
    try {
        return Axios({
            method: "GET",
            url: URL + '/comments/' + id,
            headers: {"auth_token": Token, "current": current, "next": next, "API_KEY": API_KEY}
        }).then(res => {
            return res.data;
        })
    } catch(error) {
        console.log(error)
    }
}