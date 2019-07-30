/*
 * @Author: hzq
 * @Date: 2019-07-01 14:00:38
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-16 17:38:26
 * @文件说明: tabs+筛选+搜索组件
 */
<template>
    <div class='tabs-with-filter flex-b mb20'>
        <!-- h-tabs默认属性：tabValue、tabPane、valueToName(true)、local('')、noline(true)、number(true)、needAll(true) -->
        <h-tabs :tabValue="tabValue" :tabPane="$attrs.tab.tabPane" :valueToName="!$attrs.tab.novalueToName" :local="$attrs.tab.norouter?$route.name+'tabValue':''" :noline="!$attrs.tab.noline" :number="!$attrs.tab.nonumber" :needAll="!$attrs.tab.noneddAll" @click="tabClick" />
        <div class="other flex-s">
            <div class="left mr20">
                <slot />
            </div>
            <div class="right">
                <!-- h-search默认属性：w('')、placeholder('') -->
                <h-search v-if="!$attrs.search.hide" v-model.trim="tSearchKey" :w="$attrs.search.w" :placeholder="$attrs.search.placeholder" class="ml20" @search="returnVal" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabs-with-filter',
        inheritAttrs: false,
        props: {
            // 当前tab的值
            tabValue: {
                type: [String, Number],
                default: ''
            },
            // 传入搜索框的值
            searchKey: {
                type: [String, Number],
                default: ''
            }
        },
        computed: {
            tSearchKey: {
                get() {
                    return this.searchKey
                },
                set(val) {
                    this.$emit('update:searchKey', val)
                }
            }
        },

        methods: {
            tabClick(val) {
                // 1、清空搜索框的值
                // 2、判断是否需要使用路由跳转
                this.tSearchKey = ''
                if (this.$attrs.tab.norouter) {
                    // 以方法返回，路由不会变化
                    this.$emit('update:tabValue', val)
                    this.returnVal()
                } else {
                    // 以路由形式跳转
                    let _query = this.$deepCopy(this.$route.query)
                    // 判断是否需要清空其他query
                    if (this.$attrs.tab.clearRouter) _query = {}
                    // 更新tab的值
                    if (this.$attrs.tab.mykey) _query[this.$attrs.tab.mykey] = val
                    else _query.tab = val
                    // 将页码初始为1
                    _query.page = 1
                    this.$to(this.$route.path, _query)
                }
            },
            returnVal() {
                this.$emit('on-return')
            }
        }
    }
</script>

<style lang='scss' scoped>
    .h-tabs {
        & /deep/ .el-tabs__header {
            margin-bottom: 0;
        }
    }
</style>
