import { get, postJson, postForm } from '../axios'

export const addManageUser = (parameter) => {
    let url = '/api/manage/manageUser/addManageUser';
    return postJson(url, parameter);
}
export const delManageUser = (parameter) => {
    let url = '/api/manage/manageUser/delManageUser';
    return postForm(url, parameter);
}

export const updateManageUser = (parameter) => {
    let url = '/api/manage/manageUser/updateManageUser';
    return postJson(url, parameter);
}
export const queryListManageUser = (parameter) => {
    let url = '/api/manage/manageUser/queryListManageUser';
    return postJson(url, parameter);
}
export const queryPageManageUser = (parameter) => {
    let url = '/api/manage/manageUser/queryPageManageUser';
    return postJson(url, parameter);
}
export const getManageUserById = (parameter) => {
    let url = '/api/manage/manageUser/getManageUserById';
    return postForm(url, parameter);
}









export const addManageRole = (parameter) => {
    let url = '/api/manage/manageUser/addManageRole';
    return postJson(url, parameter);
}
export const delManageRole = (parameter) => {
    let url = '/api/manage/manageUser/delManageRole';
    return postForm(url, parameter);
}

export const updateManageRole = (parameter) => {
    let url = '/api/manage/manageUser/updateManageRole';
    return postJson(url, parameter);
}
export const queryListManageRole = (parameter) => {
    let url = '/api/manage/manageUser/queryListManageRole';
    return postJson(url, parameter);
}
export const queryPageManageRole = (parameter) => {
    let url = '/api/manage/manageUser/queryPageManageRole';
    return postJson(url, parameter);
}
export const getManageRoleById = (parameter) => {
    let url = '/api/manage/manageUser/getManageRoleById';
    return postForm(url, parameter);
}







export const addManagePermission = (parameter) => {
    let url = '/api/manage/manageUser/addManagePermission';
    return postJson(url, parameter);
}
export const delManagePermission = (parameter) => {
    let url = '/api/manage/manageUser/delManagePermission';
    return postForm(url, parameter);
}
export const updateManagePermission = (parameter) => {
    let url = '/api/manage/manageUser/updateManagePermission';
    return postJson(url, parameter);
}
export const queryListManagePermission = (parameter) => {
    let url = '/api/manage/manageUser/queryListManagePermission';
    return postJson(url, parameter);
}
export const queryPageManagePermission = (parameter) => {
    let url = '/api/manage/manageUser/queryPageManagePermission';
    return postJson(url, parameter);
}
export const getManagePermissionById = (parameter) => {
    let url = '/api/manage/manageUser/getManagePermissionById';
    return postForm(url, parameter);
}










export const addManageMenu = (parameter) => {
    let url = '/api/manage/manageUser/addManageMenu';
    return postJson(url, parameter);
}
export const delManageMenu = (parameter) => {
    let url = '/api/manage/manageUser/delManageMenu';
    return postForm(url, parameter);
}
export const updateManageMenu = (parameter) => {
    let url = '/api/manage/manageUser/updateManageMenu';
    return postJson(url, parameter);
}
export const queryListManageMenu = (parameter) => {
    let url = '/api/manage/manageUser/queryListManageMenu';
    return postJson(url, parameter);
}
export const getManageMenuById = (parameter) => {
    let url = '/api/manage/manageUser/getManageMenuById';
    return postForm(url, parameter);
}






export const bindUserAndRoleDelBefore = (parameter) => {
    let url = '/api/manage/manageUser/bindUserAndRoleDelBefore';
    return postJson(url, parameter);
}
export const bindRoleAndPermissionDelBefore = (parameter) => {
    let url = '/api/manage/manageUser/bindRoleAndPermissionDelBefore';
    return postJson(url, parameter);
}

export const bindRoleAndMenuDelBefore = (parameter) => {
    let url = '/api/manage/manageUser/bindRoleAndMenuDelBefore';
    return postJson(url, parameter);
}






export const resetPassWord = (parameter) => {
    let url = '/api/manage/manageUser/resetPassWord';
    return postJson(url, parameter);
}