<template>
  <div class="app-container">
     <!--form表单-->
    <el-form :inline="true" :model="formTestS" class="demo-form-inline">
      <el-form-item label="分享时间">
        <el-date-picker
          v-model="timeValue"
          type="daterange"
          range-separator="至"
          clearable
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="分享类别">
        <el-select v-model="formTestS.shareType" clearable placeholder="分享类别">
          <el-option label="任务" value="1"></el-option>
          <el-option label="邀请" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分享渠道">
        <el-select v-model="formTestS.shareObj" clearable placeholder="分享渠道">
          <el-option label="好友" value="1"></el-option>
          <el-option label="朋友圈" value="2"></el-option>
          <el-option label="qq好友" value="3"></el-option>
          <el-option label="qq空间" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="获得奖励">
        <el-select v-model="formTestS.bonusIsNull" clearable placeholder="获得奖励">
          <el-option label="有金币" value="0"></el-option>
          <el-option label="无金币" value="1"></el-option>
        </el-select>
     </el-form-item>
     <el-form-item>
      <el-button type="primary" @click="onSubmitS">查询</el-button>
     </el-form-item>
    </el-form>

    <!--表格列表-->
    <el-table :data="listS" border style="margin-top: 20px;">
      <el-table-column label="分享时间" prop="createTime">
        <template slot-scope="scope">
          <span>{{scope.row.createTime|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分享类别" prop="shareType">
        <template slot-scope="scope">
          <span v-if="scope.row.shareType == 1">任务</span>
          <span v-else-if="scope.row.shareType == 2">邀请</span>
        </template>
      </el-table-column>
      <el-table-column label="分享内容" prop="shareContent">
      </el-table-column>
      <el-table-column label="分享渠道" prop="shareObj">
        <template slot-scope="scope">
          <span v-if="scope.row.shareObj == 1">好友</span>
          <span v-else-if="scope.row.shareObj == 2">朋友圈</span>
          <span v-else-if="scope.row.shareObj == 3">qq好友</span>
          <span v-else-if="scope.row.shareObj == 4">qq空间</span>
        </template>
      </el-table-column>
      <el-table-column label="获得奖励" prop="info"></el-table-column>
    </el-table>

    <div class="block" align="center">
      <el-pagination
        @size-change="handleSizeChangeS"
        @current-change="handleCurrentChangeS"
        :current-page="formTestS.start"
        :page-sizes="paginationS.sizes"
        :page-size="formTestS.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationS.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getShareInfos } from "@/api/details";
export default {
  data() {
    return {
      formTestS: {
        start: 1,
        pageSize: 10,
        shareType: '',
        shareContent: '',
        shareObj: '',
        startTime: '',
        endTime: '',
        bonusIsNull: '',
        subId: ''
      },
      timeValue: [],
      listS: [],
      paginationS: {
        total: 0,
        sizes: [100, 50, 20, 10]
      }
    }
  },
  mounted () {
    this.getDataS()
  },
  methods: {
    // 查询功能
    onSubmitS() {
      this.formTestS.start = 1;
      this.getDataS();
    },
    // 获取数据个功能
    getDataS() {
      if (this.timeValue && this.timeValue.length > 0) {
        this.formTestS.startTime = this.timeValue[0];
        this.formTestS.endTime = this.timeValue[1];
      } else {
        this.formTestS.startTime = '';
        this.formTestS.endTime = '';
      }
      this.formTestS.subId = this.partner.details.subId;
      getShareInfos(this.formTestS).then(res => {
        this.paginationS.total = res.total;
        this.listS = res.list;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    // 每页多少条
    handleSizeChangeS(val) {
      this.formTestS.pageSize = val;
      this.getDataS();
    },
    // 当前第几页
    handleCurrentChangeS(val) {
      this.formTestS.start = val;
      this.getDataS();
    }
  }
}
</script>

<style>
</style>

