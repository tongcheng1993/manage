// import Vue from 'vue'
// import axios from 'axios'

import store from '../store/index.js'

let axiosOne = axios.create();
axiosOne.defaults.timeout = 150000;

axiosOne.interceptors.request.use(config => {
        return config;
    }, error => {
        console.log(error)
        return Promise.reject(error)
    }
);
axiosOne.interceptors.response.use(response => {
    if (response.data.code === 20000) {
        if (response.data.success) {
            return response.data.result;
        } else {
            alert(response.data.message);
            return Promise.reject(response.data.message)
        }
    } else if (response.data.code === 30000) {
        alert("登陆时间超时，重新登陆");
        store.commit("del_token");
        window.location.reload();
    } else if (response.data.code === 40000) {
        console.log(response.data.message)
        alert("访问接口验证身份权限不足");
        return Promise.reject(response.data.message)
    } else if (response.data.code === 50000) {
        console.log(response.data.message)
        alert("网络问题");
        return Promise.reject(response.data.message)
    } else {
        return response.data.result;
    }
}, error => {
    console.log(error);
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


export const postParam = (url, parameter) => {
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