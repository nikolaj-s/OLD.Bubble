import Axios from "axios";

export const URL = 'https://obscure-sands-74335.herokuapp.com';

//https://obscure-sands-74335.herokuapp.com
//'http://10.0.0.203:8080'

export let API_KEY = "";

export  const setApiKey = async () => {
    return Axios({
        url: URL + '/fetch-api-key',
        method: "GET"
    }).then(res => {
        if (res.data.error) {
            document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            return;
        }
        
        API_KEY = res.data.api_key;
    })
}

export const Token = document.cookie.split('=')[1];

