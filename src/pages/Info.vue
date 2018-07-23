<template>
	<div class="info">
		<div class="ant-layout">
			<div class="ant-layout ant-layout-has-sider">
				
				<div class="ant-layout ant-layout-chaozhi">
					<div class="ant-layout-content">
						<!-- <div class="color-6 font-size-16" @click='steps = steps?0:1'>报名表当前状态</div>-->
							<el-alert v-if='info.status === 4' title="报名表审核失败!" :description="info.user.reason" type="error"></el-alert>
							
							<el-steps v-else class="margin-top-20" finish-status="success" :active="steps" simple>
								<el-step title="填写资料"></el-step>
								<el-step title="提交资料" ></el-step>
								<el-step title="审核中"></el-step>
								<el-step title="报名成功"></el-step>
							</el-steps>

							
							<template v-if="info.status === 0 || info.status === 1 || info.status === 4">
								<div class="text-center margin-top-20" style="font-size: 28px;">ACI注册国际心理咨询师培训考试报名表</div>
								<div class="margin-top-10">
									<table class="ui-table">
										<tbody>
											<tr>
												<td style='width:300px'>中文姓名</td>
												<td >
													<el-input placeholder="中文姓名" v-model="param.cn_name" style="width:300px;"></el-input>
												</td>
												<td style='width:200px'>英文姓名</td>
												<td >
													<el-input placeholder="英文姓名" v-model="param.en_name" style="width:300px;"></el-input>
												</td>
												<td rowspan="4" style="width: 150px;">
													<div class="text-center">
														<img :src="param.avatar_file+'?token='+Token" alt="" style="width: 130px;max-height: 160px;">
													</div>
													<div class="margin-top-10 text-center">
														<el-upload name="avatar_file" :show-file-list="false" accept="image/jpeg,image/jpg,image/png" :action="uploadAction" :before-upload="(file)=>{onBeforeUpload(file,'avatar_file')}">
															<el-button icon='el-icon-upload'>
																选择图片
															</el-button>
														</el-upload>
														<!-- <a class="ant-btn" href="javascript:;" @click="triggerUpload('avatar_file')" style="display: block;">选择图片</a> -->
													</div>
												</td>
											</tr>
											<tr>
												<td>性别</td>
												<td>
													<el-select placeholder="请选择性别" style="width: 300px;" v-model='param.sex'>
														<el-option v-for="item in sexType" :key="item.value" :label="item.label" :value="item.value"></el-option>
													</el-select>
												</td>
												<td>出生日期</td>
												<td>
													<el-date-picker v-model="param.birthday" clearable :picker-options="{disabledDate:disabledDate}" value-format='yyyy-MM-dd' style="width:300px;"></el-date-picker>
												</td>
											</tr>
											<tr>
												<td>毕业院校</td>
												<td>
													<el-input placeholder="毕业院校" v-model="param.college" style="width:300px;"></el-input>
												</td>
												<td>学历编号</td>
												<td>
													<el-input placeholder="学历编号" v-model="param.edu_num" style="width:300px;"></el-input>
												</td>
											</tr>
											<tr>
												<td>身份证/护照</td>
												<td>
													<el-input placeholder="身份证/护照" v-model="param.idcard" style="width:300px;"></el-input>
												</td>
												<td>电子邮件</td>
												<td>
													<el-input placeholder="电子邮件" v-model="param.email" style="width:300px;"></el-input>
												</td>
											</tr>
											<tr>
												<td>联系电话</td>
												<td>
													<el-input placeholder="联系电话" v-model="param.contacts_phone" style="width:300px;"></el-input>
												</td>
												<td>居住地址</td>
												<td colspan="2">
													<el-input placeholder="居住地址" v-model="param.addr" style="width:470px;"></el-input>
												</td>
											</tr>
											<tr>
												<td>课时选择</td>
												<td colspan="4" class="color-6">
													<el-select placeholder="请课时选择" style="width: 300px;" v-model='param.period'>
														<el-option v-for="item in ksType" :key="item.id" :label="item.name" :value="item.id"></el-option>
													</el-select>
												</td>
											</tr>
											<tr>
												<td>身份证复印件上传</td>
												<td colspan="4" class="color-6">
													<div>
														<el-upload class='inline-block' accept="image/jpeg,image/jpg,image/png" :show-file-list="false" name="idcard_front_file" :action="uploadAction"
														 :before-upload="(file)=>{onBeforeUpload(file,'idcard_front_file')}">
															<el-button icon='el-icon-upload'>
																选择正面图片
															</el-button>
														</el-upload>
														<a v-if='param.idcard_front' :href='param.idcard_front_file+"?token="+Token' target="_blank" class="inline-block margin-left-10 link"><i class="el-icon-picture"></i>
															我的身份证复印件</a>
														<!-- <a class="ant-btn" href="javascript:;" @click="triggerUpload('idcard_front_file')" style="width: 110px;">选择正面图片</a> -->

													</div>
													<div class="margin-top-10">
														<!-- <a class="ant-btn" href="javascript:;" @click="triggerUpload('idcard_reverse_file')" style="width: 110px;">选择反面图片</a> -->
														<!--<span class="inline-block margin-left-10">我的身份证复印件.JPG</span>-->
														<el-upload class='inline-block' accept="image/jpeg,image/jpg,image/png" :show-file-list="false" name="idcard_reverse_file" :action="uploadAction"
														 :before-upload="(file)=>{onBeforeUpload(file,'idcard_reverse_file')}">
															<el-button icon='el-icon-upload'>
																选择反面图片
															</el-button>
														</el-upload>
														
														<a v-if='param.idcard_reverse' :href='param.idcard_reverse_file+"?token="+Token' target="_blank" class="inline-block margin-left-10 link">
															<i class="el-icon-picture"></i>
															我的身份证复印件
														</a>
													</div>
												</td>
											</tr>
											<tr>
												<td>学历证书复印件上传</td>
												<td colspan="4" class="color-6">
													<div>
														<!-- <a href="javascript:;" @click="triggerUpload('edu_file')" class="ant-btn" style="width: 110px;">选择图片</a> -->
														<!--<span class="inline-block margin-left-10">学历证书.JPG</span>-->
														<el-upload class='inline-block'  accept="image/jpeg,image/jpg,image/png" :show-file-list="false" name="edu_file" :action="uploadAction" :before-upload="(file)=>{onBeforeUpload(file,'edu_file')}">
															<el-button icon='el-icon-upload'>
																选择图片
															</el-button>
														</el-upload>
														<a v-if='param.edu' :href='param.edu_file+"?token="+Token' target="_blank" class="inline-block margin-left-10 link"><i class="el-icon-picture"></i>
															我的学历证书复印件</a>
													</div>
												</td>
											</tr>
											<tr>
												<td>学位证书复印件上传</td>
												<td colspan="4" class="color-6">
													<div>
														<!-- <a href="javascript:;" @click="triggerUpload('degree_file')" class="ant-btn" style="width: 110px;">选择图片</a> -->
														<!--<span class="inline-block margin-left-10">学位证书.JPG</span>-->
														<el-upload class='inline-block' accept="image/jpeg,image/jpg,image/png" :show-file-list="false" name="degree_file" :action="uploadAction" :before-upload="(file)=>{onBeforeUpload(file,'degree_file')}">
															<el-button icon='el-icon-upload'>
																选择图片
															</el-button>
														</el-upload>
														<a v-if='param.degree' :href='param.degree_file+"?token="+Token' target="_blank" class="inline-block margin-left-10 link"><i class="el-icon-picture"></i>
															学位证书复印件</a>
													</div>
												</td>
											</tr>
											<tr>
												<td>报名表上传</td>
												<td colspan="4" class="color-6">
													<div>
														<el-upload class='inline-block' accept=".doc" :show-file-list="false" name="entry_form_file" :action="uploadAction" :before-upload="(file)=>{onBeforeUpload(file,'entry_form_file')}">
															<el-button icon='el-icon-upload'>
																选择文件
															</el-button>
														</el-upload>
														<!-- <v-upload name="entry_form_file" :show-file-list="false" :action="uploadAction" :beforeUpload="onBeforeUpload">
															<v-button type="ghost">
																选择文件
															</v-button>
														</v-upload> -->
														<!-- <a v-if='uploads.degree_file' :href='uploads.degree_file' target="_blank" class="inline-block margin-left-10">我的身份证复印件.JPG</a>
                                                        <a href="javascript:;" @click="triggerUpload('entry_form_file')" class="ant-btn" style="width: 110px;">选择文件</a> -->
														<!--<span class="inline-block margin-left-10">报表名.DOC</span>-->
														<a class="inline-block margin-left-20 link" download="" :href="info.entry_form_example_url">
															<i class="el-icon-document"></i>
														点击下载：报名表>></a>
													</div>
												</td>
											</tr>
											<tr>
												<td colspan="5">
													<p>1、全部为必填项</p>
													<p>2、上传照片要求（请严格按照照片要求）：</p>
													<p style="padding-left: 20px;">·图片格式：仅支持jpg类型</p>
													<p style="padding-left: 20px;">·建议分辨率：宽600px，高800px</p>
													<p style="padding-left: 20px;">·文件大小：小于1MB</p>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div class="text-center margin-top-20">
									<el-button @click='doSave' type="primary">保存报名表</el-button>
									<el-button type="warning" class="margin-left-20" @click="showConfirmForm">提交报名表</el-button>
								</div>
							</template>
							<template v-if="info.status === 2 || info.status === 3">
								<div class="text-center margin-top-20" style="font-size: 28px;">ACI注册国际心理咨询师培训考试报名表</div>
								<div class="margin-top-10">
									<table class="ui-table">
										<tr>
											<td>中文姓名</td>
											<td style="width: 300px;">
												{{param.cn_name}}
											</td>
											<td>英文姓名</td>
											<td style="width: 300px;">
												{{param.en_name}}
											</td>
											<td rowspan="4" style="width: 130px;">
												<div>
													<img :src="param.avatar_file+'?token='+Token" alt="" style="width: 130px;max-height: 160px;">
												</div>
											</td>
										</tr>
										<tr>
											<td>性别</td>
											<td>
												{{param.sex=="M"?"男":"女"}}
											</td>
											<td>出生日期</td>
											<td>
												{{param.birthday}}
											</td>
										</tr>
										<tr>
											<td>毕业院校</td>
											<td>
												{{param.college}}
											</td>
											<td>学历编号</td>
											<td>
												{{param.edu_num}}
											</td>
										</tr>
										<tr>
											<td>身份证/护照</td>
											<td>
												{{param.idcard}}
											</td>
											<td>电子邮件</td>
											<td>
												{{param.email}}
											</td>
										</tr>
										<tr>
											<td>联系电话</td>
											<td>
												{{param.contacts_phone}}
											</td>
											<td>居住地址</td>
											<td colspan="2">
												{{param.addr}}
											</td>
										</tr>
										<tr>
											<td>身份证复印件</td>
											<td colspan="4" class="color-6">
												<div>
													<a v-if='param.idcard_front' :href='param.idcard_front_file+"?token="+Token' target="_blank" class="inline-block margin-left-10 link"><i class="el-icon-picture"></i>
															我的身份证复印件</a>
													<a v-if='param.idcard_reverse' :href='param.idcard_reverse_file+"?token="+Token' target="_blank" class="inline-block margin-left-20 link">
															<i class="el-icon-picture"></i>
															我的身份证复印件
														</a>
												</div>
											</td>
										</tr>
										<tr>
											<td>学历证书复印件</td>
											<td colspan="4" class="color-6">
												<div>
													<a v-if='param.edu' :href='param.edu_file+"?token="+Token' target="_blank" class="inline-block margin-left-10 link"><i class="el-icon-picture"></i>
															我的学历证书复印件</a>
												</div>
											</td>
										</tr>
										<tr>
											<td>学位证书复印件</td>
											<td colspan="4" class="color-6">
												<div>
													<a v-if='param.degree' :href='param.degree_file+"?token="+Token' target="_blank" class="inline-block margin-left-10 link"><i class="el-icon-picture"></i>
															学位证书复印件</a>
												</div>
											</td>
										</tr>
										<!-- <tr>
											<td>报名表</td>
											<td colspan="4" class="color-6">
												<div>
													<a href="javascript:;">报名表.DOC</a>
												</div>
											</td>
										</tr> -->
									</table>
								</div>
								<div v-if='info.status == 2'>
								
									<div class="margin-top-20">
										<p class="font-size-18 color-warn">恭喜您提交报名信息成功！</p>
										<p>超职会在3～5个工作日进行审核，请及时关注网校QQ群/微信群公告！</p>
										<p>审核通过即代表报名成功，网校会及时通知您</p>
									</div>

									<!-- mn,xcxmmmclkc -->
								</div>
							</template>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="报名支付"
		width="800px"
			:visible.sync="pay.show"
			:show-close="false" 
			:close-on-click-modal='false' 
			:close-on-press-escape='false'>
			<paySiginUp v-if='pay.show' ></paySiginUp>
		</el-dialog>
	</div>
</template>

<script>
/**
 * @param file 上传文件的input
 * @param arrow 允许上传文件的后缀
 * @returns {boolean}
 * */
function verifyFileSuffix(file, arrow) {
  var arrowFile = arrow || "jpg,jpeg,png,gif,bmp,JPG,JPEG,PNG,GIF,BMP";
  var _path = file.value;
  var _fileArr = _path.replace(/(\\+)/g, "#").split("#");
  var _fileNameArr = _fileArr[_fileArr.length - 1].split(".");
  var _suffix = _fileNameArr[_fileNameArr.length - 1];
  var _result = arrowFile.indexOf(_suffix);
  if (_result >= 0) {
    return true;
  } else {
    showAlert("您选择的上传文件不是规定格式的文件！", 1070);
    return false;
  }
}

import paySiginUp from "@/components/paySiginUp";
import { mapState } from "vuex";
import {
    getToken
} from '@/utils/auth'
export default {
  name: "Info",
  components: {
    paySiginUp
  },
  data() {
    //console.log(this.$czapi);
    return {
      steps: 0,
      param: {
        cn_name: "", //中文名
        en_name: "", //英文名
        sex: "", //姓别 F 女 M 男
        birthday: "", //出生日期
        college: "", //毕业学校
        edu_num: "", //学历编号
        idcard: "", //身份证,护照
        email: "",
        contacts_phone: "", //联系电话
        addr: "", //居住地址
        period: "", //选择的课时ID
        idcard_front: "", //身份证 正面资源ID
        idcard_reverse: "", //身份证 反面资源ID
        edu: "", //学历复印件资源ID
        degree: "", //学位资源ID
        entry_form: "", //报名表资源ID
        avatar: "", //一寸照ID 下面为回显图片和资源的地址
        idcard_front_file: "", //身份证前面照片
        idcard_reverse_file: "", //身份证背面照片
        edu_file: "", //学历证书照片
        degree_file: "", //学位证书照片
        entry_form_file: "", //报名表照片
        avatar_file: "" //头像
      },
      info: {
        user: {},
        ext_info: {},
        period: []
      },

      sexType: [
        {
          value: "M",
          label: "男，M"
        },
        {
          value: "F",
          label: "女，F"
        }
      ],
      ksType: [],
      fileName: "file",
      uploadAction: this.$czapi.uploadAction,
      //cateList: [],
      // uploads: {
      //   idcard_front_file: "", //身份证前面照片
      //   idcard_reverse_file: "", //身份证背面照片
      //   edu_file: "", //学历证书照片
      //   degree_file: "", //学位证书照片
      //   entry_form_file: "", //报名表照片
      //   avatar_file: "" //头像
      // }
      //fileList: [],
      pay: {
        show: false
      }
    };
  },
  // computed: {
  //   ...mapState({
  //     info: state => state.userInfo
  //     //cateList: state => state.cateList
  //   })
  // },
  watch: {
    info: {
      handler(val, old) {
        this.param = { ...this.param, ...val.ext_info, ...val.user };
        this.ksType = val.period;
        this.status = val.status;
        this.steps = [0, 1, 2, 4][val.status];
      },
      immediate: true
    }
  },
  methods: {
    disabledDate(current) {
      return current && current.valueOf() >= Date.now();
    },

    // onChangeIdCardZm(info) {
    //   if (info.file.status !== "uploading") {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (info.file.status === "done") {
    //     console.log(info.file.name + " 上传成功.");
    //   } else if (info.file.status === "error") {
    //     console.log(info.file.name + " 上传失败.");
    //   }
    // },
    triggerUpload(type) {
      console.log(type);
      document.getElementById("wtFile").click();
    },
    showConfirmForm() {
      this.$confirm(
        "请确认您填写的资料是否正确\n" + "一经提交不能再修改",
        "注意",
        {
          confirmButtonText: "确认提交",
          cancelButtonText: "返回修改资料"
        }
      )
        .then(() => {
          //console.log("确认提交");
          let params = {};

          for (const key in this.param) {
            if (this.param.hasOwnProperty(key)) {
              const element = this.param[key];
              if (element) {
                params[key] = element;
              }
            }
          }
          //确认提交资料
          this.$czapi
            .submitUserSign(params)
            .then(({ code, msg, data_msg = [] }) => {
              if (code != 200) {
                let keys = Object.keys.call(this, data_msg);
                if (keys.length > 0) {
                  this.$notify.error({
                    title: "提交失败",
                    message: data_msg[keys[0]]
                  });
                } else {
                  this.$message.error(msg);
                }
                return false;
              }

              this.$message({ message: msg, type: "success" });

              this.steps++;
            });
        })
        .catch(() => {});
    },

    //临时保存
    doSave() {
      let params = {};

      for (const key in this.param) {
        if (this.param.hasOwnProperty(key)) {
          const element = this.param[key];
          if (element) {
            params[key] = element;
          }
        }
      }

      //确认提交资料
      this.$czapi.saveUserSign(params).then(({ code, msg, data_msg = [] }) => {
        if (code != 200) {
          let keys = Object.keys.call(this, data_msg);
          //console.log(this);

          if (keys.length > 0) {
            this.$notify.error({
              title: "保存失败",
              message: data_msg[keys[0]]
            });
          } else {
            this.$message.error(msg);
          }
          return false;
        }

        this.$message.success(msg);
      });
    },
    onBeforeUpload(file, filename) {

      let formData = new FormData();

      formData.append("file", file);

      fetch(`${this.uploadAction}?token=${this.Token}`, {
        method: "POST",
        //headers,
        body: formData
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          //console.log(data, file, reqOptions, 111);
          if (res.code == 200) {
            //console.log(reqOptions, this.$refs);
            this.param[filename] = res.data.url;
            this.param[filename.replace("_file", "")] = res.data.id;
            //console.log(this.param);
            this.$message.success("上传成功");
          }
        });

      //this.fileList = [];

      return false;
    },
    getUserSign() {
      this.$czapi.getUserSign().then(res => {
        if (res.status == 3) {
          this.getUserSignPayinfo();
        }

        this.info = res;
      });
    },
    getUserSignPayinfo() {
      this.$czapi.getUserSignPayinfo().then(res => {
        //this.info = res;
        this.pay.show = res.status == 0;
      });
    }
  },
  mounted() {
    this.getUserSign();
    //   this.param = { ...this.param, ...this.info.ext_info, ...this.info.user };
    //   this.ksType = this.info.period;
  }
};
</script>

<style lang="less" scoped>
.ant-layout-content {
  background: #fff;
  padding: 24px;
  margin: 0;
  min-height: 800px;
}
</style>