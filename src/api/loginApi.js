import {get, postJson} from '../axios'


export const drawCaptcha = (parameter) =>{
    let url='/api/sys/manageUser/drawCaptcha';
    return postJson(url,parameter);
}

export const login = (parameter) =>{
    let url='/api/sys/manageUser/login';
    return postJson(url,parameter);
}

export const getMenu = (parameter) =>{
    let url='/api/sys/manageUser/getMenu';
    return postJson(url,parameter);
}


