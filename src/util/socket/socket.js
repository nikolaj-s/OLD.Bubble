


import {Token, URL} from '../accessInfo';

const io = require('socket.io-client')


export let socket;

export const connectToSocket = (data) => {
    socket = io(URL, {query: {"token": Token, "username": data}, reconnection: true, reconnectionAttempts: 50, reconnectionDelay: 500});
    socket.on('connected', (data) => {
    })
    socket.on('error', () => {
        socket.disconnect();
    })
    socket.on('verified', data => {});
}



