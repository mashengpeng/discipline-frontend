import axios from "axios";
import {ElNotification} from 'element-plus'

// 创建axios实例
const instance = axios.create({
    baseURL: "http://localhost:8888",
    timeout: 100000,
});

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        const key = localStorage.getItem("tokenName");
        const value = localStorage.getItem("tokenValue");
        if (key && value) {
            config.headers[key] = value;
        }
        // 在发送请求之前打印请求参数
        console.log(`${config.method.toUpperCase()} ${config.baseURL}${config.url} ${config.params ?? ''} ${config.data ?? ''}`);
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
        ElNotification({
            title: '请求异常',
            message: error,
            type: 'error',
            duration: 1000
        });
        return Promise.reject(error);
    }
);

export default instance;
