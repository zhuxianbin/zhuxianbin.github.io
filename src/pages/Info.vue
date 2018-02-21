<template>
	<div class="info">
		<div class="ant-layout">
			<div class="ant-layout ant-layout-has-sider">
				<div class="ant-layout-sider" style="">
					<div class="color-9 padding-15">我的超职管理后台</div>
					<ul class="ant-menu ant-menu-root ant-menu-inline ant-menu-light" style="height: 100%;">
						<li class="ant-menu-item">
							<div class="ant-menu-submenu-title">
								<router-link to="/index">
									<i class="iconfont icon-shouye"></i>
									<span class="margin-left-5">后台首页</span>
								</router-link>
							</div>
						</li>
						<li class="ant-menu-item ant-menu-item-selected">
							<div class="ant-menu-submenu-title">
								<router-link to="/info">
									<i class="iconfont icon-baoming"></i>
									<span class="margin-left-5">我的报考资料</span>
								</router-link>
							</div>
						</li>
						<li class="ant-menu-item">
							<div class="ant-menu-submenu-title">
								<router-link to="/courselist">
									<i class="iconfont icon-kecheng"></i>
									<span class="margin-left-5">我购买的课程</span>
								</router-link>
							</div>
						</li>
					</ul>
				</div>
				<div class="ant-layout ant-layout-chaozhi">
					<div class="ant-layout-content">
						<div class="color-6 font-size-16">报名表当前状态</div>
						<template v-if="info.code === 202">
							<div class="margin-top-20" style="color: #f00;">
								报名表审核失败
							</div>
						</template>
						<template v-else>
							<div class="ui-step margin-top-20">
								<div class="bar"></div>
								<v-row :gutter="200">
									<v-col span="8">
										<div class="item" :class="{active: info.code === 201 || info.code === 203 || info.code === 204}">
											<div>
												<span class="num">1</span>
											</div>
											<div class="margin-top-10 color-6">
												<span class="text">填写资料</span>
											</div>
										</div>
									</v-col>
									<v-col span="8">
										<div class="item" :class="{active: info.code === 203 || info.code === 204}">
											<div>
												<span class="num">2</span>
											</div>
											<div class="margin-top-10 color-6">
												<span class="text">资料审核中</span>
											</div>
										</div>
									</v-col>
									<v-col span="8">
										<div class="item" :class="{active: info.code === 204}">
											<div>
												<span class="num">3</span>
											</div>
											<div class="margin-top-10 color-6">
												<span class="text">报名成功</span>
											</div>
										</div>
									</v-col>
								</v-row>
							</div>
							<div class="text-center margin-top-20" style="font-size: 28px;">ACI注册国际心理咨询师培训考试报名表</div>

							<template v-if="info.code === 201">
								<div class="margin-top-10">
									<table class="ui-table">
										<colgroup>
											<col style='width:170px' />
											<col />
											<col style='width:170px' />
											<col />
										</colgroup>
										<tbody>
											<tr>
												<td>中文姓名</td>
												<td>
													<v-input placeholder="" v-model="param.cn_name" style="width:320px;"></v-input>
												</td>
												<td>英文姓名</td>
												<td>
													<v-input placeholder="" v-model="param.en_name" style="width:320px;"></v-input>
												</td>
												<td rowspan="4" style="width: 130px;">
													<div>
														<img :src="param.avatar_file" alt="" style="width: 130px;height: 160px;">
													</div>
													<div class="margin-top-10">
														<v-upload name="avatar_file" :action="uploadAction" @change="doChangeFile" :beforeUpload="onBeforeUpload">
															<v-button type="ghost">
																选择图片
															</v-button>
														</v-upload>
														<!-- <a class="ant-btn" href="javascript:;" @click="triggerUpload('avatar_file')" style="display: block;">选择图片</a> -->
													</div>
												</td>
											</tr>
											<tr>
												<td>性别</td>
												<td>
													<v-select placeholder="请选择性别" style="width: 320px;" v-model='param.sex' :data="sexType"></v-select>
												</td>
												<td>出生日期</td>
												<td>
													<v-date-picker v-model="param.birthday" clearable :disabled-date="disabledDate" style="width:320px;"></v-date-picker>
												</td>
											</tr>
											<tr>
												<td>毕业院校</td>
												<td>
													<v-input placeholder="" v-model="param.college" style="width:320px;"></v-input>
												</td>
												<td>学历编号</td>
												<td>
													<v-input placeholder="" v-model="param.edu_num" style="width:320px;"></v-input>
												</td>
											</tr>
											<tr>
												<td>身份证/护照</td>
												<td>
													<v-input placeholder="" v-model="param.idcard" style="width:320px;"></v-input>
												</td>
												<td>电子邮件</td>
												<td>
													<v-input placeholder="" v-model="param.email" style="width:320px;"></v-input>
												</td>
											</tr>
											<tr>
												<td>联系电话</td>
												<td>
													<v-input placeholder="" v-model="param.contacts_phone" style="width:320px;"></v-input>
												</td>
												<td>居住地址</td>
												<td colspan="2">
													<v-input placeholder="" v-model="param.addr" style="width:470px;"></v-input>
												</td>
											</tr>
											<tr>
												<td>课时选择</td>
												<td colspan="4" class="color-6">
													<v-select placeholder="请课时选择" style="width: 320px;" v-model='param.period' :data="ksType"></v-select>
												</td>
											</tr>
											<tr>
												<td>身份证复印件上传</td>
												<td colspan="4" class="color-6">
													<div>
														<v-upload accept="image/jpeg,image/jpg,image/png" name="idcard_front_file" :action="uploadAction" @change="doChangeFile"
														 :beforeUpload="onBeforeUpload">
															<v-button type="ghost">
																选择正面图片
															</v-button>
														</v-upload>
														<a v-if='param.idcard_front_file' :href='param.idcard_front_file' target="_blank" class="inline-block margin-left-10">我的身份证复印件.JPG</a>
														<!-- <a class="ant-btn" href="javascript:;" @click="triggerUpload('idcard_front_file')" style="width: 110px;">选择正面图片</a> -->

													</div>
													<div class="margin-top-10">
														<!-- <a class="ant-btn" href="javascript:;" @click="triggerUpload('idcard_reverse_file')" style="width: 110px;">选择反面图片</a> -->
														<!--<span class="inline-block margin-left-10">我的身份证复印件.JPG</span>-->
														<v-upload accept="image/jpeg,image/jpg,image/png" name="idcard_reverse_file" :action="uploadAction" @change="doChangeFile"
														 :beforeUpload="onBeforeUpload">
															<v-button type="ghost">
																选择反面图片
															</v-button>
														</v-upload>
														<a v-if='param.idcard_reverse_file' :href='param.idcard_reverse_file' target="_blank" class="inline-block margin-left-10">我的身份证复印件.JPG</a>
													</div>
												</td>
											</tr>
											<tr>
												<td>学历证书复印件上传</td>
												<td colspan="4" class="color-6">
													<div>
														<!-- <a href="javascript:;" @click="triggerUpload('edu_file')" class="ant-btn" style="width: 110px;">选择图片</a> -->
														<!--<span class="inline-block margin-left-10">学历证书.JPG</span>-->
														<v-upload accept="image/jpeg,image/jpg,image/png" name="edu_file" :action="uploadAction" @change="doChangeFile" :beforeUpload="onBeforeUpload">
															<v-button type="ghost">
																选择图片
															</v-button>
														</v-upload>
														<a v-if='param.edu_file' :href='param.edu_file' target="_blank" class="inline-block margin-left-10">我的身份证复印件.JPG</a>
													</div>
												</td>
											</tr>
											<tr>
												<td>学位证书复印件上传</td>
												<td colspan="4" class="color-6">
													<div>
														<!-- <a href="javascript:;" @click="triggerUpload('degree_file')" class="ant-btn" style="width: 110px;">选择图片</a> -->
														<!--<span class="inline-block margin-left-10">学位证书.JPG</span>-->
														<v-upload accept="image/jpeg,image/jpg,image/png" name="degree_file" :action="uploadAction" @change="doChangeFile" :beforeUpload="onBeforeUpload">
															<v-button type="ghost">
																选择图片
															</v-button>
														</v-upload>
														<a v-if='param.degree_file' :href='param.degree_file' target="_blank" class="inline-block margin-left-10">我的身份证复印件.JPG</a>
													</div>
												</td>
											</tr>
											<tr>
												<td>报名表上传</td>
												<td colspan="4" class="color-6">
													<div>
														<v-upload name="entry_form_file" :action="uploadAction" @change="doChangeFile" :beforeUpload="onBeforeUpload">
															<v-button type="ghost">
																选择文件
															</v-button>
														</v-upload>
														<!-- <a v-if='uploads.degree_file' :href='uploads.degree_file' target="_blank" class="inline-block margin-left-10">我的身份证复印件.JPG</a>
                                                        <a href="javascript:;" @click="triggerUpload('entry_form_file')" class="ant-btn" style="width: 110px;">选择文件</a> -->
														<!--<span class="inline-block margin-left-10">报表名.DOC</span>-->
														<a class="inline-block margin-left-20" download="" :href="info.entry_form_example_url">点击下载：报名表>></a>
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
									<v-button @click='doSave' type="primary">保存报名表</v-button>
									<v-button type="warning" class="margin-left-20" @click="showConfirmForm">提交报名表</v-button>
								</div>
							</template>
							<template v-if="info.code === 203">
								<div class="margin-top-10">
									<table class="ui-table">
										<tr>
											<td>中文姓名</td>
											<td style="width: 320px;">
												冯xx
											</td>
											<td>英文姓名</td>
											<td style="width: 320px;">
												Hel Yan
											</td>
											<td rowspan="4" style="width: 130px;">
												<div>
													<img src="http://img.juimg.com/tuku/yulantu/121216/234733-12121621553935.jpg" alt="" style="width: 130px;height: 160px;">
												</div>
											</td>
										</tr>
										<tr>
											<td>性别</td>
											<td>
												男，F
											</td>
											<td>出生日期</td>
											<td>
												19901010
											</td>
										</tr>
										<tr>
											<td>毕业院校</td>
											<td>
												北京大学
											</td>
											<td>学历编号</td>
											<td>
												12311199k122
											</td>
										</tr>
										<tr>
											<td>身份证/护照</td>
											<td>
												2233998111244111123
											</td>
											<td>电子邮件</td>
											<td>
												lovs1887@sina.com
											</td>
										</tr>
										<tr>
											<td>联系电话</td>
											<td>
												13798721112
											</td>
											<td>居住地址</td>
											<td colspan="2">
												浙江省宁波市江北区幸福小区12幢19楼
											</td>
										</tr>
										<tr>
											<td>身份证复印件上传</td>
											<td colspan="4" class="color-6">
												<div>
													<a href="javascript:;">我的身份证复印件.JPG</a>
													<a href="javascript:;" class="margin-left-20">我的身份证复印件.JPG</a>
												</div>
											</td>
										</tr>
										<tr>
											<td>学历证书复印件上传</td>
											<td colspan="4" class="color-6">
												<div>
													<a href="javascript:;">学历证书.JPG</a>
												</div>
											</td>
										</tr>
										<tr>
											<td>学位证书复印件上传</td>
											<td colspan="4" class="color-6">
												<div>
													<a href="javascript:;">学位证书.JPG</a>
												</div>
											</td>
										</tr>
										<tr>
											<td>报名表上传</td>
											<td colspan="4" class="color-6">
												<div>
													<a href="javascript:;">报名表.DOC</a>
												</div>
											</td>
										</tr>
									</table>
								</div>

								<div class="margin-top-20">
									<p class="font-size-18 color-warn">恭喜您提交报名信息成功！</p>
									<p>超职会在3～5个工作日进行审核，请及时关注网校QQ群/微信群公告！</p>
									<p>审核通过即代表报名成功，网校会及时通知您</p>
								</div>

								<div class="margin-top-20">
									<div class="inline-block">
										<div>
											<img src="" alt="">
										</div>
										<div class="margin-top-10">QQq群二维码</div>
									</div>
									<div class="inline-block margin-left-20">
										<div>
											<img src="" alt="">
										</div>
										<div class="margin-top-10">微信群二维码</div>
									</div>
								</div>
							</template>
							<template v-if="info.code === 204">
								<div class="margin-top-10">
									<table class="ui-table">
										<tr>
											<td>中文姓名</td>
											<td style="width: 320px;">
												冯xx
											</td>
											<td>英文姓名</td>
											<td style="width: 320px;">
												Hel Yan
											</td>
											<td rowspan="4" style="width: 130px;">
												<div>
													<img src="http://img.juimg.com/tuku/yulantu/121216/234733-12121621553935.jpg" alt="" style="width: 130px;height: 160px;">
												</div>
											</td>
										</tr>
										<tr>
											<td>性别</td>
											<td>
												男，F
											</td>
											<td>出生日期</td>
											<td>
												19901010
											</td>
										</tr>
										<tr>
											<td>毕业院校</td>
											<td>
												北京大学
											</td>
											<td>学历编号</td>
											<td>
												12311199k122
											</td>
										</tr>
										<tr>
											<td>身份证/护照</td>
											<td>
												2233998111244111123
											</td>
											<td>电子邮件</td>
											<td>
												lovs1887@sina.com
											</td>
										</tr>
										<tr>
											<td>联系电话</td>
											<td>
												13798721112
											</td>
											<td>居住地址</td>
											<td colspan="2">
												浙江省宁波市江北区幸福小区12幢19楼
											</td>
										</tr>
										<tr>
											<td>身份证复印件上传</td>
											<td colspan="4" class="color-6">
												<div>
													<a href="javascript:;">我的身份证复印件.JPG</a>
													<a href="javascript:;" class="margin-left-20">我的身份证复印件.JPG</a>
												</div>
											</td>
										</tr>
										<tr>
											<td>学历证书复印件上传</td>
											<td colspan="4" class="color-6">
												<div>
													<a href="javascript:;">学历证书.JPG</a>
												</div>
											</td>
										</tr>
										<tr>
											<td>学位证书复印件上传</td>
											<td colspan="4" class="color-6">
												<div>
													<a href="javascript:;">学位证书.JPG</a>
												</div>
											</td>
										</tr>
										<tr>
											<td>报名表上传</td>
											<td colspan="4" class="color-6">
												<div>
													<a href="javascript:;">报名表.DOC</a>
												</div>
											</td>
										</tr>
									</table>
								</div>
							</template>
						</template>
					</div>
				</div>
			</div>
		</div>

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

/**
 * 我的图标上传
 * */
window.ajaxFileUploadFn = function() {
  var path = $("#wtFile")[0];
  if (!verifyFileSuffix(path, "jpg,png")) {
    path.value = "";
  } else {
    //用到图片高级获取，如果不支持，还是需要后台验证一下。
    var imgFile = path.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = function(theFile) {
      var image = new Image();
      image.src = theFile.target.result;
      image.onload = function() {
        if (imgFile.size / 1000 > 1000) {
          alert("上传的图片必须小于1M");
          $("#wtFile").remove();
          $("body").append(
            '<input type="file" id="wtFile" name="file" onchange="ajaxFileUploadFn();" style="display: none;">'
          );
          return false;
        }

        $.ajaxFileUpload({
          url: "http://aci-api.chaozhiedu.com/api/file/upload",
          secureuri: false,
          fileElementId: "file",
          type: "post",
          dataType: "json",
          beforeSend: function(xhr) {
            var userToken = $.cookie("userToken");
            console.log(userToken, 1111111111111);
            if (userToken) {
              xhr.setRequestHeader("Token", userToken);
            }
          },
          success: function(data) {
            console.log(data);

            $("#wtFile").remove();
            $("body").append(
              '<input type="file" id="wtFile" name="file" onchange="ajaxFileUploadFn();" style="display: none;">'
            );
          },
          error: function(data, status, e) {
            console.log(data, status, e);
            //showAlert(e, 1070);
          }
        });
      };
    };
  }
  return false;
};

import { mapState } from "vuex";

export default {
  name: "Info",
  data() {
    return {
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
      // info: {
      //   user: {},
      //   ext_info: {},
      //   period: []
      // },

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
      ksType: [
        {
          value: "1",
          label: "2018年3月开课"
        },
        {
          value: "2",
          label: "2018年4月开课"
        },
        {
          value: "3",
          label: "2018年5月开课"
        },
        {
          value: "4",
          label: "2018年6月开课"
        }
      ],
      fileName: "file",
      uploadAction: "http://aci-api.chaozhiedu.com/api/file/upload"
      //cateList: [],
      // uploads: {
      //   idcard_front_file: "", //身份证前面照片
      //   idcard_reverse_file: "", //身份证背面照片
      //   edu_file: "", //学历证书照片
      //   degree_file: "", //学位证书照片
      //   entry_form_file: "", //报名表照片
      //   avatar_file: "" //头像
      // }
    };
  },
  computed: {
    ...mapState({
      info: state => state.userInfo
      //cateList: state => state.cateList
    })
  },
  watch: {
    info(val, old) {
      //console.log(val, "112312312");
			this.param = { ...this.param, ...val.ext_info, ...val.user };
			this.ksType = val.period.map((item)=>{
				return {
					value: item.id,
          label: item.name
				}
			});
    }
  },
  methods: {
    // changeSex(val) {
    //   console.log(val);
    //   this.param.sex = val;
    // },
    disabledDate(current) {
      return current && current.valueOf() >= Date.now();
    },
    // changeKs(val) {
    // 	console.log(val);
    // 	this.param.period = val;
    // },
    onChangeIdCardZm(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(info.file.name + " 上传成功.");
      } else if (info.file.status === "error") {
        console.log(info.file.name + " 上传失败.");
      }
    },
    triggerUpload(type) {
      console.log(type);
      document.getElementById("wtFile").click();
    },
    showConfirmForm() {
      var vm = this;
      vm.$modal.confirm({
        iconType: "exclamation-circle-o",
        title: "注意",
        content: "请确认您填写的资料是否正确\n" + "一经提交不能再修改",
        okText: "确认提交",
        cancelText: "返回修改资料",
        width: 600,
        onOk: function() {
          console.log("确认提交");

          //确认提交资料
          vm.$czapi.addUserInfo(vm.param).then(function(data) {
            console.log(data);
          });
        },
        onCancle: function() {
          console.log("返回修改资料");
        }
      });
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
      this.$czapi.addUserInfo(params).then(data => {
        console.log(data);
      });
    },
    onBeforeUpload(file, reqOptions) {
      //console.log(file, reqOptions);
      var userToken = $.cookie("userToken");
      let headers = {
          Token: userToken
        },
        formData = new FormData();

      formData.append("file", file);

      return fetch(this.uploadAction, {
        method: "POST",
        headers,
        body: formData
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          //console.log(data, file, reqOptions, 111);
          if (res.code == 200) {
            //console.log(reqOptions, this.$refs);
						this.param[reqOptions.filename] = res.data.url;
						this.param[reqOptions.filename.replace('_file','')] = res.data.id;
						console.log(this.param);
          }
        });

      return false;
    },
    doChangeFile(data) {
      //console.log(data, 2222222222);
    }
  },
  mounted() {
		this.param = { ...this.param, ...this.info.ext_info, ...this.info.user };
		this.ksType = this.info.period.map((item)=>{
				return {
					value: item.id,
          label: item.name
				}
			});
    // vm.$czapi
    //   .getUserInfo()
    //   .then(function(data) {
    //     vm.info = data;
    //   })
    //   .fail(function(data) {
    //     vm.info = data;
    //   });
    // 		setTimeout(()=>{
    // console.log(111,this.info);
    // 		},3000)

    /*var data = {
									"code": 201, //201 等待完善信息 202 审核未通过 203 审核中 200 审核通过
									"msg": "等待完善信息",
									"user": {
											"phone": "18243188033"//学员账号
									},
									"ext_info": {//用户之前保存的数据 服务端保存一周 格式同 user仅在用户未填写信息时显示
											"cn_name": "",//中文名
											"en_name": "",//英文名
											"sex": "F",//姓别 F 女 M 男
											"birthday": "2017-01-01", //出生日期
											"college": "大学", //毕业学校
											"edu_num": "10000000", //学历编号
											"idcard": "",//身份证,护照
											"email": "",
											"contacts_phone": "",//联系电话
											"addr": "人民大街",//居住地址
											"period": "1",//选择的课时ID
											"idcard_front": "1", //身份证 正面资源ID
											"idcard_reverse": "1", //身份证 反面资源ID
											"edu": "1", //学历复印件资源ID
											"degree": "1",//学位资源ID
											"entry_form": "1",//报名表资源ID
											"avatar": "1",//一寸照ID 下面为回显图片和资源的地址
											"idcard_front_file": "http:\/\/aci.zhj\/api\/file\/1",
											"idcard_reverse_file": "http:\/\/aci.zhj\/api\/file\/1",
											"edu_file": "http:\/\/aci.zhj\/api\/file\/1",
											"degree_file": "http:\/\/aci.zhj\/api\/file\/1",
											"entry_form_file": "http:\/\/aci.zhj\/api\/file\/1",
											"avatar_file": "http:\/\/aci.zhj\/api\/file\/1"
									},
									//课时
									"period": [
											{
													"id": 1,
													"name": "上午7点"
											}
									],
									//报表名示例
									"entry_form_example_url": "http:\/\/aci.zhj\/api\/file\/1"
							};

							this.info = data;*/

    //获取分类
  }
};
</script>

<style>

</style>