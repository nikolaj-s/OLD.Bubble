import Axios from "axios"
import { API_KEY, Token, URL } from "../accessInfo"



export const SendSupportRequest = async (data) => {
    return Axios({
        url: URL + '/support',
        method: "POST",
        headers: {'auth_token': Token, "API_KEY": API_KEY},
        data: {request: data}
    }).then(res => {
        return res.data;
    })
}