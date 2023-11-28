import Axios from 'axios';

import {Token, URL, API_KEY} from './accessInfo';

export const ignoreRequest = async (id) => {
    await Axios({
        url: URL + '/friend/' + id,
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        method: "DELETE"
    }).then(response => {
        console.log(response);
    })
}