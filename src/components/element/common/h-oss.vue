/*
 * @Author: hzq
 * @Date: 2019-02-27 10:37:38
 * @Last Modified by: hzq
 * @Last Modified time: 2019-07-30 14:37:16
 * @文件说明: oss上传文件
 */
<template>
    <div :class="{full:full}" class="h-oss">
        <el-upload ref="imgUpload" :before-upload="ossBeforeUpload" :http-request="ossUpload" :on-success="ossUploadSuccess" :on-error="ossUploadError" :accept="accept" :class="{'drag-upload':type==='drag'}" :drag="type==='drag'" :list-type="type" :show-file-list="false" action="" v-bind="$attrs">
            <template v-if="type==='drag'">
                <h-bgi v-if="url" :src="$osshost+url" w="50%" h="100%">
                    <h-hover class="bgi-hover" color="white">重新上传</h-hover>
                </h-bgi>
                <template v-else>
                    <i class="el-icon-upload" />
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </template>
            </template>
            <template v-else-if="type==='picture-card'">
                <h-bgi v-if="url" :src="$osshost+url" w="100%" h="100%" hover>
                    <h-hover dcolor="f">重新上传</h-hover>
                </h-bgi>
                <template v-else>
                    <i class="el-icon-plus" />
                    <p class="picture-card-tip mt5 c9">上传微信二维码</p>
                </template>
            </template>
            <template v-else>
                <slot>
                    <h-button v-if="load" :loading="load" type="primary">上传中</h-button>
                    <h-button v-else type="primary">点击上传</h-button>
                </slot>
            </template>
        </el-upload>
        <div v-if="disabled" class="disabled" />
    </div>
</template>

<script>
    import Axios from 'axios'
    export default {
        props: {
            // 上传图片UI类型：text/picture-card/drag
            type: {
                type: String,
                default: 'text'
            },
            // 是否宽度铺满
            full: {
                type: Boolean,
                default: false
            },
            // 是否不可点击
            disabled: {
                type: Boolean,
                default: false
            },
            // 上传完成后的图片路径
            url: {
                type: String,
                default: ''
            },
            // 上传文件类型
            accept: {
                type: String,
                default: '.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PNG,.GIF,.webp'
            },
            // 不满足上传文件类型时的错误提示
            noacceptmsg: {
                type: String,
                default: ''
            },
            // 规定需要的宽高:[50,50]
            wh: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return { load: false }
        },
        methods: {
            // 图片上传前处理
            ossBeforeUpload(file) {
                const index = file.name.lastIndexOf('.')
                const isAccept = this.accept.match(file.name.substr(index))
                if (!isAccept) {
                    this.$msg(this.noacceptmsg || '请上传.jpg,.jpeg,.png等图片格式')
                    return false
                }
                // 大小 5M
                const isSize = file.size / 1024 / 1024
                if (isSize > 5) {
                    this.$msg('请上传5M以下的图片')
                    return false
                }
                if (this.wh.length) {
                    return this.checkWidthHeight(file)
                }
            },
            // 图片上传中
            ossUpload(option) {
                this.load = true
                const filedata = new FormData()
                const file = option.file
                const index = file.name.lastIndexOf('.')
                // 图片后缀
                const postfix = file.name.substr(index)
                const editorImgId = Number(new Date())
                this.$emit('uploading', editorImgId)
                this.getOssPolicy().then(resp => {
                    const res = resp.data
                    for (const k in res) res[k.toLowerCase()] = res[k]
                    if (res.code === 1) {
                        const key = res.data.dir + postfix
                        const host = res.data.host
                        filedata.append('key', key)
                        filedata.append('policy', res.data.policy)
                        filedata.append('callback', res.data.callback)
                        filedata.append('signature', res.data.signature)
                        filedata.append('success_action_status', '200')
                        filedata.append('OSSAccessKeyId', res.data.accessKeyId)
                        filedata.append('file', file)
                        Axios.post(host, filedata, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(
                            ({ data }) => {
                                if (data.Code === 1) {
                                    option.onSuccess({
                                        key,
                                        host,
                                        refs: this.$refs.imgUpload,
                                        editorImgId
                                    })
                                } else option.onError({ editorImgId })
                            },
                            () => option.onError({ editorImgId })
                        )
                    }
                })
            },
            // 图片上传完成
            ossUploadSuccess(res) {
                this.load = false
                this.$emit('success', res)
            },
            // 图片上传失败
            ossUploadError(err) {
                this.load = false
                this.$msg('上传失败')
                this.$emit('error', err)
            },
            // 获取oss
            getOssPolicy() {
                const ossHost = this.$istest
                    ? 'http://oss.linshibin.com'
                    : 'https://oss.lpoll.net'
                return Axios.post(ossHost + '/Oss/GetOssPolicy')
            },
            checkWidthHeight(file) {
                return new Promise((resolve, reject) => {
                    let isWhOk = false
                    // 读取图片数据
                    const reader = new FileReader()
                    reader.onload = e => {
                        const data = e.target.result
                        // 加载图片获取图片真实宽度和高度
                        const image = new Image()
                        image.onload = () => {
                            const { width, height } = image
                            isWhOk = width <= this.wh[0] && height <= this.wh[1]
                            if (isWhOk) resolve(true)
                            else {
                                this.$msg(
                                    `请上传尺寸为 ${this.wh[0]}*${
                                        this.wh[1]
                                    } 以内的图片`
                                )
                                reject(new Error('错误'))
                            }
                        }
                        image.src = data
                    }
                    reader.readAsDataURL(file)
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .h-oss {
        position: relative;
        display: inline-block;
        // .drag-upload {
        //     & /deep/ .el-upload {
        //         display: block;
        //         .el-upload-dragger {
        //             // height: 90px;
        //             height: 193px;
        //             @include flex-c($fd: column);
        //             .el-icon-upload {
        //                 margin: 0 0 10px;
        //                 // margin: 10px 0 0 10px;
        //                 font-size: 50px;
        //                 line-height: initial;
        //             }
        //             .el-upload__text {
        //                 line-height: initial;
        //             }
        //         }
        //     }
        // }
        & /deep/ .el-upload--picture-card {
            @include flex-c($fd: column);
            background-color: #fff;
            .picture-card-tip {
                line-height: normal;
            }
        }
        .disabled {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: #f5f7fa;
            cursor: not-allowed;
            opacity: 0.6;
        }
    }
    .full {
        display: block;
        width: 100%;
    }
</style>
