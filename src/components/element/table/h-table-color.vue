/*
 * @Author: hzq
 * @Date: 2019-04-17 21:25:34
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 14:46:12
 * @文件说明: 表格-文字带颜色的列组件-仅仅加了颜色而已
 */
<template>
    <el-table-column align="center" v-bind="$attrs">
        <div slot-scope="scope" :class="$color(color).class" :style="$color(color).style">
            {{ Value(scope) }}
        </div>
    </el-table-column>
</template>
<script>
    export default {
        name: 'h-table-color',
        inheritAttrs: false,
        props: {
            color: {
                type: String,
                default: 'c9'
            }
        },
        methods: {
            // 计算当前表格的值
            Value({ row }) {
                return this.$tableVal(this, row)
            }
        }
    }
</script>
