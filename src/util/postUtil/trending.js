import Axios from 'axios';

import {URL, Token, API_KEY} from '../accessInfo';


export const getTrendingPosts = () => {
    return Axios({
        url: URL + '/post/trending',
        method: "GET",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
    }).then(res => {
        return res.data;
    })
}