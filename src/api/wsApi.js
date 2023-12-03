import {get, postJson} from '../axios'

export const info = (parameter) => {
    let url='/api/websocket/websocket/info';
    return get(url,parameter);
}

export const sendWsAllMessage = (parameter) => {
    let url='/api/websocket/websocket/sendWsAllMessage';
    return postJson(url,parameter);
}