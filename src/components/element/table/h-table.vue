/*
 * @Author: hzq
 * @Date: 2019-01-29 17:14:16
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 14:45:43
 * @文件说明: 表格组件
 */
<template>
    <el-table class='h-table' ref="table" :class="{'header-bg':headBg}" v-bind="$attrs" style="width:100%" v-on="listeners">
        <slot/>
    </el-table>
</template>

<script>
    export default {
        name: 'h-table',
        inheritAttrs: false,
        props: {
            headBg: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            listeners() {
                return { ...this.$listeners }
            }
        },
        mounted() {
            this.$emit('mounted', this.$refs.table)
        }
    }
</script>

<style lang='scss' scoped>
    .h-table {
        & /deep/ .el-table__header-wrapper,
        & /deep/.el-table__fixed-header-wrapper {
            th {
                .cell {
                    color: $c9 !important;
                    font-weight: normal !important;
                }
            }
        }

        & /deep/ .el-table__body-wrapper {
            color: $c9;
        }
    }
</style>
