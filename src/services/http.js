// 导入axios
import axios from "axios"

// 创建axios实例
const instance = axios.create({
    baseURL: "http://www.test.com/",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        return config
    },
    error => {
        // 请求错误处理
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 响应成功处理
        if (response.status === 200) {
            return response.data
        } else {
            return Promise.reject(new Error("请求失败"))
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default instance
