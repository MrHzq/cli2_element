/*
 * @Author: hzq
 * @Date: 2019-02-13 14:17:31
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 14:34:52
 * @文件说明: 输入框组件
 */
<template>
    <el-input ref="inputDom" :key="inputKey" :value="value" :style="style" :maxlength="maxlength" :resize="resize" v-bind="$attrs" v-on="listeners" :class="{mustErr:mustErr}" class='h-input'>
        <slot name="suffix" slot="suffix" />
        <slot name="prefix" slot="prefix" />
    </el-input>
</template>

<script>
    export default {
        name: 'h-input',
        inheritAttrs: false,
        props: {
            // 输入框的值
            value: {
                type: [String, Number],
                default: ''
            },
            // 输入框宽度
            w: {
                type: [String, Number],
                default: ''
            },
            // 输入框 是否需要访问接口
            api: {
                type: Array,
                default() {
                    return []
                }
            },
            // 多行输入框 是否需要resize
            resize: {
                type: String,
                default: 'none'
            },
            // 该输入框是否为必填项
            must: {
                type: [Boolean, String],
                default: false
            },
            // 其他规则：size:[1,100]等
            rules: {
                type: Object,
                default() {
                    return {}
                }
            },
            // 是否为2位小数的数字类型
            float: {
                type: Boolean,
                default: false
            },
            // 是否为整数数字类型
            number: {
                type: Boolean,
                default() {
                    if (this.float) return false
                    return Boolean(this.rules.size)
                }
            },
            // 最大输入长度
            maxlength: {
                type: String,
                default: '8'
            }
        },
        data() {
            return {
                // 当前输入的值
                currVal: '',
                // 输入框获取焦点时的值
                oldVal: '',
                // size 超出最大规则时：错误提示描述
                maxErr: '',
                // 必填提示error
                mustErr: false,
                // 输入框的key，避免重复
                inputKey: ''
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    focus: e => {
                        this.oldVal = e.target.value
                        this.$emit('focus', e)
                    },
                    input: val => {
                        this.mustErr = false
                        this.$emit('input', val)
                    },
                    change: val => this.inputData(val)
                }
            },
            style() {
                return {
                    width: this.$tool.px(this.w)
                }
            }
        },
        created() {
            this.inputKey = Number(new Date())
        },
        methods: {
            inputData(val) {
                this.currVal = val.trim()
                if (this.number) this.currVal = this.checkNum()
                if (this.float) this.currVal = this.checkFloat() * 1
                if (this.rules) {
                    if (this.rules.size) {
                        console.log(this.currVal)
                        this.currVal = this.checkSize()
                    }
                }
                this.$refs.inputDom.$el.children[0].value = this.currVal
                this.$emit('input', this.currVal)
                if (this.maxErr) {
                    this.$msg(this.maxErr)
                    this.maxErr = ''
                } else {
                    if (this.must) {
                        if (this.currVal === '') {
                            if (typeof this.must === 'string') {
                                this.$msg(this.must)
                                this.mustErr = true
                            }
                        } else this.saveData()
                    } else this.saveData()
                }
            },
            // 转为整数数字
            checkNum() {
                return parseInt(this.checkFloat() * 1)
            },
            // 转为数字+小数点后两位
            checkFloat() {
                return String(this.currVal).match(/^\d*(\.?\d{0,2})/g)[0] || null
            },
            // 限制数字大小  [1-5]
            checkSize() {
                const [min, max] = this.rules.size
                if (this.currVal > max) {
                    if (this.oldVal) this.maxErr = '最多输入' + max
                    return this.oldVal || max
                } else if (this.currVal < min) {
                    return min
                } else return this.currVal
            },
            saveData() {
                if (this.api.length) {
                    const [url, key, params] = this.api
                    let obj = { [key]: this.currVal }
                    if (params) obj = Object.assign(obj, params)
                    else obj.ActivityId = this.$id(this)
                    this.$api[url](obj).then(res => this.$resmsg(res))
                } else this.$emit('change')
            }
        }
    }
</script>

<style lang='scss' scoped>
    .mustErr {
        & /deep/ .el-input__inner,
        & /deep/ .el-textarea__inner {
            border-color: $danger;
        }
    }
</style>
