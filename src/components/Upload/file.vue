<template>
  <el-upload
    :action="url"
    :show-file-list="false"
    :data="params"
    :before-upload="beforeUpload"
    :on-success="uploadSuccess">
    <el-button slot="trigger" size="small" type="warning" :loading="uploading">{{text}}</el-button>
    <a :href="templateUrl" :download="template" class="el-button el-button--small" style="margin-left: 10px;vertical-align: top;">Excel模板下载</a>
    <!-- <div slot="tip" class="el-upload__tip">上传文件不超过500kb</div> -->
  </el-upload>
</template>

<script>
import { getToken } from "@/utils/auth";
import { BASE_API } from "@/config";
export default {
  props: {
    maxKB: {
      type: Number,
      default() {
        return 1024 * 5;
      }
    },
    action: {
      type: String,
      default() {
        return "/api/image/upload";
      }
    },
    template: {
      type: String,
      default() {
        return "";
      }
    },
    templateUrl: {
      type: String,
      default() {
        return "";
      }
    },
    text: {
      type: String,
      default() {
        return "选取文件";
      }
    }
  },
  data() {
    const uploadUrl = `${BASE_API}${this.action}`;
    return {
      url: uploadUrl,
      show: false,
      params: {token: getToken()},
      uploading: false
      // headers: {
      //   "X-Token": getToken()
      // }
    };
  },
  methods: {
    uploadSuccess(jsonData, field) {
      this.uploading = false
      console.log("-------- upload success --------");
      console.log(jsonData.data);
      if (jsonData.code === 1) {
        this.$emit("success", jsonData, field);
        this.$emit("update:fileId", jsonData.data.id);
      } else {
        this.$message.error(jsonData.msg);
        return
      }
    },
    beforeUpload(file) {
      // console.log(file.size / 1024);
      this.uploading = true
      const isLtSize = file.size / 1024 < this.maxKB;
      if (!isLtSize) {
        this.$message.error(`上传头像图片大小不能超过 ${this.maxKB}kb!`);
      }
      return isLtSize;
    }
  }
};
</script>

<style>
</style>
