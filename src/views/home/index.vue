<template>
    <div>
        <div class="banner">
            <el-carousel height="460px">
                <el-carousel-item>
                    <img class="img-r" src="http://news.chaozhiedu.com/img/banner.png">
                </el-carousel-item>
                <el-carousel-item>
                    <img class="img-r" src="http://news.chaozhiedu.com/img/banner1.jpg">
                </el-carousel-item>
                <el-carousel-item>
                    <img class="img-r" src="http://news.chaozhiedu.com/img/banner-xl.png">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="floor floor-1">
            <div class="container">
                <div class="clearfix">
                    <div class="pull-left">
                        畅销好课
                    </div>
                    <div class="pull-right">
                        <a>MORE</a>
                    </div>
                </div>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <a class="card">
                            <img class="card-media" src="https://img3.mukewang.com/szimg/5b165c2b0001e24a05400300.jpg">
                            <div class="card-body">
                                <div class="t-ellipsis">注册消防工程师VIP火箭班注册消防工程师VIP火箭班</div>
                                <div>2932</div>
                                <div class="t-22 t-right t-orange">￥6980</div>
                            </div>
                        </a>
                    </el-col>
                    <el-col :span="6">
                        <a class="card">
                            <img class="card-media" src="https://img.mukewang.com/5b62ccfd0001ba4406000338-240-135.jpg">
                            <div class="card-body">
                                <div class="t-ellipsis">注册消防工程师VIP火箭班注册消防工程师VIP火箭班</div>
                                <div>2932</div>
                                <div class="t-22 t-right t-orange">￥6980</div>
                            </div>
                        </a>
                    </el-col>
                    <el-col :span="6">
                        <a class="card">
                            <img class="card-media" src="https://img2.mukewang.com/5b1e0cfc0001ef7b06000338-240-135.jpg">
                            <div class="card-body">
                                <div class="t-ellipsis">注册消防工程师VIP火箭班注册消防工程师VIP火箭班</div>
                                <div>2932</div>
                                <div class="t-22 t-right t-orange">￥6980</div>
                            </div>
                        </a>
                    </el-col>
                    <el-col :span="6">
                        <a class="card">
                            <img class="card-media" src="https://img2.mukewang.com/szimg/5b6910d30001adad05400300.jpg">
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
    </div>
</template>

<script>
export default {
  data() {
    return {};
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
