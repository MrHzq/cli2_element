/*
 * @Author: hzq
 * @Date: 2019-07-08 16:18:25
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 15:55:48
 * @文件说明: Vue 全局方法 封装
 */

export default {
    install(Vue) {
        // 按照指定页数跳转页面
        Vue.prototype.$pageTo = (that, page = 1, query = null) => {
            const _query = that.$deepCopy(query || that.$route.query)
            _query.page = page
            that.$to(that.$route.path, _query)
        }

        // 按照指定参数跳转页面：query对象的this、key、值、要跳转的页面（默认为当前页面）
        Vue.prototype.$queryTo = (that, key, val, path = '') => {
            const _query = that.$deepCopy(that.$route.query)
            _query[key] = val
            _query.page = 1
            that.$to(path || that.$route.path, _query)
        }

        // 页面相关的，处理参数的，并访问对应的方法
        Vue.prototype.$handelFun = (that, api) => {
            if (that.$query(that, 'page', 1) === 1) {
                // 当 页码为 1 时，直接调用方法，更新数据
                that[api]()
            } else that.$pageTo(that) // 否则 跳转到 第一页
        }

        // 表格：根据传入的prop，将值渲染出来，可渲染金额格式的
        Vue.prototype.$tableVal = (that, row) => {
            const prop = that.prop || that.$attrs.prop
            const keyArr = prop.split('.')
            const len = keyArr.length
            const lastKey = keyArr.pop()
            let _row = that.$copy(row)
            if (len) {
                for (let i = 0; i < len - 1; i++) _row = _row[keyArr[i]]
            }
            if (!_row.hasOwnProperty(lastKey)) {
                throw new Error(`【${prop}】 Error Key: ${lastKey}`)
            }
            let value = _row[lastKey]
            if (that.price) value = that.$fprice(value)
            return value
        }

        // 获取当前的颜色或颜色class，返回值：{ class: '', style: {}}
        Vue.prototype.$color = color => {
            const backObj = { class: '', style: {} }
            if (color) {
                if (color.match('#')) backObj.style.color = color
                else backObj.class = color
            }
            return backObj
        }

        // 重置对象，将值处理为空
        Vue.prototype.$reset = (_data, type = 'obj') => {
            let data = Vue.prototype.$copy(_data)
            if (type === 'obj') {
                for (const k in data) {
                    if (typeof data[k] === 'object') {
                        if (Array.isArray(data[k])) {
                            console.log(data[k])
                        } else data[k] = Vue.prototype.$reset(data[k])
                    } else data[k] = ''
                }
            } else if (type === 'json') {
                data = data.map(d => Vue.prototype.$reset(d))
            }
            _data = data
            return data
        }
    }
}
