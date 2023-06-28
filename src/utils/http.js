import axios from "axios";

// 创建axios实例
const instance = axios.create({
    baseURL: "http://localhost:8888",
    timeout: 100000,
});

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        // 在发送请求之前打印请求参数
        console.log(`${config.method.toUpperCase()} ${config.baseURL}${config.url} ${config.params ?? ''} ${JSON.stringify(config.data) ?? ''}`);
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);
// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        console.log(response.data);
        return response.data;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

export default instance;
