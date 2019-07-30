/*
 * @Author: hzq
 * @Date: 2019-07-02 13:42:13
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 15:09:01
 * @文件说明: 时间选择器组件
 */
<template>
    <el-time-picker v-if="type==='time'" v-model="dateVal" :clearable="false" :editable="false" :style="style" v-bind="$attrs" v-on="listeners" />
    <el-date-picker v-else v-model="dateVal" :type="type" :clearable="false" :editable="false" :style="style" v-bind="$attrs" v-on="listeners" />
</template>

<script>
    export default {
        name: 'h-date-picker',
        inheritAttrs: false,
        model: { event: 'change' },
        props: {
            // 传入的数据
            value: {
                type: [Date, Array, String],
                default() {
                    return new Date()
                }
            },
            // 类型：datetime、date、time
            type: {
                type: String,
                default: 'datetime'
            },
            // 宽度
            w: {
                type: [String, Number],
                default: ''
            }
        },
        computed: {
            style() {
                return {
                    width: this.$tool.px(this.w)
                }
            },
            dateVal: {
                get() {
                    let value = ''
                    if (this.type === 'time') value = this.value
                    else {
                        value = this.value ? this.$tool.fdate(this.value) : ''
                    }
                    return value
                },
                set(dateVal) {
                    this.$emit(
                        'change',
                        this.type === 'time' ? dateVal : this.$tool.fdate(dateVal)
                    )
                }
            },
            listeners() {
                return { ...this.$listeners }
            }
        }
    }
</script>

<style lang='scss' scoped></style>
