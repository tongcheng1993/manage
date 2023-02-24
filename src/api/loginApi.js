import {get, postJson} from '../axios'


export const drawCaptcha = (parameter) =>{
    let url='/api/sys/manageUser/apply/drawCaptcha';
    return get(url,parameter);
}



export const login = (parameter) =>{
    let url='/api/sys/manageUser/apply/login';
    return postJson(url,parameter);
}


export const getMenu = (parameter) =>{
    let url='/api/sys/manageUser/apply/getMenu';
    return get(url,parameter);
}


