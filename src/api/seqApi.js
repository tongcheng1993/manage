import {get, postJson} from '../axios'

export const queryPageSeq = (params) => {
    let parameter = params;
    let url = "/api/sys/seq/queryPageSeq";
    return postJson(url, parameter);
};
