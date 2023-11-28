import Axios from 'axios';

import {URL, API_KEY} from '../accessInfo';


export const signIn = async (data) => {
    try {
        const user = await Axios({
            method: "POST",
            url: URL + '/sign-in',
            data: data,
            headers: {"API_KEY": API_KEY}
        }).then(res => {
            console.log(res);
            return res
        })
        if (user.data.error) {
            const error = {
                error: user.data.error
            }
            return error;
        }
        if (user.data === "Logged In") {
            
            return user.headers
        }
    } catch(error) {
        console.log(error)
        
        return {user: {
            error: "Connection Time Out"
        }}
    }
}

export const setCookie = (authToken) => {
    const token = authToken;
    const exp = new Date();
    exp.setDate(exp.getDate() + 3);
    document.cookie = `auth_token=${token}; max-age=${604800}`;
}


