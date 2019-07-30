/*
 * @Author: hzq
 * @Date: 2019-01-29 15:33:45
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 15:10:43
 * @文件说明: 下拉菜单
 */
<template>
    <el-dropdown class='h-dropdown' :trigger="trigger" placement="bottom" v-bind="$attrs" @command="onCommand">
        <span class="el-dropdown-link">
            <i v-if="dot" class="el-icon-more c9" />
            <template v-else>
                <slot>操作</slot>
                <i class="el-icon-arrow-down el-icon--right" />
            </template>
        </span>
        <el-dropdown-menu slot="dropdown">
            <slot name="h-dropdown">
                <el-dropdown-item v-for="i in dropdown" :key="i.command" :command="i.command" :divided="i.divided">
                    <div>{{ i.name }}</div>
                </el-dropdown-item>
            </slot>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        name: 'h-dropdown',
        inheritAttrs: false,
        props: {
            // 下拉的数据
            dropdown: {
                type: Array,
                default() {
                    return [
                        {
                            command: 'edit',
                            // to:'user',
                            name: '编辑'
                        },
                        {
                            command: 'del',
                            // to:'user',
                            name: '删除'
                        }
                    ]
                }
            },
            // 触发下拉的行为
            trigger: {
                type: String,
                default: 'click'
            },
            // 是否显示点点点
            dot: {
                type: Boolean,
                default: false
            },
            // 传入的参数
            i: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            onCommand(op) {
                this.$emit('command', { op, i: this.i })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .h-dropdown {
        .el-dropdown-link {
            @extend .cursor;
            color: $c9;
            &:hover {
                color: $primary;
            }
            .el-icon-arrow-down {
                margin-left: 0;
            }
        }
    }
    .c3 {
        .el-dropdown-link {
            color: $c3;
        }
    }
</style>
