import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import hzqAxios from 'hzq-axios'
import hzqTool from 'hzq-tool'
import ElementUI from 'element-ui'
// import Clipboard from 'clipboard'
// import QRCode from 'qrcode'
import './components/global'
import Tool from './tool/index'

Vue.use(Tool)
Vue.use(hzqTool, { router })

if (!window.ELEMENT) Vue.use(ElementUI)

// ==================Element 方法 start==================
// Element 删除弹窗提示方法
Vue.prototype.$del = (params = {}) => {
    params = Object.assign(
        {
            title: '提示',
            text: '是否确认删除？',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        },
        params
    )
    return Vue.prototype.$confirm(params.text, params.title, {
        confirmButtonText: params.confirmButtonText,
        cancelButtonText: params.cancelButtonText,
        type: 'warning'
    })
}

// Element 消息提示方法
const Msg = (
    message = '',
    index = 3,
    offset = 250,
    customClass = 'el-hzq-msg'
) => {
    const type = ['info', 'success', 'warning', 'error']
    if (message) {
        Vue.prototype.$message({
            offset,
            message,
            customClass,
            showClose: true,
            type: type[index]
        })
    }
}
Vue.prototype.$msg = Msg
// ==================Element 方法 end==================

// 复制粘贴方法
// Vue.prototype.$clipboard = className => {
//     const clipboard = new Clipboard(className)
//     clipboard.on('success', () => {
//         Msg('复制成功', 1)
//         // 释放内存
//         clipboard.destroy()
//     })
//     clipboard.on('error', () => {
//         Msg('该浏览器不支持复制')
//         // 释放内存
//         clipboard.destroy()
//     })
// }

// 生成二维码方法
// Vue.prototype.$qrcode = (host = 'www.baidu.com', obj = {}) => {
//     return new Promise((resolve, reject) => {
//         QRCode.toDataURL(host, {
//             width: 250,
//             height: 250,
//             margin: 1,
//             ...obj
//         })
//             .then(qrcodeImgBase64Src => resolve(qrcodeImgBase64Src))
//             .catch(() => {
//                 Msg('二维码生成错误，请重试')
//                 reject(new Error('二维码生成错误，请重试'))
//             })
//     })
// }

Vue.config.productionTip = false

Vue.use(hzqAxios, require.context('@/apiurl', true, /\.js$/), {
    baseURL: '/api',
    // 请求拦截之前
    beforeRequest(config) {
        console.log(config)
        return config
    },
    // 接口响应成功事件
    respSuccess(res) {
        console.log(res)
    },
    // 接口响应失败事件
    respError(e) {
        console.log(e)
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})
