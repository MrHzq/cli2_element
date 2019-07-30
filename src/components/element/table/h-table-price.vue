/*
 * @Author: hzq
 * @Date: 2019-04-17 21:25:34
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 14:46:04
 * @文件说明: 表格-金额列组件-1、显示金额，2、可加前缀，3、可变换颜色
 * TODO: 一列显示一种颜色时：可以使用 props里面的 color
 * 若想一列显示多种颜色时：就要在原始数据上做处理，并且保持 props里面的 color 为空('')
 */
<template>
    <el-table-column :prop="prop" :label="label+'(元)'" :width="$attrs['min-width']?'':width" align="center" v-bind="$attrs">
        <template slot-scope="scope">
            <div :class="color?$color(color).class:scope.row[prop+'ColorClass']" :style="color?$color(color).style:scope.row[prop+'ColorStyle']">
                {{ Value(scope) }}
            </div>
        </template>
    </el-table-column>
</template>
<script>
    export default {
        name: 'h-table-price',
        inheritAttrs: false,
        props: {
            prop: {
                type: String,
                default: 'Money'
            },
            label: {
                type: String,
                default: '金额'
            },
            // 列宽，默认100px
            width: {
                type: String,
                default: '100px'
            },
            // 是否为金额，是的话：将以格式化后的金额显示，默认为 true
            price: {
                type: Boolean,
                default: true
            },
            // 文字颜色
            color: {
                type: String,
                default: ''
            },
            // 金额前缀
            prefix: {
                type: String,
                default: ''
            }
        },
        methods: {
            // 计算当前表格的值
            Value({ row }) {
                // 表格的值
                const val = this.$tableVal(this, row)
                // 金额的前缀
                const prefix = row[this.prop + 'Prefix'] || this.prefix
                return prefix + val
            }
        }
    }
</script>
