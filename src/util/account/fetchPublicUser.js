import Axios from 'axios';

import {Token, URL, API_KEY} from '../accessInfo';

export const fetchPublicAccount = async (username) => {
    try {
        const user = await Axios({
            url: URL + "/user/" + username,
            method: "GET",
            headers: {"auth_token": Token, "API_KEY": API_KEY}
        })
        .then(response => {
            const data =response.data;
            if (data.error === "Access Denied") {
                window.location.pathname = '/sign-in';
                return;
            }
            return data;
        })
        return user;

    } catch (error) {
        return {error: "connection error"}
    }
}