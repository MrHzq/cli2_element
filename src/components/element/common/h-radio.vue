/*
 * @Author: hzq
 * @Date: 2019-03-07 10:17:28
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 14:46:36
 * @文件说明: 单选组件
 */
<template>
    <el-radio-group v-model="rValue" class='h-radio' v-bind="$attrs" v-on="listeners">
        <template v-if="button">
            <el-radio-button v-for="i in radios" :key="i.label" :label="i.label">{{ i.name }}</el-radio-button>
        </template>
        <template v-else>
            <el-radio v-for="i in radios" :key="i.label" :label="i.label">{{ i.name }}</el-radio>
        </template>
    </el-radio-group>
</template>

<script>
    export default {
        name: 'h-radio',
        inheritAttrs: false,
        model: { event: 'change' },
        props: {
            value: {
                type: [String, Number, Boolean],
                default: 0
            },
            radios: {
                type: Array,
                default() {
                    return [
                        {
                            label: 0,
                            name: '单选'
                        },
                        {
                            label: 1,
                            name: '多选'
                        },
                        {
                            label: 2,
                            name: '必选'
                        }
                    ]
                }
            },
            // 是否访问接口
            api: {
                type: Array,
                default() {
                    return []
                }
            },
            // 是否为按钮形式
            button: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            listeners() {
                return { ...this.$listeners }
            },
            rValue: {
                get() {
                    return this.value
                },
                set(val) {
                    this.saveData(val)
                }
            }
        },
        methods: {
            saveData(val) {
                this.$emit('change', val)
                if (this.api.length) {
                    let obj = { [this.api[1]]: val }
                    if (this.api[2]) obj = Object.assign(obj, this.api[2])
                    else obj.ActivityId = this.$id(this)
                    this.$api[this.api[0]](obj).then(res => this.$resmsg(res))
                }
            }
        }
    }
</script>
