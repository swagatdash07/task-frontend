import { URL, endpoints } from "./enviroment.json"
import "./callApi"
import { axiosget, axiosput, axiosdelete, axiospostjson, axiospost } from "./callApi"


export const signup = (signupDetail, callback) => {
    const url = URL.baseUrl + endpoints.signup;
    axiospostjson(url, signupDetail, "", callback);
}
export const login = (params, callback) => {
    const url = URL.baseUrl + endpoints.login;
    axiospostjson(url, params, "", callback);
}
export const taskCreate = (params, token, callback) => {
    const url = URL.baseUrl + endpoints.create;
    console.log(url, params, "urrrlrlrlrlrlrlrlrlrlrlrlrlrlrlrlrll")
    axiospostjson(url, params, token, callback);
}
export const getAllTasks = (token, callback) => {
    const url = URL.baseUrl + endpoints.tasks;
    console.log(url, "urrrlrlrlrlrlrlrlrlrlrlrlrlrlrlrlrll")
    axiosget(url, token, callback);
}
export const taskUpdate = (params, token, id, callback) => {
    const url = URL.baseUrl + endpoints.update + "/" + id;
    console.log(url, params, "urrrlrlrlrlrlrlrlrlrlrlrlrlrlrlrlrll")
    axiosput(url, params, token, callback);
}
export const taskDelete = (token, id, callback) => {
    const url = URL.baseUrl + endpoints.delete + "/" + id;
    console.log(url, "urrrlrlrlrlrlrlrlrlrlrlrlrlrlrlrlrll")
    axiosdelete(url, token, callback);
}
