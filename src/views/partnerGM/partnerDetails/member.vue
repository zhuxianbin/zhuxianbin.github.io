<template>
  <div class="app-container">
    <!--会员基本信息-->
    <div class="tag-title1">
      <span>会员基本信息</span>
      <span></span>
    </div>

    <div class="m-form">
      <el-form :inline="true" label-width="120px">
        <el-form-item label="会员ID">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
      </el-form>
    </div>
   
    <div class="m-form" style="margin-top: 0px;">
      <el-form :inline="true" label-width="120px">
        <el-form-item label="会员姓名">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
        <el-form-item label="推荐人">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="m-form" style="margin-top: 0px;">
      <el-form :inline="true" label-width="120px">
        <el-form-item label="会员号">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
        <el-form-item label="会员卡号">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="m-form" style="margin-top: 0px;">
      <el-form :inline="true" label-width="120px">
        <el-form-item label="会员卡状态">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="m-form" style="margin-top: 0px;">
      <el-form :inline="true" label-width="120px">
         <el-form-item label="身份证号">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="m-form" style="margin-top: 0px;">
      <el-form :inline="true" label-width="120px">
         <el-form-item label="审核状态">
          <el-input disabled style="width: 173px;"></el-input>
          <el-input disabled style="width: 173px;"></el-input>
        </el-form-item>
        <el-form-item label="审核时间">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!--会员认证征信信息-->
    <div class="tag-title2">
      <span>会员认证征信信息</span>
      <span></span>
    </div>
    <div  class="m-form">
    <el-form :inline="true">
      <el-form-item>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538463729&di=4692ba447b559df08c6894da530b99ae&imgtype=jpg&er=1&src=http%3A%2F%2Fn.sinaimg.cn%2F97973%2Ftransform%2F20170111%2FEF1H-fxzkfuh6914807.jpg"/>
      </el-form-item>
      <el-form-item>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538463729&di=4692ba447b559df08c6894da530b99ae&imgtype=jpg&er=1&src=http%3A%2F%2Fn.sinaimg.cn%2F97973%2Ftransform%2F20170111%2FEF1H-fxzkfuh6914807.jpg"/>
      </el-form-item>
      <el-form-item>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538463729&di=4692ba447b559df08c6894da530b99ae&imgtype=jpg&er=1&src=http%3A%2F%2Fn.sinaimg.cn%2F97973%2Ftransform%2F20170111%2FEF1H-fxzkfuh6914807.jpg"/>
      </el-form-item>
      <el-form-item>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538463729&di=4692ba447b559df08c6894da530b99ae&imgtype=jpg&er=1&src=http%3A%2F%2Fn.sinaimg.cn%2F97973%2Ftransform%2F20170111%2FEF1H-fxzkfuh6914807.jpg"/>
      </el-form-item>
    </el-form>
    </div>

    <div class="m-form" style="margin-top: 0px;">
      <el-form :inline="true" label-width="120px">
         <el-form-item label="综合评分">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
        <el-form-item label="芝麻信用">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="m-form" style="margin-top: 0px;">
      <el-form :inline="true" label-width="120px">
         <el-form-item label="信用卡">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="m-form" style="margin-top: 0px;">
      <el-form :inline="true" label-width="120px">
         <el-form-item label="征信状态">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
        <el-form-item label="用车限制">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="m-form" style="margin-top: 0px;">
      <el-form :inline="true" label-width="120px">
         <el-form-item label="锁定状态">
          <el-input disabled style="width: 350px;"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="m-form" style="margin-top: 0px;padding-left: 118px;">
      <el-button type="primary">查看更多个人信用报告</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInObj: {}
    }
  }
}
</script>

<style>
.m-form {
  clear: both;
  width: 100%;
  margin-top: 30px;
}
</style>

