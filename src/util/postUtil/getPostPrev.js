import Axios from "axios";

import {Token, URL, API_KEY} from '../accessInfo';


export const getPostPrev = async (id) => {
    return Axios({
        url: URL + '/preview/' + id,
        method: "GET",
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data;
    })
}