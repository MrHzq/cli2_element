/*
 * @Author: chenjie
 * @Date: 2019-01-21 14:24:19
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 15:47:25
 * @文件说明: 分页
 */
<template>
    <div v-if="total" class='h-page mt30'>
        <el-pagination :current-page="pageIndex" :total="total" :page-size="newPageSize" :layout="layout" v-bind="$attrs" v-on="listeners" />
    </div>
</template>

<script>
    export default {
        name: 'h-page',
        inheritAttrs: false,
        props: {
            // 当前页码
            pageIndex: {
                type: Number,
                default: 1
            },
            // 每页数量
            pageSize: {
                type: Number,
                default: 0
            },
            // 总数量
            total: {
                type: Number,
                default: 140
            },
            // 是否跳转页面
            router: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            newPageSize() {
                return this.pageSize || this.$pageSize
            },
            layout() {
                let layout = 'total, prev, pager, next'
                if (this.total / this.newPageSize > 7) layout += ', jumper'
                return layout
            },
            listeners() {
                return {
                    ...this.$listeners,
                    'current-change': page => {
                        if (this.$pageRouter) {
                            // 分页使用路由跳转
                            this.$pageTo(this, page)
                        } else {
                            // 分页使用方法，返回当前页码
                            this.$emit('update:pageIndex', page)
                            this.$emit('change', page)
                        }
                    }
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .h-page {
        & /deep/ .el-pagination {
            color: $c9;
            font-weight: normal;
            .el-pagination__total {
                color: $c9;
            }
        }
    }
</style>
