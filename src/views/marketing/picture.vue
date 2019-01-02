<template>
  <div>
    <el-form :model="pictureForm" label-width="120px">
      <el-form-item label="邀请方式banner">
        <el-upload
          class="upload-demo"
          drag
          :action="actionUrl"
          :headers="headers"
          :on-success="upyes1"
          :file-list="fileList1"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">图片尺寸建议720*300，≤200kb</div>
          <div class="el-upload__tip" slot="tip" v-show="pictureForm.bannerImgOne ? true : false"><img :src="pictureForm.bannerImgOne" width="360" height="150"/></div>
        </el-upload>
      </el-form-item>

      <el-form-item label="接受邀请banner">
        <el-upload
          class="upload-demo"
          drag
          :action="actionUrl"
          :headers="headers"
          :on-success="upyes2"
          :file-list="fileList2"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">图片尺寸建议720*300，≤200kb</div>
          <div class="el-upload__tip" slot="tip" v-show="pictureForm.bannerImgTwo ? true : false"><img :src="pictureForm.bannerImgTwo" width="360" height="150"/></div>
        </el-upload>
      </el-form-item>

      <el-form-item label="邀请卡">
        <el-upload
          class="upload-demo"
          drag
          :action="actionUrl"
          :headers="headers"
          :on-success="upyes3"
          :file-list="fileList3"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">图片尺寸建议720*1120，≤200kb</div>
          <div class="el-upload__tip" slot="tip" v-show="pictureForm.invitecardImg ? true : false"><img :src="pictureForm.invitecardImg" width="360" height="560"/></div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitPic">保存</el-button>
      </el-form-item>  
    </el-form>
  </div>
</template>

<script>
import { advertisingSettingGetAllDetail, advertisingSettingUpdateAll } from "@/api/marketing";
import { getToken, getXToken } from '@/utils/auth'
export default {
  data () {
    return {
      actionUrl: process.env.BASE_API + '/partner/upload/uploadFile?token=' + getToken(),
      headers: {'X_Token': getXToken()},
      pictureForm: {
        bannerImgOne: '',
        bannerImgTwo: '',
        invitecardImg: ''
      },
      fileList1: [],
      fileList2: [],
      fileList3: []
    }
  },
  mounted () {
    this.advertisingSettingGetAllDetail()
  },
  methods: {
    upyes1(res, file) {
      this.fileList1 = []
      this.pictureForm.bannerImgOne = res.data
      const obj = {
        name: file.name,
        url: res.data
      }
      this.fileList1.push(obj)
      this.$set(this.pictureForm, 'bannerImgOne', res.data)
    },
    upyes2(res, file) {
      this.fileList2 = []
      this.pictureForm.bannerImgTwo = res.data
      const obj = {
        name: file.name,
        url: res.data
      }
      this.fileList2.push(obj)
      this.$set(this.pictureForm, 'bannerImgTwo', res.data)
    },
    upyes3(res, file) {
      this.fileList3 = []
      this.pictureForm.invitecardImg = res.data
      const obj = {
        name: file.name,
        url: res.data
      }
      this.fileList3.push(obj)
      this.$set(this.invitecardImg, 'invitecardImg', res.data)
    },
    advertisingSettingGetAllDetail() {
      advertisingSettingGetAllDetail().then(res => {
        this.pictureForm = {...res}
      })
    },
    // 修改图片信息
    submitPic() {
      advertisingSettingUpdateAll(this.pictureForm).then(res => {
        this.$message({
           message: '修改成功',
           type: 'success'
        });
      })
    }
  }
}
</script>

