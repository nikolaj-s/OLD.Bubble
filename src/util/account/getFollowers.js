import Axios from 'axios';

import {URL, Token, API_KEY} from '../accessInfo';


export const getFollowers = async (username) => {
    return Axios({
        url: URL + `/followers/${username}`,
        method: "GET",
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data;
    })
}