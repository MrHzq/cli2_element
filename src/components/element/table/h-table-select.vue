/*
 * @Author: hzq
 * @Date: 2019-02-25 16:08:34
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-19 15:04:00
 * @文件说明: 表格+下拉组件：可选、不可选、带颜色的
 */
<template>
    <el-table-column :label="label" :width="$attrs['min-width']?'':width||(disabled?'60px':'')" :align="$attrs.align||'center'" v-bind="$attrs">
        <template slot-scope="scope">
            <h-select v-model="scope.row[prop]" :option="$attrs.option" :w="$attrs.w||(disabled?40:60)" :style="ColorStyle(scope.row[prop])" :class="ColorClass(scope.row[prop])" :disabled="disabled" @change="$emit('change',scope)" />
            <div v-if="showMore&&scope.row[showMore]!=='0'" class="cursor" @click="$to('/finance',{tab:3})" title="点击查看退款" :style="ColorStyle(scope.row[prop])" :class="ColorClass(scope.row[prop])"> {{scope.row[showMore]}}</div>
        </template>
    </el-table-column>
</template>

<script>
    export default {
        name: 'h-table-select',
        inheritAttrs: false,
        props: {
            prop: {
                type: String,
                default: 'Status'
            },
            label: {
                type: String,
                default: '状态'
            },
            // 列宽
            width: {
                type: String,
                default: ''
            },
            // 是否可选
            disabled: {
                type: Boolean,
                default: false
            },
            // 是否显示更多信息
            showMore: {
                type: String,
                default: ''
            }
        },
        methods: {
            // 计算 颜色 style
            ColorStyle(val) {
                const color =
                    this.$attrs.option.find(o => o.value === val).color || ''
                let style = {}
                if (color) style.color = color
                return style
            },
            // 计算 颜色 class
            ColorClass(val) {
                const colorClass =
                    this.$attrs.option.find(o => o.value === val).colorClass || ''
                return colorClass
            }
        }
    }
</script>
