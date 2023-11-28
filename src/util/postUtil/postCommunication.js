import Axios from 'axios';
import history from '../../components/history'

import {Token, URL, API_KEY} from '../accessInfo';



export const postPost = async (data, id, likes_enabled, nsfw) => {
    try {
        return Axios({
            url: URL + '/post',
            method: "POST",
            headers: {"auth_token": Token, "cloudinary_id": id, "API_KEY": API_KEY},
            data: {post: data, likes_enabled: likes_enabled, nsfw: nsfw}
        }).then(res => {
            const post = res.data;
            if (post.error) {
                return post.error;
            }
            return post;
        })
    } catch(error) {
        return "error"
    }
        
}

export const getPost = async (id) => {
    try {
        return Axios({
            url: URL + '/post/' + id,
            method: "GET",
            headers: {"auth_token": Token , "API_KEY": API_KEY},
        }).then(res => {
            const data = res.data;
            if (data.error) return history.push('/error')
            return data
        })
    } catch(error) {
        return '404 not found'
    }
}

export const deletePost = async (id) => {
    try {
        return Axios({
            url: URL + '/post/' + id,
            method: 'DELETE',
            headers: {"auth_token": Token, "API_KEY": API_KEY}
        }).then(res => {

            if (res.data.error) return;
            if (window.location.pathname === '/') return false;
            history.goBack(); 
        })
    } catch(error) {
        return 'error removing post'
    }
}