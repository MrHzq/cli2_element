/*
 * @Author: hzq
 * @Date: 2019-02-15 14:48:22
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 15:59:37
 * @文件说明: 弹窗组件
 */
<template>
    <el-dialog v-el-drag-dialog ref="hDialog" class='h-dialog flex-c' :class="{noline:noline}" v-bind="$attrs" v-on="listeners" :modal-append-to-body="modalBody" :append-to-body="dialogBody" :close-on-click-modal="clickModal">
        <slot/>
        <slot name="footer" />
    </el-dialog>
</template>

<script>
    import elDragDialog from '@/directive/el-dragDialog'
    export default {
        name: 'h-dialog',
        inheritAttrs: false,
        // 拖动
        directives: { elDragDialog },
        props: {
            // 是否隐藏头部的线
            noline: {
                type: Boolean,
                default: false
            },
            // 遮罩层是否插入body
            modalBody: {
                type: Boolean,
                default: false
            },
            // Dialog 自身是否插入body
            dialogBody: {
                type: Boolean,
                default: false
            },
            // 点击model是否关闭
            clickModal: {
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
            this.$refs.hDialog.$refs.dialog.style.minWidth = this.$attrs.width
        }
    }
</script>

<style lang='scss' scoped>
    .h-dialog {
        & /deep/ .el-dialog {
            margin: 0 !important;
            .el-dialog__header {
                user-select: none;
                border-bottom: 1px solid #f2f2f2;
                .el-dialog__headerbtn {
                    top: 0;
                    right: 0;
                    .el-dialog__close {
                        @extend .f18;
                        @extend .p18;
                    }
                }
            }
        }
    }
    .noline {
        & /deep/ .el-dialog__header {
            border-bottom: none;
        }
    }
</style>
