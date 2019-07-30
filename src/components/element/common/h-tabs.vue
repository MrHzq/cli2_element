/*
 * @Author: hzq
 * @Date: 2019-02-20 17:09:10
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-17 10:54:15
 * @文件说明: tabs
 */
<template>
    <el-tabs :value="tTabValue" :type="type" :class="{noline:noline}" class="h-tabs" @tab-click="tabClick">
        <el-tab-pane v-for="i in tTabPane" :key="i.name+''" :label="i.label" :name="i.name+''" />
        <slot/>
    </el-tabs>
</template>

<script>
    export default {
        name: 'h-tabs',
        inheritAttrs: false,
        props: {
            // 风格类型，element 原生
            type: {
                type: String,
                default: ''
            },
            // 当前的值
            tabValue: {
                type: [String, Number],
                default: ''
            },
            // tab选项
            tabPane: {
                type: Array,
                default() {
                    return [
                        {
                            name: 'all',
                            label: '全部'
                        },
                        {
                            name: 'other',
                            label: '其他'
                        }
                    ]
                }
            },

            // 是否转换tabPane，可将：Id、Name 转为 name、label
            idToLabel: {
                type: Boolean,
                default: false
            },
            // 是否转换tabPane，可将：value、label 转为 name、label（就是转换 select的option）
            valueToName: {
                type: Boolean,
                default: false
            },
            // tabPane开头是否需要加上{name:0,label:'全部'}
            needAll: {
                type: Boolean,
                default: false
            },
            // 返回时：是否需要将 name 转换为 Number类型
            number: {
                type: Boolean,
                default: false
            },
            // 是否存到本地，需要session storage的key
            local: {
                type: String,
                default: ''
            },
            // 不要底线
            noline: {
                type: Boolean,
                default: false
            },
            // 是否以name为路由进行跳转，当为string时，带上该参数跳转页面
            router: {
                type: [Boolean, String],
                default: false
            }
        },
        computed: {
            tTabPane() {
                let tTabPane = this.tabPane
                if (this.idToLabel) {
                    // 将 Id、Name 转为 name、label
                    tTabPane = this.tabPane.map(val => {
                        return {
                            name: val.Id,
                            label: val.Name
                        }
                    })
                } else if (this.valueToName) {
                    // 将 value、label 转为 name、label
                    tTabPane = this.tabPane.map(val => {
                        return {
                            name: val.value,
                            label: val.label
                        }
                    })
                }
                if (this.needAll) {
                    // 开头添加 全部
                    tTabPane.unshift({ name: 0, label: '全部' })
                }
                return tTabPane
            },
            tTabValue() {
                return (this.tabValue || this.tTabPane[0].name) + ''
            }
        },
        methods: {
            tabClick(val) {
                let name = val.name
                if (this.number) name = name * 1
                this.$emit('update:tabValue', name) // sync 同步数据
                this.$emit('click', name) // 触发点击事件
                if (this.local) this.$setItem(this.local, name)
                if (this.router) {
                    let query = {}
                    if (typeof this.router === 'string') {
                        query[this.router] = this.$gquery(this, this.router)
                    }
                    this.$to(name, query)
                }
            }
        },
        beforeDestroy() {
            if (this.local) this.$removeItem(this.local)
        }
    }
</script>

<style lang='scss' scoped>
    .noline {
        & /deep/ .el-tabs__nav-wrap {
            &::after {
                display: none;
            }
        }
    }
    .h-tabs {
        & /deep/ .el-tabs__nav-wrap {
            &::after {
                height: 1px;
                // background-color: $border;
            }
        }
    }
</style>
