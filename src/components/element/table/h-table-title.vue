/*
 * @Author: hzq
 * @Date: 2019-07-02 14:52:11
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 14:45:49
 * @文件说明: 表格-可点击类型的列：1、移入可显示更多的，2、移入显示title，3、可金额格式化
 */
<template>
    <el-table-column :prop="prop" :label="label" align="center" v-bind="$attrs">
        <template slot-scope="scope">
            <div class="flex-c cursor" :title="myTitle" @click="$emit('text-click',scope.row)">
                <i v-if="usericon" :title="iconTitle" class="el-icon-s-custom dn mr5 f18 c9" :class="typeof usericon==='string'?usericon:''" @click.stop="$emit('icon-click',scope.row)" />
                <h-tooltip class="c3 cursor" :class="['ellipsis'+overcol,$color(color).class,{flex:usericon}]" :style="$color(color).style" :disabled="isDisabled" @mouseover.native="onMouseover" @mouseout.native="onMouseout">
                    <div :style="{'max-width':maxWidth}">{{Value(scope)}}</div>
                </h-tooltip>
            </div>
        </template>
    </el-table-column>
</template>

<script>
    export default {
        name: 'h-table-title',
        inheritAttrs: false,
        props: {
            prop: {
                type: String,
                default: 'Title'
            },
            label: {
                type: String,
                default: '标题'
            },
            // 是否开启 tooltip 功能
            opentip: {
                type: Boolean,
                default: false
            },
            // 是否显示为金额格式
            price: {
                type: Boolean,
                default: false
            },
            // 文字的title提示
            textTitle: {
                type: String,
                default: '点击编辑'
            },
            // icon的title提示
            iconTitle: {
                type: String,
                default: '点击查看'
            },
            // 是否显示用户icon
            usericon: {
                type: [Boolean, String],
                default: false
            },
            // 超出几列，隐藏，默认超出一列就隐藏
            overcol: {
                type: String,
                default: '1'
            },
            // 文字颜色
            color: {
                type: String,
                default: ''
            },
            // 最大宽度
            maxWidth: {
                type: String,
                default: '474px'
            }
        },
        data() {
            return {
                myTitle: this.textTitle
            }
        },
        computed: {
            // 计算 tooltip 的 disabled 属性值
            isDisabled() {
                return this.price || this.opentip === false
            }
        },
        methods: {
            // 计算值
            Value({ row }) {
                return this.$tableVal(this, row)
            },
            // 鼠标移入：未禁用tooltip时隐藏title
            onMouseover() {
                if (!this.isDisabled) this.myTitle = ''
            },
            // 鼠标移出：未禁用tooltip时显示title
            onMouseout() {
                if (!this.isDisabled) this.myTitle = this.textTitle
            }
        }
    }
</script>

<style lang='scss' scoped>
    .flex-c {
        &:hover {
            .dn {
                display: block;
            }
        }
    }
</style>
