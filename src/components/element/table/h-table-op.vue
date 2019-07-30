/*
 * @Author: hzq
 * @Date: 2019-02-25 16:08:34
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-17 19:39:37
 * @文件说明: 表格操作组件
 */
<template>
    <!-- fixed="right" -->
    <el-table-column :width="width" label="操作" align="center" :fixed="nofixd?false:'right'">
        <template slot-scope="scope">
            <slot/>
            <h-dropdown :dropdown="dropdown" :i="scope.row" dot @command="val=>$emit('command', val)" />
        </template>
    </el-table-column>
</template>

<script>
    export default {
        name: 'h-table-op',
        inheritAttrs: false,
        props: {
            // 一列宽度
            width: {
                type: String,
                default: '90'
            },
            // 下拉操作数据
            dropdown: {
                type: Array,
                default() {
                    return [
                        {
                            command: 'edit',
                            name: '编辑'
                        },
                        {
                            command: 'del',
                            name: '删除'
                        }
                    ]
                }
            },
            nofixd: {
                type: Boolean,
                default: true
            }
        }
    }
</script>
<style lang="scss" scoped></style>
