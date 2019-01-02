<template>
  <div class="verContainer">
    <el-form :model="verbalForm" label-width="100px">
      <el-form-item label="合伙人介绍">
        <el-input type="textarea" rows="6" v-model="verbalForm.partnerNotes" placeholder="长相年轻有为，充满朝气，体型魁梧，肌肉发达，爱好运动"></el-input>
      </el-form-item>
      <el-form-item label="金币规则">
        <el-input type="textarea" rows="6" v-model="verbalForm.goldNotes" placeholder="发帖：+10金币，每天最多奖励10金币"></el-input>
      </el-form-item>
      <el-form-item label="邀请小贴士">
        <el-input type="textarea" rows="6" v-model="verbalForm.inviteNotes" placeholder="多年前的明天，我来到了这美好的人间，从此开始感受着亲情的温暖，友情的宝贵，爱情的美味。呵呵，我亲爱的朋友，明天我办生日聚会，盼望你的到来，不见不散，不醉不归哦！"></el-input>
      </el-form-item>
      <el-form-item label="金币常见问题">
        <el-input type="textarea" rows="6" v-model="verbalForm.questionNotes" placeholder="当中 H1, H2, H3, H4 是在重的一端的金币； L1, L2, L3, L4 是在轻的一端的金币；而 R1, R2, R3, R4 就是余下的真金币。在这情形下，有两个可能性：假的金币较重而且是 H1, H2, H3, H4 的其中一个；或者假的金币较轻而且是 L1, L2, L3, L4 的其中一个"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitArt">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { artwordsSettingGetDetail, artwordsSettingUpdate } from "@/api/marketing";
export default {
  data() {
    return {
      verbalForm: {
        partnerNotes: '',
        goldNotes: '',
        inviteNotes: '',
        questionNotes: ''
      }
    }
  },
  mounted () {
    this.artwordsSettingGetDetail()
  },
  methods: {
    artwordsSettingGetDetail() {
      artwordsSettingGetDetail().then(res => {
        this.verbalForm = {...res}
      })
    },
    submitArt() {
      const obj = {
        id: this.verbalForm.id,
        inviteNotes: this.verbalForm.inviteNotes.replace(/(\r\n)|(\n)/g, "</br>"),
        goldNotes: this.verbalForm.goldNotes.replace(/(\r\n)|(\n)/g, "</br>"),
        questionNotes: this.verbalForm.questionNotes.replace(/(\r\n)|(\n)/g, "</br>"),
        partnerNotes: this.verbalForm.partnerNotes.replace(/(\r\n)|(\n)/g, "</br>")
      }
      artwordsSettingUpdate(obj).then(res => {
         this.$message({
           message: '修改成功',
           type: 'success'
          });
      })
    }
  }
}
</script>

<style>
  .verContainer {
    width: 560px;
  }
</style>

