<template>
    <div class="index">
        <div class="ant-layout">
            <div class="ant-layout ant-layout-has-sider">
                
                <div class="ant-layout ant-layout-chaozhi">
                    <div class="ant-layout-content" style="padding: 0;">
                        <div class="color-6" style="padding: 25px 25px 0 25px;">
                            <div class="inline-block">
                                <template v-if="info.code !== 200">
                                    <svg class="icon inline-block" aria-hidden="true" style="width: 80px;height: 80px;">
                                        <use xlink:href="#icon-touxiang1"></use>
                                    </svg>
                                </template>
                                <template v-if="info.code === 200">
                                    <img :src="info.ext_info.avatar_file"
                                         alt="" style="width: 80px;height: 80px;border-radius: 100%;">
                                </template>
                            </div>
                            <div class="inline-block margin-left-10">
                                <div>学员账号：{{info.user.phone}}</div>
                                <div class="margin-top-15">欢迎您来到超职ACI课程培训中心</div>
                            </div>
                        </div>
                        <hr>
                        <div class="color-6" style="padding: 0 25px 25px 25px;">
                            <p>亲爱的学员：</p>
                            <p v-if='info.orders'>
                                您已经购买了超职教育的在线课程，赶紧去学习吧。
                            </p>
                            <div v-else>
                                <p style="margin-left: 28px;">您还未参考网校的ACI注册国际心理咨询师课程培训，请先缴费学习课程，再进行报名。</p>
                                <p style="margin-left: 28px;">职业培训教育网为您提供ACI注册国际心理咨询师培训考试一站式服务。</p>
                            </div>
                            <p v-if='info.orders' class="margin-top-20" style="margin-left: 28px;">
                                <el-button @click='$router.push("/courselist")' type="ghost" size="large" style="font-size: 18px;">赶紧去学习>></el-button>
                            </p>
                            <p v-else class="margin-top-20" style="margin-left: 28px;">
                                <el-button @click='$router.push("/male")' type="ghost" size="large" style="font-size: 18px;">点击购买课程>></el-button>
                            </p>
                        </div>
                        <hr>
                        <div class="color-6" style="padding: 0 25px 25px 25px;">
                            <p>亲爱的学员：</p>
                            <p style="margin-left: 28px;">您已参考网校的ACI注册国际心理咨询师课程培训，可以进行报名。</p>
                            <p style="margin-left: 28px;">职业培训教育网为您提供ACI注册国际心理咨询师培训考试一站式服务。</p>
                            <p class="margin-top-20" style="margin-left: 28px;">
                                <el-button @click='$router.push("/info")' type="ghost" size="large" style="font-size: 18px;">点击报考资料>></el-button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Index",
  data() {
    return {
      //   info: {
      //     user: {},
      //     ext_info: {},
      //     period: []
      //   },
      //cateList: []
    };
  },
  computed: {
    ...mapState({
      info: state => state.userInfo
      //cateList: state => state.cateList
    })
  },
  mounted() {
    var vm = this;
  }
};
</script>

<style>

</style>
