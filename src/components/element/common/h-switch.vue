/*
 * @Author: hzq
 * @Date: 2019-07-01 18:16:25
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 16:07:44
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
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners
                }
            }
        }
    }
</script>

<style lang="scss" scoped></style>
