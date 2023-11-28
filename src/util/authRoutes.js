import Axios from 'axios';

//const URL = 'https://obscure-sands-74335.herokuapp.com'
import {Token, URL, API_KEY} from './accessInfo';

export const getAccount = async (token) => {
    if (window.location.pathname === '/verify') {
        return;
    }
    const account = await Axios({
        url: URL,
        method: "GET",
        headers: {"auth_token": Token, 'Access-Control-Allow-Origin': 'http://10.0.0.187:3000', "API_KEY": API_KEY}
    }).then((user) => {
        const account = user;
        if (account.data.error === 'verify') {
            window.location.pathname = '/verify'
        }
        return account.data;
    }).catch(error => {
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        if (error) {
            window.location = '/connection-error'
        }
    })
    return account;
    
}

export const searchForFriends = async (param) => {
    let cancel;
    const accounts = await Axios({
        url: URL + '/search/' + param,
        method: "GET",
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        cancelToken: new Axios.CancelToken(c => cancel = c)
    }).then(users => {
        const data = users.data;
        if (data.error) {
            return data.error;
        } else {
            const accounts = data.users.map(account => {
                return {
                    profilepic: account.profilepic,
                    username: account.username
                }
            })
            return accounts;
        }
    }).catch(e => {
        if (Axios.isCancel(e)) return
    })
    cancel()
    return accounts;
}

export const setPicture = async (param) => {
    try {
        const image = await Axios({
            url: URL + '/update',
            method: "POST",
            headers: {"auth_token": Token, "API_KEY": API_KEY},
            data: {"image": param}
        }).then(updatedAccount => {
            const data = updatedAccount.data;
            data._id = 0
            return data;
        })
        return image;
    } catch(error) {
        console.log(error)
    }

}

export const addFriend = async (username) => {
    try {
       const friendRequest = await Axios({
           url: URL + '/friend',
           method: 'POST',
           headers: {"auth_token": Token, "API_KEY": API_KEY},
           data: {"username": username}
       }).then(request => {
           const sent = request.data;
           return sent
       })
       return friendRequest;
    } catch (error) {

    }
}

export const getNotifications = async () => {
    if (window.location.pathname === '/verify') {
        return;
    }
    try {
        const notifications = await Axios({
            url: URL + '/notifications',
            method: 'GET',
            headers: {"auth_token": Token, "API_KEY": API_KEY}
        }).then(results => {
            const object = results.data;
            return object;
        })
        return notifications;
    } catch(error) {
        return ["connection error"];
    }
}
export const clearNotifications = async () => {
    try {
        await Axios({
            url: URL + '/notifications',
            method: 'DELETE',
            headers: {"auth_token": Token, "API_KEY": API_KEY}
        }).then(results => {
            return;
        })
    } catch (error) {

    }
}


export const acceptFriendRequest = async (id, username) => {
    try {
        const accept = await Axios({
            url: URL + '/friend-request',
            method: "POST",
            headers: {"auth_token": Token, "API_KEY": API_KEY},
            data: {id: id, "username": username}
        }).then(updatedAccount => {
            const user = updatedAccount.data;
            return user;
        })
        return accept;
    } catch (error) {
        console.log(error);
    }
}

export const getFriends = async (id, username) => {
    try {
        const friends = await Axios({
            url: URL + '/friend',
            method: "GET",
            headers: {"auth_token": Token, "friendId": id, "username": username, "API_KEY": API_KEY}
        }).then(response => {
            const Friends = response.data;
            return Friends;
        })
        return friends;
    } catch(error) {

    }
}
export const getFriendShips = async () => {
    try {
        return Axios({
            url: URL + '/friend/id',
            method: "GET",
            headers: {"auth_token": Token, "API_KEY": API_KEY}
        }).then(res => {
            return res.data;
        })
    } catch(error) {
        console.log(error)
    } 
}
