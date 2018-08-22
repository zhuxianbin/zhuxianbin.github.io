<template>
    <div class="container">
      <category class="mt-20 mb-20" :category.sync='category_id' @change='getTeachers'></category>
      <vue-waterfall-easy 
      v-if="rows.length>0"
      :imgsArr="rows" 
      :height="1600"
      src-key='photo'
      :imgWidth="220"
      @click="clickFn">
        <template slot-scope="scope">
          <div class="card shadow">
            <div class="card-body">
              <div>
                  {{scope.value.name}}
              </div>
              {{scope.value.desc}}
            </div>
          </div>
        </template>
      </vue-waterfall-easy>
    </div>
</template>

<script>
import { getTeacherList } from "@/api";
import category from "./components/category";
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  name: "teacher",
  components: {
    vueWaterfallEasy,
    category
  },
  data() {
    return {
      rows: [],
      category_id: ''
    };
  },
  created() {
    this.getTeachers();
  },
  methods: {
    getTeachers() {
      getTeacherList({
        category_id: this.category_id
      }).then(({ data }) => {
        this.rows = data;
      });
      // this.rows = [
      //   {
      //     name: "郭聪荣",
      //     desc:
      //       "心理学硕士，心理专家。北京中医药大学心理讲师，共青团心理辅导员培训与督导师",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/e1.png"
      //   },
      //   {
      //     name: "王海燕",
      //     desc: "心理学硕士，心理治疗师，北大医院心理医生",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/e2.png"
      //   },
      //   {
      //     name: "郑海英",
      //     desc:
      //       "硕士研究生，国家二级心理咨询师，华北理工大学心理学院教师，华北理工大学附属医院心理科心理咨询师",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/e3.png"
      //   },
      //   {
      //     name: "树心",
      //     desc: "心理学硕士，国内实力派咨询专家，二级心理咨询师",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/e4.png"
      //   },
      //   {
      //     name: "果果",
      //     desc: "心理学硕士，心理治疗师",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/e5.png"
      //   },
      //   {
      //     name: "李丛蔚",
      //     desc:
      //       "985消防名校矿业大学博士，某国企工程项目负责人； 国家注册一级消防师、国家注册一二级建造师、中国消防协会会员，是最早进入消防培训的著名讲师之一，长期主讲消防、一二建、工程管理等建筑类课程。",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/h1.png"
      //   },
      //   {
      //     name: "彭伟",
      //     desc:
      //       "博士，副教授，硕士生导师。安徽理工大学能源与安全学院安全工程系副主任。 2003年毕业于中国科学技术大学，获安全工程专业工学学士与电子工程与信息科学理学学士（双学士）；2008年获工学博士学位。 《安徽省人民政府办公厅关于构建“六项机制”强化安全生产风险管控的实施意见》主要起草人之一",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/h2.png"
      //   },
      //   {
      //     name: "焦工",
      //     desc:
      //       "曾任北京银孚国际网校消防综合能力直播主讲老师，西安李建教育消防技术实务面授，北京百加百教育消防工程师签约讲师，北京帮考网网校消防技术实务直播主讲老师等，授课经验丰富，学员好评度高；",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/h3.png"
      //   },
      //   {
      //     name: "安慕萍",
      //     desc:
      //       "于1989 年北京工业大学（211大学） 热能工程系毕业。20多年大型会议、展览及大型群众活动消防安全讲师、培训活动等负责人，曾入选会展业全国个人十佳。教学经验丰富，深受学生好评。",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/h4.png"
      //   },
      //   {
      //     name: "马国刚",
      //     desc:
      //       "资深讲师，曾在嗨学网、中业教育任消防工程师专业讲师，授课语言通俗易懂，总结性强、重点突出，贴近考试。 针对学员难点提供支持；乐于与学员互动，深受广大学员喜欢。愿与大家携手前行，共创辉煌。",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/h5.png"
      //   },
      //   {
      //     name: "房孟",
      //     desc:
      //       "985院校硕士研究生，主要研究方向为地方政府改革与治理，承担《政府经济学》、《行政管理学》等专业核心课程的任教。 以互动式讲课为主，授课风格条理清晰、课堂气氛轻松，具有热情与活力和一定的感染力。",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/1.png"
      //   },
      //   {
      //     name: "杨佩姿",
      //     desc:
      //       "文学爱好者，211高校本科学历，具有高中语文教师资格证，立志于为人师表，传道授业解惑。 授课生动活泼，讲课深入浅出，通俗易懂，深受学生喜爱。 “路漫漫其修远兮，吾将上下而求索”愿与学生共同努力，携手进步。",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/2.png"
      //   },
      //   {
      //     name: "梅笳华",
      //     desc:
      //       "毕业于211大学汉语言文学专业，资深讲师，专攻于汉语言文学，文学作品爱好者，授课经验丰富，上课风趣，知识简单明了，讲授清晰易懂，思想清晰明了，讲课深入浅出，课堂深入浅出，带领同学们一起欣赏文学作品。 理想的路总是为有信心的人预备着。。",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/3.png"
      //   },
      //   {
      //     name: "王依蕾",
      //     desc:
      //       "资深讲师，毕业于中国人民大学管理学专业。授课语言通俗易懂，总结性强、授课经验丰富。专业知识强悍。条理清晰、富有激情，较强的亲和力和感染力。",
      //     src: "https://www.chaozhiedu.com/static/images/teachers/4.png"
      //   }
      // ];
    },
    clickFn(item) {
      console.log(item);
    }
  }
};
</script>

<style lang="less">
.vue-waterfall-easy-scroll {
  overflow-y: auto !important;
}
</style>

