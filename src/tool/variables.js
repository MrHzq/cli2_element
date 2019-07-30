/*
 * @Author: hzq
 * @Date: 2019-07-08 16:18:42
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 15:55:40
 * @文件说明: Vue 全局变量 封装
 */

export default {
    install(Vue) {
        // 表单refs
        Vue.prototype.$formRefs = {}

        // 每页数量
        Vue.prototype.$pageSize = 20

        // 分页是否开启路由模式
        Vue.prototype.$pageRouter = false
        // 是否为测试环境
        Vue.prototype.$istest = process.env.PATH_ENV === 'test'

        console.log('是否为测试环境：' + Vue.prototype.$istest)

        // oss域名
        Vue.prototype.$osshost = Vue.prototype.$istest
            ? 'https://wxvote.oss-cn-hangzhou.aliyuncs.com/'
            : 'https://lpoll.oss-cn-hangzhou.aliyuncs.com/'
    }
}
