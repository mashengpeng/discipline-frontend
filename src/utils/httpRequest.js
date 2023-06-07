import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8888",
    timeout: 100000,
});

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        console.log("axios response: ", response.data);
        return response.data;
    },
    function (error) {
        console.log("axios response: ", error);
        return Promise.reject(error);
    }
);

export default instance;
