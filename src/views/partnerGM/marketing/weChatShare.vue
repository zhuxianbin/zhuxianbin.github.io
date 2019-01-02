<template>
  <div class="wx-container">
    <el-form :model="wxForm" label-width="100px">
      <el-form-item label="分享标题">
        <el-input v-model="wxForm.shareStyleTitle" placeholder="你敢点我就敢送，里面有车/有券/有钱!"></el-input>
      </el-form-item>
      <el-form-item label="分享描述">
        <el-input type="textarea" rows="6" v-model="wxForm.shareStyleContent" placeholder="您的朋友送你1辆车免费开7天,再送50元出行优惠卷"></el-input>
      </el-form-item>
      <el-form-item label="分享图片">
        <el-upload
          class="upload-demo"
          drag
          :action="actionUrl"
          :headers="headers"
          :on-success="upyesShare"
          :file-list="fileListShare"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">图片尺寸建议300*300，≤200kb</div>
          <div class="el-upload__tip" slot="tip" v-show="wxForm.shareStyleImgPath ? true : false"><img :src="wxForm.shareStyleImgPath" width="300" height="300"/></div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitWecat">保存</el-button>
      </el-form-item>   
    </el-form>
  </div>
</template>

<script>
import { ShareStyleSettingGetDetail, ShareStyleSettingUpdate } from "@/api/marketing";
import { getToken, getXToken } from '@/utils/auth'
export default {
  data () {
    return {
      actionUrl: process.env.BASE_API + '/partner/upload/uploadFile?token=' + getToken(),
      headers: {'X_Token': getXToken()},
      wxForm: {
        shareStyleTitle: '',
        shareStyleContent: '',
        shareStyleImgPath: ''
      },
      fileListShare: []
    }
  },
  mounted () {
    this.ShareStyleSettingGetDetail()
  },
  methods: {
    upyesShare(res, file) {
      this.fileListShare = []
      this.wxForm.shareStyleImgPath = res.data
      const obj = {
        name: file.name,
        url: res.data
      }
      this.fileListShare.push(obj)
      this.$set(this.wxForm, 'shareStyleImgPath', res.data)
    },
    // 获取微信分享设置详情
    ShareStyleSettingGetDetail() {
      ShareStyleSettingGetDetail().then(res => {
        this.wxForm = {...res}
      })
    },
    // 保存微信设置信息
    submitWecat() {
      const obj = {
        id: this.wxForm.id,
        hareStyleTitle: this.wxForm.hareStyleTitle,
        shareStyleContent: this.wxForm.shareStyleContent,
        shareStyleImgPath: this.wxForm.shareStyleImgPath
      }
     ShareStyleSettingUpdate(obj).then(res => {
       this.$message({
         message: '修改成功',
         type: 'success'
        });
     })
    }
  }
}
</script>

<style>
  .wx-container {
    width: 560px;
  }
</style>

