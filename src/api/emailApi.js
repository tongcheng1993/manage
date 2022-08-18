import {get, postJson} from '../axios'


export const getEmailTemplateById = (params) => {
    let parameter = params;
    let url = "/api/sys/email/getEmailTemplateById";
    return get(url, parameter);
}

export const sendEmail = (params) => {
    let parameter = params;
    let url = "/api/sys/email/sendEmail";
    return postJson(url, parameter);
}
export const saveEmailTemplate = (params) => {
    let parameter = params;
    let url = "/api/sys/email/saveEmailTemplate";
    return postJson(url, parameter);
}


export const queryPageEmailRecord = (params) => {
    let parameter = params;
    let url = "/api/sys/email/queryPageEmailRecord";
    return postJson(url, parameter);
}


export const queryPageEmailTemplate = (params) => {
    let parameter = params;
    let url = "/api/sys/email/queryPageEmailTemplate";
    return postJson(url, parameter);
}














