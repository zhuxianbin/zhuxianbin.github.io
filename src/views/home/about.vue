<template>
  <div>
    <div class='about-banner'>
      <div class='container'>
        <div class="t-center t-white mb-30">
          <div class="t-24 mb-10">关于超职</div>
          <div class='t-12'>ABOUT US</div>
        </div>
        <div class='t-black'>
          <p>
            超职教育是由超职时代（北京）教育科技有限公司所打造的综合性在线教育平台，多年来主要来以提供快乐、高效、超职的课程体验为服务宗旨，课程推出至今，高质量与好口碑是我们的核心发展前提，在课程建设方面，我们不断完善，加强环节把控，严密针对学员自身条件推出不同课型，有效提升学员短期内的成长进度，加强与学员的情感联系，努力为学员提供售前售后的极致体验。
          </p>
          <p>
            师资体系均出自于国内知名机构及专家，在实践与理论的基础上经验颇为丰富。
          </p>
          <p>
            超职网集职业教育类、财会类、学历教育类、建筑工程类、教师资格证类等多领域五大体系课程于一体，“精益求精”是超职的核心理念，在职业教育类和学历教育类已取得了高于行业内平均通过率的骄人成绩，在财会类、学历教育类、建筑工程类、教师资格证类获得了行业内的认可和学员的一致好评，但我们不止于此，未来，超职将为更多的追梦人，提供多元化、专业化、人性化的教学课程体系。
          </p>
        </div>
      </div>
    </div>
    <div class='container'>
      <div class='about-services'>
        <div class='about-service-item about-service-1'>
          <div class="t-20 t-black t-center mb-20">互动教学</div>
          <p class="t-12 t-gray t-h-30">专业团队匠心打造的优质课程内容,精心设计的教学环节省时高效！</p>
        </div>
        <div class='about-service-item about-service-2'>
          <div class="t-20 t-black t-center mb-20">智能题库</div>
          <p class="t-12 t-gray t-h-30">个性化智能匹配学习效果,巩固知识点,强化记忆。</p>
        </div>
        <div class='about-service-item about-service-3'>
          <div class="t-20 t-black t-center mb-20">社交服务</div>
          <p class="t-12 t-gray t-h-30">贴心的班主任、助教团队全天候贴心答疑，解决各类学习问题。</p>
        </div>
        <div class='about-service-item about-service-4'>
          <div class="t-20 t-black t-center mb-20">互动小组</div>
          <p class="t-12 t-gray t-h-30">同窗好友一起聊天学习，共同督促，共同成长。</p>
        </div>
      </div>
    </div>
    <div class='container'>
      <div class='t-center t-30 mb-30'>超职网校六大优势</div>
      <el-row>
        <el-col v-for='(item,index) in youshi' :key='item' :span="8">
          <div class='youshi' >
            <div class="youshi-media"><img :src="`/static/images/v2/about/icon-${index+1}.png`"></div>
            <div class='youshi-title'>{{item}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      youshi: [
        "金牌名师助阵",
        "一站式报考服务",
        "名师私教直播",
        "教室题库赠送",
        "高含金量题库",
        "社群免费答疑"
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.about-banner {
  padding: 40px 0 50px;
  background: url("/static/images/v2/bg_samll.jpg") no-repeat center;
  p {
    text-indent: 2em;
    line-height: 20px;
  }
}
.about-services {
  padding: 80px 70px;
  overflow: hidden;
  .about-service-item {
    position: relative;
    background: #fff;
    border-radius: 5px;
    margin: 0 25px;
    float: left;
    width: 200px;
    height: 400px;
    box-sizing: border-box;
    padding: 60px 20px;
    opacity: 0.8;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
    &::before {
      position: absolute;
      top: -50px;
      display: block;
      left: 50%;
      margin-left: -50px;
      content: "";
      width: 100px;
      height: 100px;
    }
  }
  .about-service-1 {
    background: #fff url("/static/images/v2/about/1.png") no-repeat center
      bottom;
    &::before {
      background: url("/static/images/v2/about/no.1.png") no-repeat center;
    }
  }
  .about-service-2 {
    background: #fff url("/static/images/v2/about/2.png") no-repeat center
      bottom;
    &::before {
      background: url("/static/images/v2/about/no.2.png") no-repeat center;
    }
  }
  .about-service-3 {
    background: #fff url("/static/images/v2/about/3.png") no-repeat center
      bottom;
    &::before {
      background: url("/static/images/v2/about/no.3.png") no-repeat center;
    }
  }
  .about-service-4 {
    background: #fff url("/static/images/v2/about/4.png") no-repeat center
      bottom;
    &::before {
      background: url("/static/images/v2/about/no.4.png") no-repeat center;
    }
  }
}

.youshi {
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
  transition: all 0.3s;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }

  .youshi-media {
    display: block;
    margin: 0 auto;
    width: 200px;
    height: 200px;
    border-radius: 200px;
    background: #fff;
    box-shadow: 0 5px 12px 0 rgba(217, 226, 233, 0.5);
    margin-bottom: 20px;
    padding: 25px 0;
    box-sizing: border-box;
    img {
      display: inline-block;
      margin: 0 auto;
    }
  }
}
</style>

