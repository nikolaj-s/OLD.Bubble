import Axios from 'axios';
import {Token, URL, API_KEY} from '../accessInfo';


export const clearByUser = async (user) => {
    return Axios({
        url: URL + '/notifications/' + user,
        method: "DELETE",
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data;
    })
}

export const ignoreGroupInvite = async (name) => {
    return Axios({
        url: URL + '/notifications/' + name + '/group-invite',
        method: "DELETE",
        headers: {"auth_token": Token, "API_KEY": API_KEY}

    }).then(res => {
        return res.data;
    })
}