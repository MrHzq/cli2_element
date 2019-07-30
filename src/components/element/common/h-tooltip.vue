/*
 * @Author: hzq
 * @Date: 2019-07-02 14:59:23
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-18 11:34:13
 * @文件说明: 文字提示
 */
<template>
    <el-tooltip :placement="placement" effect="light" v-bind="$attrs">
        <slot />
        <slot name="content" slot="content">
            <slot/>
        </slot>
    </el-tooltip>
</template>

<script>
    export default {
        name: 'h-tooltip',
        inheritAttrs: false,
        props: {
            // Tooltip 的出现位置
            placement: {
                type: String,
                default: 'bottom'
            }
        }
    }
</script>

<style lang='scss' scoped></style>
