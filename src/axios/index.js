// import Vue from 'vue'
// import axios from 'axios'

import store from '../store/index.js'

let axiosOne = axios.create();
let axiosFile = axios.create();

axiosOne.defaults.timeout = 600000;

axiosOne.interceptors.response.use(response => {
    if (response.data.code === 20000) {
        if (response.data.success) {
            return response.data.result;
        } else {
            alert(response.data.message);
            return Promise.reject(response.data.message)
        }
    } else if (response.data.code === 30000) {
        alert("丢失身份信息，请重新登陆");
        store.commit("del_token");
        window.location.reload();
        return Promise.reject(response.data.message)
    } else if (response.data.code === 40000) {
        alert("访问接口验证身份权限不足，请申请权限");
        // store.commit("del_token");
        // window.location.reload();
        return Promise.reject(response.data.message)
    } else if (response.data.code === 50000) {
        alert("网络问题 请联系管理员");
        // store.commit("del_token");
        // window.location.reload();
        return Promise.reject(response.data.message)
    } else {
        alert("未知问题 请联系管理员");
        // store.commit("del_token");
        // window.location.reload();
        return Promise.reject(response.data.message)
    }
}, error => {
    alert("未知问题 " + error);
    // store.commit("del_token");
    // window.location.reload();
    return Promise.reject(error)
});



export const get = (url, parameter) => {
    let token = store.state.token;
    if (token) {
        return axiosOne({
            url: url,
            method: 'get',
            params: parameter,
            headers: {
                'Tc-Token': token
            }
        })
    } else {
        return axiosOne({
            url: url,
            method: 'get',
            params: parameter,
            headers: {

            }
        })
    }
};

export const postForm = (url, parameter) => {
    let token = store.state.token;
    if (token) {
        return axiosOne({
            url: url,
            method: 'post',
            params: parameter,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Tc-Token': token
            }
        })
    } else {
        return axiosOne({
            url: url,
            method: 'post',
            params: parameter,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
};


export const postFormFile = (url, parameter) => {
    let params = new FormData()
    for (let one in parameter) {
        params.append(one, parameter[one])
    }
    let token = store.state.token;
    if (token) {
        return axiosOne({
            url: url,
            method: 'post',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Tc-Token': token
            }
        })
    } else {
        return axiosOne({
            url: url,
            method: 'post',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

}

export const postJson = (url, parameter) => {
    let token = store.state.token;
    if (token) {
        return axiosOne({
            url: url,
            method: 'post',
            data: parameter,
            headers: {
                'Content-Type': 'application/json',
                'Tc-Token': token
            }
        })
    } else {
        return axiosOne({
            url: url,
            method: 'post',
            data: parameter,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
};




export const downFile = (url, parameter) => {
    let token = store.state.token;
    if (token) {
        return axiosFile({
            url: url,
            method: 'post',
            data: parameter,
            headers: {
                'Tc-Token': token
            }
        })
    } else {
        return axiosFile({
            url: url,
            method: 'post',
            data: parameter,
            headers: {}
        })
    }
};