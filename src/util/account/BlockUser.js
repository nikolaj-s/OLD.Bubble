import Axios from "axios"
import { API_KEY, Token, URL } from "../accessInfo"



export const BlockUser = (user) => {
    return Axios({
        method: "POST",
        url: URL + '/block/block-user',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {user: user}
    }).then(res => {
        return res.data;
    })
}

export const UnBlockUser = (user) => {
    return Axios({
        method: "POST",
        url: URL + '/block/un-block-user',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {user: user}
    }).then(res => {
        return res.data;
    })
}