import Axios from "axios"
import { API_KEY, URL } from "../accessInfo"



export const sendRecoveryEmail = (email, key) => {
    return Axios({
        method: "POST",
        url: URL + '/recover/send-recovery-email',
        headers: {"API_KEY": API_KEY},
        data: {email: email, captchaKey: key}
    }).then(res => {
        return res.data;
    })
}