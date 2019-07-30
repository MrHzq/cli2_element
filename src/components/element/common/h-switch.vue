/*
 * @Author: hzq
 * @Date: 2019-07-01 18:16:25
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-02 13:46:46
 * @文件说明: h-switch组件
 */
<template>
    <div class="h-switch">
        <el-switch :value="value" :active-color="$color.primary" v-bind="$attrs" v-on="listeners" />
    </div>
</template>

<script>
    export default {
        name: 'h-switch',
        inheritAttrs: false,
        model: { event: 'change' },
        props: {
            value: {
                type: [String, Boolean],
                default: ''
            },
            api: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    change: val => this.saveData(val)
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

<style lang="scss" scoped></style>
