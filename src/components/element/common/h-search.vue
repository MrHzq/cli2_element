/*
 * @Author: hzq
 * @Date: 2019-01-29 13:56:38
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 14:46:34
 * @文件说明: 搜索输入框组件--TODO:ok
 */
<template>
    <div @change="search" class='h-search'>
        <h-input :value="value" :w="w" v-bind="$attrs" clearable maxlength="50" @input="val=>$emit('input',val)" @clear="search">
            <i slot="prefix" class="el-input__icon el-icon-search cursor" @click="search" />
        </h-input>
    </div>
</template>

<script>
    export default {
        name: 'h-search',
        inheritAttrs: false,
        props: {
            // 传入的值
            value: {
                type: [String, Number],
                default: ''
            },
            // 输入框的宽度，默认250px
            w: {
                type: [String, Number],
                default: '250'
            }
        },
        methods: {
            search() {
                this.$emit('search', this.value)
            }
        }
    }
</script>

<style lang='scss' scoped>
</style>
