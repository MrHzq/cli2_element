/*
 * @Author: hzq
 * @Date: 2019-02-22 11:01:05
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 15:11:30
 * @文件说明: 表单组件
 */
<template>
    <el-form class="h-form" ref="hForm" :rules="rules" :label-width="labelWidth" v-bind="$attrs" label-position="left" hide-required-asterisk @submit.native.prevent @keyup.enter.native="stop||$emit('confirm')">
        <slot />
        <el-form-item v-if="btn">
            <h-button v-if="cancelBtn" @click="$emit('cancel')">{{cancelBtnText}}</h-button>
            <h-button v-if="confirmBtn" :loading="confirmBtnLoad" :w="confirmBtnWidth" type="primary" @click="$emit('confirm')">{{confirmBtnText}}</h-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'h-form',
        inheritAttrs: false,
        props: {
            // form ref
            refkey: {
                type: String,
                default: ''
            },
            // 表单域标签的宽度
            labelWidth: {
                type: String,
                default: '80px'
            },
            // 是否需要按钮
            btn: {
                type: Boolean,
                default: true
            },
            // 是否需要取消按钮
            cancelBtn: {
                type: Boolean,
                default: true
            },
            // 是否需要确定按钮
            confirmBtn: {
                type: Boolean,
                default: true
            },
            // 确定按钮的宽度
            confirmBtnWidth: {
                type: String,
                default: '98'
            },
            // 确定按钮文字
            confirmBtnText: {
                type: String,
                default: '确定'
            },
            // 取消按钮文字
            cancelBtnText: {
                type: String,
                default: '取消'
            },
            // 确定按钮load
            confirmBtnLoad: {
                type: Boolean,
                default: false
            },
            // 是否阻止回车提交事件
            stop: {
                type: Boolean,
                default: false
            },
            // 验证规则
            rules: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        mounted() {
            if (this.refkey) {
                this.$formRefs[this.refkey] = this.$refs.hForm
            }
        }
    }
</script>

<style lang='scss' scoped></style>
