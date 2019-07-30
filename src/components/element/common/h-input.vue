/*
 * @Author: hzq
 * @Date: 2019-02-13 14:17:31
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 15:58:33
 * @文件说明: 输入框组件
 */
<template>
    <el-input ref="inputDom" :key="inputKey" :value="value" :style="style" :maxlength="maxlength" :resize="resize" v-bind="$attrs" v-on="listeners" class='h-input'>
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
            // 多行输入框 是否需要resize
            resize: {
                type: String,
                default: 'none'
            }
        },
        data() {
            return {
                // 输入框的key，避免重复
                inputKey: Number(new Date())
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners
                }
            },
            style() {
                return {
                    width: this.$tool.px(this.w)
                }
            }
        }
    }
</script>

<style lang='scss' scoped></style>
