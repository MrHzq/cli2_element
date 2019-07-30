/*
 * @Author: hzq
 * @Date: 2019-07-01 16:05:24
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-04 18:25:51
 * @文件说明: 表格id显示组件-样式：固定列宽55px、居中
 */
<template>
    <el-table-column :prop="prop" :label="label" width="55" align="center" />
</template>

<script>
    export default {
        name: 'h-table-id',
        inheritAttrs: false,
        props: {
            prop: {
                type: String,
                default: 'Id'
            },
            label: {
                type: String,
                default: 'ID'
            }
        }
    }
</script>

<style lang='scss' scoped>
</style>
