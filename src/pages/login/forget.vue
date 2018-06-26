<template>
    <div class="login">
        <div class="container">
            <div class="login-container" style="margin-top: 40px;">
                <div class="text-center">
                    <img src="static/images/logo-3.png" alt="" style="width: 300px;">
                </div>
                <div class="text-center" style="margin: 20px 0;font-size: 26px;">
                    找回您的账号
                </div>

                <div style="width: 360px;margin: 0 auto;">
                    <el-form direction="horizontal" label-width="labelCol" :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-form-item label="" prop="phoneNumber">
                          <el-input placeholder="注册的手机号码" v-model="ruleForm.phoneNumber">
                          </el-input>
                        </el-form-item>
                        <el-form-item label="" prop="qcode">
                            <div class="inline-block text-center" style="width: 55%;">
                              <el-input placeholder="短信验证码" v-model="ruleForm.qcode">
                              </el-input>
                            </div>
                            <div class="inline-block text-center" style="width: 43%;">
                              <a href="javascript:;" class="link" @click="getQcode">{{qcodeText}}</a>
                            </div>
                        </el-form-item>
                        <el-form-item label="" prop="password">
                          <el-input placeholder="请输入密码" v-model="ruleForm.password">
                          </el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-row :gutter="10">
                            <el-col :span="10">
                              <el-button :loading="isLoading"
                              @click="$router.back()" style="width:100%" size="medium">返 回</el-button>
                            </el-col>
                            <el-col :span="14">
                              <el-button type="primary" :loading="isLoading"
                              @click="submitForm('ruleForm')" style="width:100%" size="medium">修改密码</el-button>
                            </el-col>
                          </el-row>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div class="text-center">
                <!-- 超职时代（北京）教育科技有限公司  -->
                超职时代（北京）教育科技有限公司 版权所有 
                <!-- 京ICP备17033346号 -->
            </div>
        </div>
    </div>
</template>

<script>
var isMobileNum = function(num) {
  return /^(1[3-8]\d{9})$/.test(num);
};

var isLoginQcode = function(n) {
  return /^\d{4}$/.test(n);
};

var validatePhoneNumber = function(rule, value, callback) {
  if (isMobileNum(value)) {
    callback();
  } else {
    callback(new Error("请确认您输入的手机号是否正确"));
  }
};

var validateQcode = function(rule, value, callback) {
  if (isLoginQcode(value)) {
    callback();
  } else {
    callback(new Error("请确认您输入的验证码是否正确"));
  }
};

import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      ruleForm: {
        phoneNumber: "",
        password: "",
        qcode: ""
      },
      rules: {
        phoneNumber: [
          {
            required: true,
            message: "请确认您输入的手机号是否正确"
          },
          {
            validator: validatePhoneNumber
          }
        ],
        qcode: [
          {
            required: true,
            message: "请确认您输入的验证码是否正确"
          },
          {
            validator: validateQcode
          }
        ],
        password: [
          {
            required: true,
            minlength: 6,
            message: "请确认您输入的密码是否正确"
          }
        ]
      },
      visible: false,
      qcodeText: "获取验证码",
      //是否在60秒内已经发送过获取验证码
      isSend: false
    };
  },
  methods: {
    ...mapActions({
      getUserInfo: "USER_INFO",
      getCateList: "CATE_LIST"
    }),

    //获取验证码
    getQcode: function() {
      var vm = this;
      //console.log(vm.isSend);
      if (!vm.isSend) {
        vm.isSend = true;

        //获取验证码需要校验手机号码是否填写
        this.$refs.ruleForm.validateField("phoneNumber", a => {
          if (a === "") {
            vm.$czapi
              .getPhoneCaptcha({
                phone: vm.ruleForm.phoneNumber
              })
              .then(data => {
                if (data.code != 200) {
                  return this.$message.error(data.msg);
                }

                vm.isSend = true;
                var count = data.interval,
                  timer = null;
                vm.qcodeText = count + "秒后再次获取验证码";
                timer = setInterval(function() {
                  count--;
                  if (count > 0) {
                    vm.qcodeText = count + "秒后再次获取验证码";
                  } else {
                    vm.isSend = false;
                    vm.qcodeText = "获取验证码";
                    clearInterval(timer);
                  }
                }, 1000);
              })
              .fail(function() {
                vm.isSend = false;
              });
          } else {
            vm.isSend = false;
          }
        });
      }
    },
    submitForm(formName) {
      //console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert('提交了!');
          this.isLoading = true;
          this.$czapi
            .doLogin({
              phone: this.ruleForm.phoneNumber,
              captcha: this.ruleForm.qcode
            })
            .then(data => {
              if (data.code != 200) {
                this.isLoading = false;
                this.$message.error(data.msg);
                return false;
              }

              //var expiresDate = new Date(data.expired);
              //在cookie中写用户token信息
              // $.cookie("userToken", data.token, {
              //   path: "/", //cookie的作用域
              //   expires: expiresDate
              // });
              //data里有token
              this.$storage.set("userToken", data);

              this.getUserInfo();
              this.getCateList();

              //登录成功跳转页面（三种用法）
              //this.$router.push({ name: "Index" });
              this.$router.back();
              // 字符串
              //vm.$router.push('/home/first')

              // 对象
              //vm.$router.push({ path: '/home/first' })

              // 命名的路由
              //vm.$router.push({ name: 'home', params: { userId: wise }})
            })
            .catch(() => {
              this.isLoading = false;
            });

          setTimeout(() => {
            this.isLoading = false;
          }, 20000);
        } else {
          return false;
        }
      });
    }
  }
};
</script>
