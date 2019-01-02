<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="passwd">
        <el-col :span="16">
          <el-input type="password" v-model="ruleForm2.passwd" auto-complete="off" @keyup.native="capslockonoff($event)" @blur="capClose"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="newPasswd">
        <el-col :span="16">
          <el-input type="password" v-model="ruleForm2.newPasswd" auto-complete="off" @keyup.native="capslockonoff($event)" @blur="capClose"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-col :span="16">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" @keyup.native="capslockonoff($event)" @blur="capClose"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" :loading="load9">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import { modifyPassword } from '@/api/login.js'
require('@/utils/capslock.js')
export default {
  data () {
    const checkPasswd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原密码不能为空'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          const re = /^[A-Za-z0-9]+$/
          if (!re.test(value) || value.length < 6 || value.length > 20) {
            callback(new Error('支持长度6~20位字符，英文和数字'));
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.newPasswd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      ruleForm2: {
          newPasswd: '',
          checkPass: '',
          passwd: ''
      },
      rules2: {
          newPasswd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          passwd: [
            { validator: checkPasswd, trigger: 'blur' }
          ]
      },
      load9: false
    }
  },
  mounted () {

  },
   methods: {
     /**
      * 提交的按钮
      */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.load9 = true
             modifyPassword(this.ruleForm2).then(() => {
              this.load9 = false
              this.$emit('pClose')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /**
       * 重置的按钮
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
   }
}
</script>

<style>
  .v-modal {
    background: transparent;
  }
</style>


