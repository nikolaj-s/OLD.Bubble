
import {Token, URL, API_KEY} from '../accessInfo';
import axios from 'axios';



export const SendLikePost = async (bool, id) => {
    return axios({
        url: URL + `/post/${id}`,
        method: "PUT",
        headers: {'auth_token': Token, "API_KEY": API_KEY},
        data: {bool: bool}
    }).then(res => {
        return res.data;
    })
}