import {get, postJson} from '../axios'


export const drawCaptcha = (parameter) =>{
    let url='/api/manage/manageUser/drawCaptcha';
    return postJson(url,parameter);
}

export const login = (parameter) =>{
    let url='/api/manage/manageUser/login';
    return postJson(url,parameter);
}

export const getMenu = (parameter) =>{
    let url='/api/manage/manageUser/getMenu';
    return postJson(url,parameter);
}


