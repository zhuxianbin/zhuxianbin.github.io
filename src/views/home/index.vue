<template>
    <div>
        <div class="banner">
            <!-- Slider main container -->
            <div id="banner" class="swiper-container" style="height:460px">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img class="img-r" src="http://news.chaozhiedu.com/img/banner.png">
                    </div>
                    <div class="swiper-slide">
                        <img class="img-r" src="http://news.chaozhiedu.com/img/banner1.jpg">
                    </div>
                    <div class="swiper-slide">
                        <img class="img-r" src="http://news.chaozhiedu.com/img/banner-xl.png">
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <!-- <el-carousel height="460px">
                <el-carousel-item>
                    <img class="img-r" src="http://news.chaozhiedu.com/img/banner.png">
                </el-carousel-item>
                <el-carousel-item>
                    <img class="img-r" src="http://news.chaozhiedu.com/img/banner1.jpg">
                </el-carousel-item>
                <el-carousel-item>
                    <img class="img-r" src="http://news.chaozhiedu.com/img/banner-xl.png">
                </el-carousel-item>
            </el-carousel> -->
        </div>
        <div class="floor floor-1">
            <div class="container">
                <div class="clearfix floor-hd mb-20">
                    <div class="pull-left">
                        <span class='t-20 t-orange'>畅销好课</span>
                    </div>
                    <div class="pull-right">
                        <a class="t-gray">MORE</a>
                    </div>
                </div>
                <el-row :gutter="15">
                    <el-col :span="6" v-for="item in 4" :key="item">
                        <a class="card shadow">
                            <img class="card-media" src="https://img3.mukewang.com/szimg/5b165c2b0001e24a05400300.jpg">
                            <div class="card-body">
                                <div class="t-ellipsis">注册消防工程师VIP火箭班注册消防工程师VIP火箭班</div>
                                <div>2932</div>
                                <div class="t-22 t-right t-orange">￥6980</div>
                            </div>
                        </a>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="floor floor-2">
            <div class="container">
                <div class="clearfix floor-hd mb-20">
                    <div class="pull-left">
                        <span class='t-20 t-purple'>学历教育</span>
                    </div>
                    <div class="pull-right">
                        <a class="t-gray">MORE</a>
                    </div>
                </div>
                <el-row :gutter="10">
                    <el-col :span="5">
                        <div class="floor-2-slide">
                            <a>
                                <div class="mb-25">
                                    <img src="https://img3.mukewang.com/583e9afa000166c410240770-100-100.jpg">
                                </div>
                                <div class="mb-30">
                                    <div class="t-20 mb-10">
                                        自考-学前教育专科
                                    </div>
                                    <div class="t-light">
                                        经典取证班
                                    </div>
                                </div>
                                <div>
                                    <span class="t-30">￥4980</span>
                                </div>
                            </a>
                        </div>
                    </el-col>
                    <el-col :span="19">
                        <el-row :gutter="10">
                            <el-col :span="6" v-for="item in 8" :key="item">
                                <a class="card mb-20 shadow">
                                    <img class="card-media" src="https://img3.mukewang.com/szimg/5b165c2b0001e24a05400300.jpg">
                                    <div class="card-body mb-10">
                                        <div class="t-ellipsis mb-10">注册消防工程师VIP火箭班注册消防工程师VIP火箭班</div>
                                        <div class="clearfix">
                                            <div class="pull-left">2932</div>
                                            <div class="pull-right t-orange">￥6980</div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </a>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="floor floor-3">
            <div class="container">
                <div class="clearfix floor-hd mb-20">
                    <span class='t-20 t-green'>精彩评价</span>
                </div>
                <div style="padding:0 100px;">
                    <!-- Swiper -->
                    <div id="comment" class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in 20" :key="'comment'+item">
                                <div class="comment">
                                    <div class="comment-contant mb-20">
                                        <div class="comment-contant-text">
                                            <span>
                                                非常棒，课程非常适合新手使用，初级后再买高级的。
                                                非常棒，课程非常适合新手使用，初级后再买高级的。
                                                非常棒，课程非常适合新手使用，初级后再买高级的。
                                                非常棒，课程非常适合新手使用，初级后再买高级的。
                                                非常棒，课程非常适合新手使用，初级后再买高级的。
                                            </span>
                                        </div>
                                    </div>
                                    <div class="t-center">
                                        <div class="comment-avatar mb-10"><img src="https://img3.mukewang.com/583e9afa000166c410240770-100-100.jpg"></div>
                                        <div>学员邪我</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="floor floor-4">
            <div class="container">
                <div class="t-center floor-hd mb-20">
                    <span class="floor-title-line"></span>
                    <span class="t-24 t-black">精 英 名 师</span>
                    <span class="floor-title-line"></span>
                </div>
                <div>
                    <!-- Swiper -->
                    <div id="teacher" class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in 20" :key="'comment'+item">
                                <div class="card">
                                    <img class="card-media" src="https://img.mukewang.com/5a5d55de00015cba05120512.jpg">
                                    <div class="card-body">
                                        <div class="t-ellipsis t-center">欧雅老师</div>
                                        <div class="t-12 t-gray">硕士研究生，国家二级心理咨询师，华北理工大学心理学院教师，华北理工大学附属医院心理科心理咨询师。硕士研究生，国家二级心理咨询师，华北理工大学心理学院教师，华北理工大学附属医院心理科心理咨询师。</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="floor floor-5">
            <div class="container">
                <div class="clearfix floor-hd mb-20">
                   <span class='t-20 t-blue'>超职资讯</span>
                </div>
                <el-row :gutter="30">
                    <el-col :span="8">
                        <div class="card shadow card-padd">
                            <div class="card-title">
                                <span class="t-18">资讯标题一</span>
                            </div>
                            <div class="card-media">
                                <img src="https://img3.mukewang.com/szimg/5b165c2b0001e24a05400300.jpg">
                            </div>
                            <div class="card-body">
                                <div class="t-12 t-gray">硕士研究生，国家二级心理咨询师，华北理工大学心理学院教师，华北理工大学附属医院心理科心理咨询师。硕士研究生，国家二级心理咨询师，华北理工大学心理学院教师，华北理工大学附属医院心理科心理咨询师。</div>
                            </div>
                            <div class="card-more"></div>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="news">
                            <div class="news-list">
                                <a class="news-item" v-for="item in 4" :key="'news'+item">
                                    <div class="news-title">资讯标题一</div>
                                    <div class="news-desc">您好，这里是全国心理咨询师报名审核平台，2018年考试变革新政策已颁布，输入您的“学历+手机号码”，系统会自动审核并发送改革后的报考条件、报考时间和相关政策。</div>
                                    <div class="news-more">MORE</div>
                                </a>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
const swipers = {
  banner: {},
  comment: {},
  teacher: {}
};
export default {
  data() {
    return {};
  },
  mounted() {
    this.setBanner();
    this.setComment();
    this.setTeacher();
  },
  methods: {
    setBanner() {
      swipers.banner = new Swiper("#banner.swiper-container", {
        loop: true,
        autoplay: {
          delay: 3820,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      });
    },
    setComment() {
      swipers.comment = new Swiper("#comment.swiper-container", {
        loop: true,
        autoplay: {
          delay: 3820,
          disableOnInteraction: false
        },
        slidesPerView: 5,
        spaceBetween: 30
      });
    },
    setTeacher() {
      swipers.teacher = new Swiper("#teacher.swiper-container", {
        loop: true,
        autoplay: {
          delay: 3820,
          disableOnInteraction: false
        },
        slidesPerView: 5,
        spaceBetween: 30
      });
    }
  },
  destroyed() {
    swipers.banner.destroy();
    swipers.comment.destroy();
    swipers.teacher.destroy();
  }
};
</script>

<style lang="less">
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
