/*
 * @Author: hzq
 * @Date: 2018-11-07 15:54:37
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 14:35:29
 * @文件说明: 编辑器组件
 */
<template>
    <div class="h-editor">
        <quill-editor ref="quillEditorDom" :options="editorOption" class="quillEditorDom" @change="onEditorChange($event)" @blur="onEditorBlur">
            <div id="toolbar" ref="toolbar" slot="toolbar">
                <span class="ql-formats">
                    <button type="button" class="ql-bold" text="加粗" />
                    <button type="button" class="ql-header" value="1" text="标题1" />
                    <button type="button" class="ql-header" value="2" text="标题2" />
                    <button type="button" class="ql-italic" text="斜体" />
                    <button type="button" class="ql-underline" text="下划线" />
                    <select class="ql-color" text="字体颜色">
                        <option selected="selected" />
                        <option value="#e60000" />
                        <option value="#ff9900" />
                        <option value="#ffff00" />
                        <option value="#008a00" />
                        <option value="#0066cc" />
                        <option value="#9933ff" />
                        <option value="#ffffff" />
                        <option value="#facccc" />
                        <option value="#ffebcc" />
                        <option value="#ffffcc" />
                        <option value="#cce8cc" />
                        <option value="#cce0f5" />
                        <option value="#ebd6ff" />
                        <option value="#bbbbbb" />
                        <option value="#f06666" />
                        <option value="#ffc266" />
                        <option value="#ffff66" />
                        <option value="#66b966" />
                        <option value="#66a3e0" />
                        <option value="#c285ff" />
                        <option value="#888888" />
                        <option value="#a10000" />
                        <option value="#b26b00" />
                        <option value="#b2b200" />
                        <option value="#006100" />
                        <option value="#0047b2" />
                        <option value="#6b24b2" />
                        <option value="#444444" />
                        <option value="#5c0000" />
                        <option value="#663d00" />
                        <option value="#666600" />
                        <option value="#003700" />
                        <option value="#002966" />
                        <option value="#3d1466" />
                        <option value="#312345" />
                    </select>
                    <select class="ql-align" text="对齐方式">
                        <option selected="selected" />
                        <option value="center" />
                        <option value="right" />
                        <option value="justify" />
                    </select>
                    <!-- <button type="button" class="ql-blockquote" text="引用块"></button> -->
                </span>
                <span class="ql-formats">
                    <button type="button" class="ql-list" value="ordered" text="有序列表" />
                    <button type="button" class="ql-list" value="bullet" text="无序列表" />
                </span>
                <span class="ql-formats">
                    <button type="button" class="ql-link" text="插入链接" @click="insertLink('insert')" />
                    <button type="button" style="position: relative;" text="上传图片">
                        <h-oss class="imageUpClass" @uploading="imageBeforeUp" @success="imageUpOk" @error="imageUpErr">1</h-oss>
                        <svg viewBox="0 0 18 18">
                            <rect class="ql-stroke" height="10" width="12" x="3" y="4" />
                            <circle class="ql-fill" cx="6" cy="7" r="1" />
                            <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12" />
                        </svg>
                    </button>
                    <button type="button" style="position: relative;" text="插入视频" @click="videoDialog=true">
                        <svg viewBox="0 0 18 18">
                            <rect class="ql-stroke" height="12" width="12" x="3" y="3" />
                            <rect class="ql-fill" height="12" width="1" x="5" y="3" />
                            <rect class="ql-fill" height="12" width="1" x="12" y="3" />
                            <rect class="ql-fill" height="2" width="8" x="5" y="8" />
                            <rect class="ql-fill" height="1" width="3" x="3" y="5" />
                            <rect class="ql-fill" height="1" width="3" x="3" y="7" />
                            <rect class="ql-fill" height="1" width="3" x="3" y="10" />
                            <rect class="ql-fill" height="1" width="3" x="3" y="12" />
                            <rect class="ql-fill" height="1" width="3" x="12" y="5" />
                            <rect class="ql-fill" height="1" width="3" x="12" y="7" />
                            <rect class="ql-fill" height="1" width="3" x="12" y="10" />
                            <rect class="ql-fill" height="1" width="3" x="12" y="12" />
                        </svg>
                    </button>
                </span>
                <span class="ql-formats">
                    <button type="button" class="ql-clean" text="清除格式" />
                </span>
            </div>
        </quill-editor>
        <!-- 插入链接-弹窗 -->
        <h-dialog :visible.sync="linkDialog" title="插入链接" width="420px" noline modal-body dialog-body click-modal>
            <el-form ref="linkForm" :model="linkForm" :rules="linkRules" label-position="left" label-width="70px" hide-required-asterisk>
                <el-form-item prop="name" class="mb20" label="链接文本">
                    <h-input v-model="linkForm.name" placeholder="输入链接文本" autocomplete="off" maxlength="20" />
                </el-form-item>
                <el-form-item prop="link" class="mb20" label="链接地址">
                    <h-input v-model="linkForm.link" placeholder="输入链接地址，以http://、https://开头" autocomplete="off" maxlength="1000" />
                </el-form-item>
                <el-form-item>
                    <h-button @click="linkCancelForm(false)">取消</h-button>
                    <h-button type="primary" @click="linkConfirmForm">确认</h-button>
                </el-form-item>
            </el-form>
        </h-dialog>
        <!-- 插入视频链接-弹窗 -->
        <h-dialog :visible.sync="videoDialog" title="插入视频" width="600px" noline modal-body dialog-body click-modal>
            <el-form ref="videoForm" :model="videoForm" :rules="videoRules" label-position="left" label-width="100px" hide-required-asterisk>
                <el-form-item prop="link" class="mb20" label="视频通用代码">
                    <h-input v-model="videoForm.link" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请插入视频通用代码，仅支持腾讯和哔哩哔哩" autocomplete="off" maxlength="1000" />
                </el-form-item>
                <el-form-item class="mb10">
                    <a href="https://www.lppoll.com/help/detail/52" target="_blank" class="primary">如何获取视频通用代码?</a>
                </el-form-item>
                <el-form-item>
                    <h-button @click="videoCancelForm">取消</h-button>
                    <h-button type="primary" @click="videoConfirmForm">确认</h-button>
                </el-form-item>
            </el-form>
        </h-dialog>
    </div>
</template>

<script>
    import 'quill/dist/quill.snow.css'
    import Axios from 'axios'
    import { quillEditor, Quill } from 'vue-quill-editor'
    import { ImageExtend } from '@/tool/quill-image-extend-module'
    Quill.register('modules/ImageExtend', ImageExtend)

    export default {
        name: 'h-editor',
        components: { 'quill-editor': quillEditor },
        props: {
            // 编辑器输入部分的高度
            height: {
                type: String,
                default: '670'
            },
            // 编辑器输入的内容
            content: {
                type: String,
                default: ''
            },
            // 编辑器占位的内容
            placeholder: {
                type: String,
                default: '请输入内容'
            }
        },
        data() {
            return {
                // quillDom元素
                quillDom: '',
                // 当前编辑器光标位置
                currQuillIndex: null,
                // 是否显示【插入链接】弹窗
                linkDialog: false,
                // 插入链接弹窗-form表单数据
                linkForm: { name: '', link: '' },
                // 插入链接弹窗-form表单验证规则
                linkRules: {
                    name: [
                        {
                            required: true,
                            message: '输入链接文本',
                            trigger: 'change'
                        }
                    ],
                    link: [
                        {
                            required: true,
                            message: '输入链接地址',
                            trigger: 'change'
                        },
                        {
                            pattern: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
                            message: '请输入正确的链接地址',
                            trigger: 'change'
                        }
                    ]
                },
                // 当前所有的占位图片数组
                imgLoadArr: [],
                // 当前占位图片数组的下标
                imgLoadIndex: [],
                // 是否显示【上传视频】弹窗
                videoDialog: false,
                // 插入视频链接弹窗-form表单数据
                videoForm: { link: '' },
                // 插入视频链接弹窗-form表单验证规则
                videoRules: {
                    link: [
                        {
                            required: true,
                            message: '请插入视频通用代码',
                            trigger: 'change'
                        },
                        {
                            pattern: /^<iframe/,
                            message: '请插入正确的视频通用代码',
                            trigger: 'change'
                        },
                        {
                            pattern: /qq.com|bilibili.com/,
                            message: '请插入 腾讯 或 哔哩哔哩 视频通用码',
                            trigger: 'change'
                        }
                    ]
                },
                // 编辑器-参数设置
                editorOption: {
                    placeholder: this.placeholder,
                    modules: {
                        ImageExtend: {
                            name: 'file',
                            action: '',
                            change: (xhr, formData) => {
                                const filedata = new FormData()
                                const file = formData.get('file')
                                const index = file.name.lastIndexOf('.')
                                const postfix = file.name.substr(0, index)
                                const editorImgId = Number(new Date())
                                this.imageBeforeUp(editorImgId)
                                const ossHost = this.$istest
                                    ? 'http://oss.linshibin.com'
                                    : 'https://oss.lpoll.net'
                                Axios.post(ossHost + '/Oss/GetOssPolicy').then(
                                    resp => {
                                        const res = resp.data
                                        for (const k in res) {
                                            res[k.toLowerCase()] = res[k]
                                        }
                                        if (res.code === 1) {
                                            const key = res.data.dir + '.' + postfix
                                            const host = res.data.host
                                            filedata.append('key', key)
                                            filedata.append(
                                                'policy',
                                                res.data.policy
                                            )
                                            filedata.append(
                                                'callback',
                                                res.data.callback
                                            )
                                            filedata.append(
                                                'signature',
                                                res.data.signature
                                            )
                                            filedata.append(
                                                'success_action_status',
                                                '200'
                                            )
                                            filedata.append(
                                                'OSSAccessKeyId',
                                                res.data.accessKeyId
                                            )
                                            filedata.append('file', file)
                                            Axios.post(host, filedata, {
                                                headers: {
                                                    'Content-Type':
                                                        'multipart/form-data'
                                                }
                                            }).then(
                                                ({ data }) => {
                                                    if (data.Code === 1) {
                                                        this.imageUpOk({
                                                            key,
                                                            host,
                                                            editorImgId
                                                        })
                                                    } else {
                                                        this.imageUpErr({
                                                            editorImgId
                                                        })
                                                    }
                                                },
                                                () => {
                                                    this.imageUpErr({ editorImgId })
                                                }
                                            )
                                        }
                                    }
                                )
                                return true
                            }
                        },
                        toolbar: '#toolbar'
                    }
                }
            }
        },
        mounted() {
            const _q = this.$refs.quillEditorDom
            // ===========初始化 编辑器内容===========
            const qlEditor = _q.$refs.editor.firstChild
            qlEditor.innerHTML = this.content || ''
            // ===========初始化 编辑器内容===========
            this.quillDom = _q.quill
            // 设置编辑器输入部分的高度
            _q.$refs.editor.style.height = Number(this.height) - 42 + 'px'
            // 链接-添加编辑事件
            document
                .querySelector('.quillEditorDom .ql-action')
                .addEventListener('click', this.insertLink, false)

            // 监听编辑器光标改变事件，将光标赋值给currQuillIndex
            this.quillDom.on('selection-change', range => {
                if (range && range.length === 0) {
                    this.currQuillIndex = range.index
                }
            })
        },
        methods: {
            // 编辑器change事件
            onEditorChange(e) {
                this.$emit('update:content', e.html)
            },
            // 编辑器Blur事件
            onEditorBlur() {
                this.$emit('blur')
            },
            // 插入链接弹窗-确认事件
            linkConfirmForm() {
                this.$refs.linkForm.validate(valid => {
                    if (valid) {
                        const form = this.$copy(this.linkForm)
                        if (
                            !form.link.match('https://') &&
                            !form.link.match('http://')
                        ) {
                            form.link = 'http://' + form.link
                        }
                        if (form.length) {
                            // 编辑链接-删除之前的链接
                            this.quillDom.deleteText(form.start, form.length)
                        }
                        // 往编辑器插入当前的链接信息
                        this.quillDom.insertText(
                            this.currQuillIndex,
                            form.name,
                            'link',
                            form.link
                        )
                        this.linkCancelForm(this.currQuillIndex + form.name.length)
                    }
                })
            },
            // 插入链接弹窗-取消事件
            linkCancelForm(length) {
                this.linkDialog = false
                this.linkForm = { name: '', link: '' }
                // 将编辑器的光标调整到插入的文字后面
                if (length) this.quillDom.setSelection(length)
            },
            // 插入\编辑 链接事件
            insertLink(flag) {
                this.linkDialog = true
                if (flag === 'insert') {
                    this.getQuillIndex() // 插入-仅仅获取当前要插入的光标位置
                } else {
                    // 编辑链接-获取到要编辑的链接信息
                    let Leaf = this.quillDom.getLeaf(this.currQuillIndex)
                    if (Leaf[0].parent.domNode.nodeName !== 'A') {
                        this.currQuillIndex++
                        Leaf = this.quillDom.getLeaf(this.currQuillIndex)
                    }
                    const [leaf, offset] = Leaf
                    this.currQuillIndex -= offset
                    this.linkForm = {
                        start: this.currQuillIndex,
                        name: leaf.text,
                        length: leaf.text.length,
                        link: leaf.parent.domNode.getAttribute('href')
                    }
                }
                this.$nextTick(() => this.$refs.linkForm.clearValidate())
            },
            // 插入视频链接-确认事件
            videoConfirmForm() {
                this.$refs.videoForm.validate(valid => {
                    if (valid) {
                        const form = this.$copy(this.videoForm)
                        let url = form.link.match(/src="(\S*)"/)[1]
                        const currIndex = this.getQuillIndex()
                        // 往编辑器插入当前的视频链接信息
                        this.quillDom.insertEmbed(currIndex, 'video', url)
                        // 编辑器插入换行符
                        this.quillDom.insertText(currIndex + 2, '\n')
                        // 将编辑器的光标调整到最后
                        this.quillDom.setSelection(currIndex + 2)
                        this.videoCancelForm()
                    }
                })
            },
            // 插入视频链接弹窗-取消事件
            videoCancelForm() {
                this.videoDialog = false
                this.videoForm = { link: '' }
                this.$nextTick(() => this.$refs.videoForm.clearValidate())
            },
            // 图片上传前操作-给qnUpData赋值
            imageBeforeUp(editorImgId) {
                // 插入占位图片
                this.quillInsert('load', editorImgId)
            },
            // 图片上传成功回调
            imageUpOk(res) {
                const index = this.imgLoadArr.findIndex(val => {
                    return val.editorImgId === res.editorImgId
                })
                // 删除对应的占位图片
                this.quillDom.deleteText(this.imgLoadArr[index].index, 2)
                // 插入上传成功的图片
                this.quillInsert(
                    'success',
                    this.$osshost + res.key,
                    this.imgLoadArr[index].index
                )
                // 删除占位图数组里面的值
                this.imgLoadArr.splice(index, 1)
            },
            // 图片上传失败回调
            imageUpErr(res) {
                const index = this.imgLoadArr.findIndex(val => {
                    return val.editorImgId === res.editorImgId
                })
                // 删除对应的占位图片
                this.quillDom.deleteText(this.imgLoadArr[index].index, 1)
                this.quillInsert('fail')
            },
            // 将图片插入编辑器里面
            quillInsert(flag, url, index) {
                if (flag === 'load') {
                    // 上传中，插入占位图片
                    // 获取光标所在位置
                    index = this.getQuillIndex()
                    this.imgLoadIndex.push(index)
                    this.imgLoadArr.push({ editorImgId: url, index })
                    url =
                        'https://wxvote.oss-cn-hangzhou.aliyuncs.com/temp/2019-04-18/UVXfS4h0ONZ.gif'
                    // 插入图片
                    this.quillDom.insertEmbed(index, 'image', url)
                } else if (flag === 'success') {
                    // 上传成功，插入上传的图片
                    // 插入图片
                    this.quillDom.insertEmbed(index, 'image', url)
                    // 将编辑器的光标调整到最后
                    this.quillDom.setSelection(index + 1)
                    // 编辑器插入换行符
                    this.quillDom.insertText(index + 1, '\n')
                } else {
                    // 上传失败，插入失败的图片
                    // url =
                    //     'https://wxvote.oss-cn-hangzhou.aliyuncs.com/temp/2019-03-28/lYqt0YcqINZ.png'
                    // 插入图片
                    // this.quillDom.insertEmbed(index, 'image', url)
                }
            },
            // 获取光标位置
            getQuillIndex() {
                if (this.currQuillIndex === null) {
                    this.quillDom.focus()
                    this.quillDom.setSelection(this.quillDom.getLength() - 1)
                }
                this.quillDom.focus()
                this.currQuillIndex = this.quillDom.getSelection().index
                return this.currQuillIndex
            }
        }
    }
</script>

<style lang='scss' scoped>
    .h-editor {
        /deep/ .quill-editor {
            .ql-snow {
                border: 1px solid #dcdfe6;
            }
            .ql-toolbar {
                position: relative;
                display: flex;
                align-items: center;
                padding: 0;
                border-top: 1px solid #dcdfe6;
                border-bottom: none;
                background-color: #fff;
                .ql-formats button,
                .ql-align,
                .ql-color {
                    position: relative;
                    height: 28px;
                    width: 36px;
                    &::after {
                        display: none;
                        content: attr(text);
                        position: absolute;
                        top: 35px;
                        left: -30%;
                        z-index: 1;
                        width: 50px;
                        width: max-content;
                        padding: 5px 8px;
                        font-size: 12px;
                        line-height: initial;
                        color: #fff;
                        background-color: rgb(70, 76, 91);
                        border-radius: 4px;
                    }
                    &::before {
                        display: none;
                        content: '';
                        position: absolute;
                        top: 31px;
                        left: 10px;
                        width: 0;
                        height: 0;
                        border-color: transparent;
                        border-style: solid;
                        border-width: 0 5px 5px;
                        border-bottom-color: rgb(70, 76, 91);
                    }
                    &:hover {
                        &::after,
                        &::before {
                            display: block;
                        }
                    }
                }
                .ql-color {
                    .ql-picker-options {
                        width: 160px;
                        padding: 8px;
                        border: none;
                        z-index: 2;
                        .ql-picker-item {
                            width: 18px;
                            height: 18px;
                            margin: 3px;
                        }
                    }
                }
                .ql-align {
                    .ql-picker-options {
                        padding: 4px;
                        border: none;
                        z-index: 2;
                        .ql-picker-item {
                            width: auto;
                            height: auto;
                        }
                    }
                }
                .ql-expanded {
                    .ql-picker-label {
                        outline: none;
                        border: none;
                        svg {
                            * {
                                stroke: #06c;
                            }
                        }
                    }
                }

                .imageUpClass {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 2222;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    & > div,
                    .el-upload {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .ql-container {
                padding: 10px;
                .ql-editor {
                    padding: 0;
                    font-size: 14px;
                    color: $c6;
                    text-align: justify;
                    // 编辑器输入部分-设置placeholder的样式
                    &::before {
                        left: 10px;
                        color: #b3b3b3;
                        font-style: normal;
                    }
                    p {
                        margin: 12px 0;
                        color: $c6;
                        &:first-child {
                            margin-top: 0;
                        }
                    }
                    span {
                        color: $c6;
                    }
                    blockquote {
                        margin: 12px 0;
                        color: $c9;
                        padding-left: 13px;
                        border-left: 3px solid #d8d8d8;
                    }
                    h1 {
                        margin: 20px 0 12px;
                        color: $c3;
                        font-size: 20px;
                        font-weight: normal;
                    }
                    h2 {
                        margin: 20px 0 12px;
                        color: $c3;
                        font-size: 18px;
                        font-weight: normal;
                    }
                    // 编辑器输入部分-清除有序、无序列表的前面空格
                    ul,
                    ol {
                        color: $c3;
                        padding-left: 0;
                    }
                    li:not(.ql-direction-rtl)::before {
                        text-align: center;
                    }
                    iframe {
                        display: block;
                        width: 100%;
                        height: 344px;
                        margin: 16px 0;
                    }
                    // 编辑器输入部分-设置图片铺满
                    img {
                        display: block;
                        max-width: 100%;
                        margin: 16px 0;
                    }
                    button {
                        position: relative;
                        &::after {
                            content: 'dasdasd';
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                    }
                    a {
                        color: $primary;
                        cursor: pointer;
                    }
                    .ql-align-center {
                        img {
                            margin: 16px auto;
                        }
                    }
                }
                .ql-tooltip {
                    font-size: 14px;
                    padding: 0 10px;
                    &::before {
                        display: none;
                        content: '链接地址:';
                    }
                    a.ql-preview {
                        max-width: 200px;
                        color: $primary;
                        line-height: unset;
                    }
                    a.ql-action::after {
                        content: '编辑';
                        padding-right: 0;
                        margin-left: 15px;
                        border-right: none;
                        color: $primary;
                    }
                    a.ql-remove::before {
                        display: none;
                        content: '移除';
                    }
                }
                .ql-editing {
                    display: none;
                }
            }
        }
        /deep/ .el-dialog {
            z-index: 3000;
            .el-dialog__header {
                line-height: initial;
            }
            .el-dialog__footer {
                padding-top: 0;
            }
        }
    }
</style>
