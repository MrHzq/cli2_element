/*
 * @Author: hzq
 * @Date: 2019-07-01 16:05:24
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 14:45:50
 * @文件说明: 表格时间显示组件
 */
<template>
    <el-table-column :prop="prop" :label="label" :width="width" align="center" />
</template>

<script>
    export default {
        name: 'h-table-time',
        inheritAttrs: false,
        props: {
            prop: {
                type: String,
                default: 'CreatedAt'
            },
            label: {
                type: String,
                default: '添加时间'
            },
            width: {
                type: String,
                default: '170'
            }
        }
    }
</script>

<style lang='scss' scoped>
</style>
