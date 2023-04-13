import {get,postForm, postJson} from '../axios'
import  {base64toblob} from "../util/blobUtil"

export const downloadFileTrue = (params) =>{
    let parameter = {
        id: params,
    };
    downloadFile(parameter).then((res) => {
        const base64 = 'data:'+res.mimeType+';base64,'+res.fileByte
        const blob = base64toblob(base64);
        const url = URL.createObjectURL(blob)
        const el = document.createElement('a');
        el.style.display = 'none';
        el.setAttribute('target', '_blank');
        el.setAttribute('download', res.fileName);
        el.href = url;
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    });
}

export const downloadFile = (params) => {
    let parameter = params;
    let url = "/api/sys/file/downloadFile";
    return postForm(url, parameter);
};

export const delFile = (params) => {
    let parameter = params;
    let url = "/api/sys/file/delFile";
    return get(url, parameter);
};

export const queryPageFile = (params) => {
    let parameter = params;
    let url = "/api/sys/file/queryPageFile";
    return postJson(url, parameter);
};


