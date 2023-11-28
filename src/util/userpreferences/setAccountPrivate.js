

import {Token, URL, API_KEY} from '../accessInfo';
import Axios from 'axios';


export const setAccountPrivate = async (bool) => {
    return Axios({
        url: URL + '/update/toggle-private',
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {option: bool}
    }).then(res => {
        return res.data;
    }).catch(error => {
        console.log(error);
    })
}