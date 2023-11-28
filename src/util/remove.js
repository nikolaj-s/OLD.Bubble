import Axios from 'axios';

import {Token, URL, API_KEY} from './accessInfo';


export const removeFriend = async (username) => {
    return Axios({
        method: "DELETE",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        url: URL + '/remove/' + username
    }).then(response => {
        console.log(response.data)
    })
}