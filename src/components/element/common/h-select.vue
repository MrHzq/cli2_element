/*
 * @Author: hzq
 * @Date: 2019-01-31 15:38:18
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 14:46:33
 * @文件说明: 无边框的下拉框
 */
<template>
    <el-select :value="value" v-bind="$attrs" :style="style" :class="{'no-border':!showBorder}" class='h-select' @change="val=>$emit('change',val)">
        <el-option v-for="i in toption" :key="i.value" :label="i.label" :value="i.value" :disabled="i.disabled" />
    </el-select>
</template>

<script>
    export default {
        name: 'h-select',
        inheritAttrs: false,
        model: { event: 'change' },
        props: {
            // v-model 值
            value: {
                type: [String, Boolean, Number],
                default: ''
            },
            // 是否开启转换，将Id、Name 转为 value、label
            t: {
                type: Boolean,
                default: false
            },

            // 下拉选项
            option: {
                type: Array,
                default() {
                    return [
                        {
                            label: '显示',
                            value: 0
                        },
                        {
                            label: '隐藏',
                            value: 1
                        }
                    ]
                }
            },
            // option开头是否需要加上{value:0,label:'全部'}
            needAll: {
                type: [Boolean, String],
                default: false
            },
            // 下拉框宽度
            w: {
                type: [String, Number],
                default: '100'
            },
            // 显示边框
            showBorder: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            style() {
                return {
                    width: this.$tool.px(this.w)
                }
            },
            toption() {
                let toption = this.option
                if (this.t) {
                    toption = this.option.map(({ Id, Name }) => {
                        return { value: Id, label: Name }
                    })
                }
                if (this.needAll) {
                    const label =
                        typeof this.needAll === 'string' ? this.needAll : '全部'
                    // 开头添加 全部
                    toption.unshift({ value: 0, label })
                }
                return toption
            }
        }
    }
</script>

<style lang='scss' scoped>
    .no-border {
        & /deep/ .el-input {
            .el-input__inner {
                padding-left: 0;
                padding-right: 20px;
                border: none;
                color: currentColor;
                text-align: right;
                background-color: transparent;
                &::-webkit-input-placeholder {
                    color: $c9;
                }
            }
            .el-input__suffix {
                right: -5px;
            }
        }
        & /deep/ .is-disabled {
            .el-input__inner {
                padding-right: 0;
                text-align: center;
                cursor: text;
            }
            .el-input__suffix {
                display: none;
            }
        }
    }
</style>
