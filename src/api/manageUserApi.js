import {get, postJson} from '../axios'


export const queryPageUser = (parameter) => {
    let url = '/api/sys/manageUser/queryPageUser';
    return postJson(url, parameter);
}

export const queryPageRole = (parameter) => {
    let url = '/api/sys/manageUser/queryPageRole';
    return postJson(url, parameter);
}
export const saveMenu = (parameter) => {
    let url = '/api/sys/manageUser/saveMenu';
    return postJson(url, parameter);
}

export const queryListMenu = (parameter) => {
    let url = '/api/sys/manageUser/queryListMenu';
    return postJson(url, parameter);
}

export const saveRoleMenuRelation = (parameter) => {
    let url = '/api/sys/manageUser/saveRoleMenuRelation';
    return postJson(url, parameter);
}







