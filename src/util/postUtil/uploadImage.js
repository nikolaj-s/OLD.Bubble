import Axios from 'axios';

import {Token, URL, API_KEY} from '../accessInfo';

export const uploadImage = async (data) => {

    const formData = new FormData();

    formData.append('image', data);
    
    return Axios({
        url: URL + '/image',
        method: "POST",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: formData
    }).then(res => {
        if (res.data.error === 'no file') {
            return;
        }
        if (res.data.error) {
            return 'error uploading image'
        }
        return res.data.url;
    })
    
}