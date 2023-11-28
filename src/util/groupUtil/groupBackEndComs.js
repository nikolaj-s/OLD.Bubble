
import Axios from 'axios';

import {URL, Token, API_KEY} from '../accessInfo';


export const sendGroupData = async (data) => {
    return Axios({
        method: "POST",
        url: URL + '/groups',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: data
    }).then(res => {
        return res.data;
    })
}

export const fetchGroups = async () => {
    return Axios({
        method: "GET",
        url: URL + '/groups',
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data;
    })
}

export const getGroupData = async (_id) => {
    return Axios({
        method: 'GET',
        url: URL + '/groups/' + _id,
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data;
    })
}

export const deleteGroup = async (_id) => {
    return Axios({
        method: "DELETE",
        url: URL + '/groups/' + _id,
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data;
    })
}
// leave group

export const leaveGroup = async (_id) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/leave-group',
        headers: {"auth_token": Token, "API_KEY": API_KEY}
    }).then(res => {
        return res.data;
    })
}

// update group

export const updateGroupLimit = async (_id, limit) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/group-limit',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {limit: limit}
    }).then(res => {
        return res.data;
    })
}

// update group name

export const updateGroupName = async (_id, name) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/update-group-name',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {name: name}
    }).then(res => {
        return res.data;
    })
}

// update group image

export const updateGroupImage = async (_id, image) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/update-group-image',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: image
    }).then(res => {
        return res.data;
    })
}

// group invite routes

export const inviteUser = async (username, _id) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/invite',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {username: username}
    }).then(res => {
        return res.data;
    })
}

export const acceptGroupInvite = async (_id) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/accept-invite',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {inviteToken: _id}
    }).then(res => {
        return res.data;
    })
}


// group permission management

export const updatePermission = async (obj, _id) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/update-permission',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {permission: obj}
    }).then(res => {
        return res.data;
    })
}

export const addPermission = async (obj, _id) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/new-permission',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {permission: obj}
    }).then(res => {
        return res.data;
    })
}

export const deletePermission = async (obj, _id) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/delete-permission',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {permission: obj}
    }).then(res => {
        return res.data;
    })
}

export const assignNewPermissions = async (user, perm, _id) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/assign-new-permission',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {user: user, permission: perm}
    }).then(res => {
        return res.data;
    })
}

// ban user

export const banUser = async (_id, user, ban_reason) => {
    return Axios({
        method: "PUT",
        url: URL +'/groups/' + _id + '/ban-user',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {userToBan: user, banMessage: ban_reason}
    }).then(res => {
        return res.data;
    })
}

// un ban user

export const unBanUser = async (_id, user) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/un-ban-user',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {user: user}
    }).then(res => {
        return res.data;
    })
}

// posting routes 
export const sendPost = async (_id, data) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/new-post',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: data
    }).then(res => {
        return res.data;
    })
} 

export const fetchMorePosts = async (_id, limit) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/more-posts',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {limit: limit}
    }).then(res => {
        return res.data;
    })
}

export const deleteGroupPost = async (_id, post_id) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/delete-post',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {post_id: post_id}
    }).then(res => {
        return res.data;
    })
}

export const replyToGroupPost = async (_id, reply, post_id) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/reply-to-post',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
        data: {post_id: post_id, reply: reply}
    }).then(res => {
        return res.data;
    })
}

// toggle group notifications 
export const toggleGroupNotifications = async (_id) => {
    return Axios({
        method: "PUT",
        url: URL + '/groups/' + _id + '/toggle-group-notifications',
        headers: {"auth_token": Token, "API_KEY": API_KEY},
    }).then(res => {
        return res.data;
    })
}