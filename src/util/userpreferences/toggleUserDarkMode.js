import {Token, URL, API_KEY} from '../accessInfo';

import axios from 'axios';


export const toggleUserDarkMode = async (bool) => {
    return axios({
        url: URL + '/update/toggle-darkmode',
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {'option': bool}
    }).then(res => {
    })
}