import axios from 'axios'
import { BASE_URL } from './common'
import { getStore } from '@/store'
import { message } from 'antd'
import bindDispatchToPromise from '@/constants/bindDispatchToPromise'
import { REQUEST_REFRESHED_TOKEN } from '@/reducers/auth'
import { replace } from 'react-router-redux'


// 默认实例参数
const defaultOptions = {
    baseURL: `${BASE_URL}`,
    timeout: 30000,
    validateStatus: function() {
        return true
    }
}
const request = axios.create(defaultOptions)
const requestWithToken = axios.create(defaultOptions)
// 拦截 request 请求 添加Accept请求头
request.interceptors.request.use(function (config) {
    // if (config.attachments) {
    //   let param = new FormData()
    //   Object.keys(config.attachments).forEach(key => {
    //     param.append(key, config.attachments[key])
    //   })
    //   config.headers['Content-Type'] = 'multipart/form-data'
    // } else {
    //   config.headers.Accept = 'application/json'
    // }
    config.headers.Accept = 'application/json'
    return config
})
requestWithToken.interceptors.request.use(async function (config) {
    config.headers.Accept = 'application/json'
    const store = getStore()
    const promiseDispatch = bindDispatchToPromise(store.dispatch)
    const { auth } = store.getState()
    if (auth.data && auth.data.accessToken) {
        const timestamp = Math.round(new Date().getTime() / 1000)
        // // 判断token是否已过期 authStore.expiresIn
        // 添加5分钟的误差
        if (timestamp - auth.lastFetchedTime > auth.data.expiresIn - 300) { // 已过期
            if (timestamp - auth.lastFetchedTime < 2592000) { // refreshToken 未过期
                // 同步刷新Token
                const newAuthData = await promiseDispatch({
                    type: REQUEST_REFRESHED_TOKEN,
                    payload: {
                        refreshToken: auth.data.refreshToken
                    }
                })
                config.headers.Authorization = `${newAuthData.tokenType} ${newAuthData.accessToken}`
            } else {
                promiseDispatch(replace('/account/login'))
            }
        } else { // token 未过期
            config.headers.Authorization = `${auth.data.tokenType} ${auth.data.accessToken}`
        }
    } else {
        promiseDispatch(replace('/account/login'))
    }
    return config
})
// 通用响应拦截器
const responseInterceptor = async response => {
    const { status, data } = response
    if (status >= 200 && status < 300) {
        return Promise.resolve(data)
    } else {
        // console.log(data)
        message.error(data && data.data || '网络错误')
        return Promise.reject(response)
    }
}
// 拦截 respose 进行状态判断
request.interceptors.response.use(responseInterceptor)
requestWithToken.interceptors.response.use(responseInterceptor)

export {
    request,
    requestWithToken
}

export default request
