import {get, postJson} from '../axios'

export const info = (parameter) => {
    let url='/api/websocket/ws/info';
    return get(url,parameter);
}