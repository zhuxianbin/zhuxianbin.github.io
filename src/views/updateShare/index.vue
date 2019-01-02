<template>
  <div class="app-container">
    <div class="bt">
        <span class="s1"></span>
        <span class="s2">任务编辑</span>
        <div style="clear:both"></div>
    </div>
    <el-form :model="formTest2" ref="rulesTest2" :rules="rulesTest2" label-width="130px" style="width: 500px; margin-top: 20px">
      <el-form-item label="任务规则：">
        <el-input value="分享" disabled></el-input>
      </el-form-item>

      <el-form-item label="任务名称：" prop="shareName">
        <el-col :span="12">
          <el-input v-model="formTest2.shareName" placeholder="请输入任务名称" clearable></el-input>
        </el-col>
        <el-col :span="11" :offset="1">
          <span>请控制在15字以内</span>
        </el-col>  
      </el-form-item>

      <el-form-item label="推广链接：" prop="links">
        <el-input v-model="formTest2.links" placeholder="请输入地址" clearable></el-input>
      </el-form-item>

      <el-form-item label="奖励方式：" prop="shareBonusType">
        <el-row>
            <el-col :span="4">
                <el-radio v-model="formTest2.shareBonusType" :label="1">金币</el-radio>
            </el-col>
            <el-col :span="13">
              <el-form-item prop="shareBonusAmout">
                  <el-input v-model="formTest2.shareBonusAmout" onkeyup="value=value.replace(/[^\d]/g,'')" clearable></el-input>
              </el-form-item>
            </el-col>    
        </el-row>
        <el-row style="margin-top: 15px">
            <el-col :span="5">
                <el-radio disabled v-model="formTest2.shareBonusType" :label="2">优惠券</el-radio>
            </el-col>
            <el-col :span="15">
                <el-select placeholder="选券" disabled>
                    <el-option label="满100减50" value="1"></el-option>
                    <el-option label="全场打8折" value="2"></el-option>
                </el-select>
            </el-col>    
        </el-row>
      </el-form-item>

      <el-form-item label="奖励次数：" prop="bonusCountType">
        <el-row>
          <el-radio v-model="formTest2.bonusCountType" :label="0">永久一次</el-radio>
        </el-row>
         <el-row style="margin-top: 15px">
           <el-col :span="4">
             <el-radio v-model="formTest2.bonusCountType" :label="1">每天</el-radio>
           </el-col>
           <el-col :span="6">
             <el-form-item prop="bonusCount">
                <el-input v-model="bonusCountObj" placeholder="几" clearable onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="2" :offset="1">
             <span>次</span>
           </el-col>
           <el-col :span="4" :offset="1">
             <!-- <el-checkbox disabled v-model="checked">显示进度条</el-checkbox> -->
           </el-col>
         </el-row>
      </el-form-item>

      <el-form-item label="是否启用：" prop="isEnable">
          <el-radio v-model="formTest2.isEnable" :label="1">是</el-radio>
          <el-radio v-model="formTest2.isEnable" :label="0">否</el-radio>
      </el-form-item>

      <el-form-item label="任务描述：" prop="shareDesc">
          <el-input type="textarea" v-model="formTest2.shareDesc" :rows="5"></el-input>
      </el-form-item>

      <div style="width: 100%;height: 1px;background-color: #ccc"></div>

      <el-form-item label="任务预览标题：" style="margin-top: 20px" prop="sharePreTitle">
          <el-input v-model="formTest2.sharePreTitle" placeholder="送你一辆车，免费开7天！" clearable></el-input>
      </el-form-item>

      <el-form-item label="分享描述：" prop="sharePreRemarks">
          <el-input type="textarea" v-model="formTest2.sharePreRemarks" :rows="5" clearable placeholder="分享描述"></el-input>
      </el-form-item>

      <el-form-item label="分享图片：" prop="sharePreImgPath">
          <el-upload
            class="upload-demo"
            :action="actionUrl"
            multiple
            :on-success="handleSuccess"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">图片尺寸：300*300，≤200kb</div>
            <div class="el-upload__tip" slot="tip" v-show="formTest2.sharePreImgPath ? true : false"><img :src="formTest2.sharePreImgPath" width="300" height="300"/></div>
         </el-upload>
      </el-form-item>

      <el-form-item>   
        <el-button type="primary" @click="onSubmit1('rulesTest2')">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { shareConfigGetDetail, shareConfigUpdate, shareConfigAdd } from "@/api/shareSet";
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      actionUrl: process.env.BASE_API + '/partner/upload/uploadFile?token=' + getToken(),
      formTest2: {
        links: "",
        shareName: "",
        bonusCount: 1,
        bonusCountType: 1,
        isEnable: 1,
        shareBonusType: 1,
        shareDesc: "",
        sharePreTitle: "",
        sharePreRemarks: "",
        sharePreImgPath: "",
        shareBonusAmout: ""
      },
      checked: "",
      rulesTest2: {
        shareName: [{ required: true, message: '请输入任务名称', trigger: 'blur' },
                    { max: 15, message: '长度在15个字符以内', trigger: 'blur'}
                  ],
        links: [{ required: true, message: '请输入链接地址', trigger: 'blur' }],
        shareBonusType: [{ required: true, message: '请选择奖励方式', trigger: 'blur' }],
        shareBonusAmout: [{ required: true, message: '请输入金币数量', trigger: 'blur' }],
        bonusCountType: [{ required: true, message: '请选择奖励次数', trigger: 'blur' }],
        bonusCount: [{ required: true, message: '请输入奖励次数', trigger: 'blur' }],
        isEnable: [{ required: true, message: '请选择是否启用', trigger: 'blur' }],
        shareDesc: [{ required: true, message: '请输入任务描述', trigger: 'blur' }],
        sharePreTitle: [{ required: true, message: '请输入任务预览标题', trigger: 'blur' },
                        { max: 15, message: '长度在15个字符以内', trigger: 'blur'}],
        sharePreRemarks: [{ required: true, message: '请输入分享描述', trigger: 'blur' }],
        sharePreImgPath: [{ required: true, message: '请选择图片', trigger: 'blur' }]
      },
      fileList: []
    };
  },
  computed: {
    bonusCountObj: {
      set: function(val) {
        this.formTest2.bonusCount = val;
      },
      get: function () {
        if (this.formTest2.bonusCount < 1) {
          this.formTest2.bonusCount = 1;
          this.$set(this.formTest2, 'bonusCount', 1)
        }
        return this.formTest2.bonusCount;
      }
    }
  },
  mounted() {
    this.hasID()
  },
  methods: {
    // 判断是否有id传来
    hasID() {
        if (this.$route.query.id) {
            shareConfigGetDetail({configId: this.$route.query.id}).then(res => {
                this.formTest2 = {...res}
            })
        }
    },
    // 提交功能
    onSubmit1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.formTest2.id) {
                this.formTest2.createTime = this.time(this.formTest2.createTime);
                this.formTest2.updateTime = this.time(this.formTest2.updateTime);
                shareConfigUpdate(this.formTest2).then(res => {
                  this.$message({
                      message: '修改成功',
                      type: 'success'
                  });
                })
            } else {
                shareConfigAdd(this.formTest2).then(res => {
                  this.$message({
                      message: '添加成功',
                      type: 'success'
                  });
                })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    // 图片上传功能
    handleSuccess(res, file) {
      this.fileList = []
      this.formTest2.sharePreImgPath = res.data
      const obj = {
        name: file.name,
        url: res.data
      }
      this.fileList.push(obj)
      this.$set(this.formTest2, 'sharePreImgPath', res.data)
    }
  }
};
</script>

<style>
</style>

