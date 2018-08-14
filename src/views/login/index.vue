<template>
    <div class="login">
        <div class="container">
            <div class="login-container" style="margin-top: 40px;">
                <div class="text-center">
                    <img src="static/images/logo-3.png" alt="" style="width: 300px;">
                </div>
                <div class="text-center" style="margin: 20px 0;font-size: 26px;">
                    登录您的账号
                </div>

                <div style="width: 360px;margin: 0 auto;">
                    <el-form direction="horizontal" label-width="labelCol" :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-form-item label="" prop="phoneNumber">
                          <el-input @keyup.native.enter="$refs.pwd.focus()" placeholder="注册的手机号码" v-model="ruleForm.phoneNumber">
                          </el-input>
                        </el-form-item>
                        <el-form-item label="" prop="password">
                          <el-input ref="pwd" @keyup.native.enter="submitForm" type="password" placeholder="请输入密码" v-model="ruleForm.password">
                          </el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-row :gutter="10">
                            <el-col :span="10">
                              <el-button
                              @click="$router.push('./register')" style="width:100%" size="medium">注 册</el-button>
                            </el-col>
                            <el-col :span="14">
                              <el-button type="primary" :loading="isLoading"
                              @click="submitForm" style="width:100%" size="medium">登录超职</el-button>
                            </el-col>
                          </el-row>
                        </el-form-item>

                        <!-- <el-form-item>
                          <div class="text-center">
                            <a href="/default.html">
                              <i class="iconfont icon-return"></i>
                              <span style="margin-left: 5px;">返回</span>
                            </a>
                          </div>
                        </el-form-item> -->
                    </el-form>
                    <div class="text-center">
                      <el-button @click="$router.push('./forget')" type="text">如果您没有设置过密码，请点击这里设置&gt;&gt;</el-button>
                    </div>
                    <div class="text-center mb-20">
                      <el-button @click="$router.push('./forget')" type="text">忘记密码，怎么办？&gt;&gt;</el-button>
                    </div>
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
  return /^(\d{11})$/.test(num);
};

var validatePhoneNumber = function(rule, value, callback) {
  if (isMobileNum(value)) {
    callback();
  } else {
    callback(new Error("请确认您输入的手机号是否正确"));
  }
};

import { mapActions } from "vuex";
import { setToken } from "@/utils/auth";

export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      ruleForm: {
        phoneNumber: "",
        password: ""
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
        password: [
          {
            required: true,
            minlength: 6,
            message: "请确认您输入的密码是否正确"
          }
        ]
      },
      visible: false
    };
  },
  methods: {
    
    ...mapActions("user", {
      login: "login"
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
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //alert('提交了!');
          this.isLoading = true;
          this.login({
            phone: this.ruleForm.phoneNumber,
            password: this.ruleForm.password
          })
            .then(data => {
              if (data.code != 200) {
                this.isLoading = false;
                this.$message.error(data.msg);
                return false;
              }

              setToken(data.token);

              
              //登录成功跳转页面（三种用法）
              //this.$router.push({ name: "Index" });
              this.$router.push("/index");
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
