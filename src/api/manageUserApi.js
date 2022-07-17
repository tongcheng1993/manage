import {get, postJson} from '../axios'


export const queryPageUser = (parameter) => {
    let url = '/api/sys/manageUser/queryPageUser';
    return postJson(url, parameter);
}
export const saveUser = (parameter) => {
    let url = '/api/sys/manageUser/saveUser';
    return postJson(url, parameter);
}
export const queryPageRole = (parameter) => {
    let url = '/api/sys/manageUser/queryPageRole';
    return postJson(url, parameter);
}
export const queryListRole = (parameter) => {
    let url = '/api/sys/manageUser/queryListRole';
    return postJson(url, parameter);
}
export const saveMenu = (parameter) => {
    let url = '/api/sys/manageUser/saveMenu';
    return postJson(url, parameter);
}
export const queryPagePermission = (parameter) => {
    let url = '/api/sys/manageUser/queryPagePermission';
    return postJson(url, parameter);
}
export const queryListPermission = (parameter) => {
    let url = '/api/sys/manageUser/queryListPermission';
    return postJson(url, parameter);
}
export const addPermission = (parameter) => {
    let url = '/api/sys/manageUser/addPermission';
    return postJson(url, parameter);
}
export const editPermission = (parameter) => {
    let url = '/api/sys/manageUser/editPermission';
    return postJson(url, parameter);
}
export const removePermission = (parameter) => {
    let url = '/api/sys/manageUser/removePermission';
    return postJson(url, parameter);
}
export const getPermission = (parameter) => {
    let url = '/api/sys/manageUser/getPermission';
    return get(url, parameter);
}
export const queryListMenu = (parameter) => {
    let url = '/api/sys/manageUser/queryListMenu';
    return postJson(url, parameter);
}
export const saveRolePermissionRelation = (parameter) => {
    let url = '/api/sys/manageUser/saveRolePermissionRelation';
    return postJson(url, parameter);
}
export const saveRoleMenuRelation = (parameter) => {
    let url = '/api/sys/manageUser/saveRoleMenuRelation';
    return postJson(url, parameter);
}







