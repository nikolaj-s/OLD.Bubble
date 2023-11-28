import Axios from 'axios';

import {URL, Token, API_KEY} from '../accessInfo';


export const getSuggestions = () => {
    return Axios({
        url: URL + '/suggestions',
        method: "GET",
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data;
    })
}