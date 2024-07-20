// import Vue from 'vue'
// import axios from 'axios'

import store from '../store/index.js'

let axiosOne = axios.create();
let axiosFile = axios.create();

axiosOne.defaults.timeout = 150000;

axiosOne.interceptors.response.use(response => {
    if (response.data.code === 20000) {
        if (response.data.success) {
            return response.data.result;
        } else {
            return Promise.reject(response.data.message)
        }
    } else if (response.data.code === 30000) {
        alert("登陆时间超时，重新登陆");
        store.commit("del_token");
        window.location.reload();
    } else if (response.data.code === 40000) {
        alert("访问接口验证身份权限不足");
        store.commit("del_token");
        window.location.reload();
    } else if (response.data.code === 50000) {
        alert("网络问题 请联系管理员");
        return Promise.reject(response.data.message)
    } else {
        alert("未知问题 请联系管理员");
        return Promise.reject(response.data.message)
    }
}, error => {
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
            headers: {}
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
                'Tc-Token': token
            }
        })
    } else {
        return axiosOne({
            url: url,
            method: 'post',
            params: parameter,
            headers: {}
        })
    }
};


export const postFormFile = (url, parameter) => {
    let token = store.state.token;
    if (token) {
        return axiosOne({
            url: url,
            method: 'post',
            data: parameter,
            headers: {
                'Tc-Token': token
            }
        })
    } else {
        return axiosOne({
            url: url,
            method: 'post',
            data: parameter,
            headers: {}
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
                'Tc-Token': token
            }
        })
    } else {
        return axiosOne({
            url: url,
            method: 'post',
            data: parameter,
            headers: {}
        })
    }
};




export const downFile = (url, parameter) => {
    let token = store.state.token;
    if (token) {
        return axiosOne({
            url: url,
            method: 'post',
            data: parameter,
            headers: {
                'Tc-Token': token
            }
        })
    } else {
        return axiosOne({
            url: url,
            method: 'post',
            data: parameter,
            headers: {}
        })
    }
};