/*
 * @Author: hzq
 * @Date: 2019-07-09 11:07:45
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 15:07:29
 * @文件说明: 表单验证规则
 */
const rules = {
    // ==================带有正则的 start==================
    // 手机号
    Phone(message = '请输入正确的手机号', trigger = 'blur', required = false) {
        return {
            required,
            message,
            trigger,
            pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        }
    },

    // QQ号
    QQ(
        message = '请输入正确的QQ号（纯数字，5-11位）',
        trigger = 'blur',
        required = false
    ) {
        return {
            required,
            message,
            trigger,
            pattern: /^[1-9][0-9]{4,10}$/
        }
    },

    // 链接地址
    Link(message = '请输入正确的链接地址', trigger = 'blur', required = false) {
        return {
            required,
            message,
            trigger,
            pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
        }
    },

    // 整数数字
    Number(message = '请输入正确的数字', trigger = 'blur', required = false) {
        return {
            required,
            message,
            trigger,
            pattern: /^[0-9]+$/
        }
    },

    // 小数
    Float(message = '请保留一位小数', trigger = 'blur', required = false) {
        // let pattern = `^(([^0][0-9]+|0).([0-9]{1,${len}})$)|^([^0][0-9]+|0)$`
        return {
            required,
            message,
            trigger,
            pattern: /^(\d+|\d+\.\d{1,1})$/
        }
    },

    // 英文和数字
    EnAndNum(message = '请输入英文和数字', trigger = 'blur', required = false) {
        return {
            required,
            message,
            trigger,
            pattern: /^[A-Za-z0-9]+$/
        }
    },

    // ==================带有正则的 end==================

    // 输入长度区间 [6,18]
    Len(
        min = 6,
        max = 18,
        message = '长度为 6 到 18 位',
        trigger = 'blur',
        required = false
    ) {
        return {
            required,
            min,
            max,
            message,
            trigger
        }
    },

    // 数字区间
    NumVal(
        min = 1,
        max = 5000,
        message = `请输入${min} - ${max} 之间的整数`,
        trigger = 'blur',
        required = false
    ) {
        return {
            required,
            min,
            max,
            message,
            trigger,
            type: 'number'
        }
    },

    // 文本必填
    required(message = '请输入内容', trigger = 'change', required = true) {
        return {
            required,
            message,
            trigger
        }
    },

    // 日期必填
    dateRequired(message = '请选择日期', trigger = 'change', required = true) {
        return {
            type: 'date',
            required,
            message,
            trigger
        }
    },

    // 验证有最大值和最小值的表单项
    newCheckMaxAndMinRules(
        vueThis,
        dataKey = 'voteTaskForm',
        rulesOption = {}
    ) {
        rulesOption = Object.assign(
            {
                default: { msg: '秒数', range: [1, 100] },
                IcrPerTime: { msg: '票数', range: [1, 5000] }
            },
            rulesOption
        )
        let rules = {}
        const formData = vueThis[dataKey]
        const handelRules = (objData, parentKey = '') => {
            console.log('parentKey：' + parentKey)
            for (const key in objData) {
                if (objData.hasOwnProperty(key)) {
                    if (key.match(/Max|Min/)) {
                        const isMax = !!key.match('Max')
                        const keyArr = key.split(/Max|Min/)
                        const { msg, range } = Object.assign(
                            {},
                            rulesOption.default,
                            rulesOption[keyArr[0]]
                        )
                        let rulesKey = key
                        if (parentKey) rulesKey = parentKey + '.' + key
                        rules[rulesKey] = [
                            this.required(
                                `请输入最${isMax ? '大' : '小'}${msg}`,
                                'blur'
                            ),
                            this.NumVal(...range),
                            {
                                validator: (rule, value, callback) => {
                                    const msg = this.newCheckRelationNumber(
                                        vueThis,
                                        rule,
                                        value,
                                        dataKey
                                    )
                                    if (msg) callback(new Error(msg))
                                    else callback()
                                },
                                trigger: 'blur'
                            }
                        ]
                    } else {
                        const obj = objData[key]
                        const isOnlyObjectAndHasValue =
                            Object.keys(obj).length &&
                            typeof obj === 'object' &&
                            !Array.isArray(obj)
                        if (isOnlyObjectAndHasValue) {
                            handelRules(obj, key)
                        }
                    }
                }
            }
        }
        handelRules(formData)
        console.log(rules)
        return rules
    },
    // 验证关联的数字是否规范，比如 区间的数字：Max>=Min
    newCheckRelationNumber(vueThis, rule, value, dataKey) {
        const oldField = rule.field
        let newField = rule.field
        let formData = vueThis[dataKey]
        const newFieldArr = newField.split('.')
        if (newFieldArr.length > 1) {
            formData = formData[newFieldArr[0]]
            newField = newField.split('.')[1]
        }
        if (newField.match('Min')) {
            // 则表示 当前的是最小的，那就不能大于最大的
            const maxDataKey = newField.replace('Min', 'Max')
            const max = formData[maxDataKey]
            if (max) {
                if (value > max) return '最大只能输入' + max
                else {
                    const maxValidateKey = oldField.replace('Min', 'Max')
                    // 移除最大值的错误提示
                    vueThis.$formRefs[dataKey].clearValidate(maxValidateKey)
                }
            }
        } else {
            // 则表示 当前的是最大的，那就不能小于最小的
            const minDataKey = newField.replace('Max', 'Min')
            const min = formData[minDataKey]
            if (min) {
                if (value < min) return '最小只能输入' + min
                else {
                    const minValidateKey = oldField.replace('Max', 'Min')
                    // 移除最小值的错误提示
                    vueThis.$formRefs[dataKey].clearValidate(minValidateKey)
                }
            }
        }
        return ''
    }
}
export default {
    install(Vue) {
        Vue.prototype.$rules = rules
    }
}
