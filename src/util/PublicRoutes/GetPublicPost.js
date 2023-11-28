import Axios from 'axios'

import {URL, API_KEY} from '../accessInfo';

export const getPublicPost = async (id) => {
    return Axios({
        url: URL + '/post/public/' + id,
        headers: {"API_KEY": API_KEY},
        method: 'GET'
    }).then(res => {
        return res.data
    })
}