<template>
  <div class="app-container">
    <!--上级-->
    <div class="tm-tag">
      <span></span>
      <span>TA的上级</span>
      <div style="clear:both"></div>
    </div>

    <el-table :data="list1" border style="margin-top: 20px;">
      <el-table-column label="级别" prop="levelName"></el-table-column>
      <el-table-column label="合伙人姓名" prop="sName"></el-table-column>
      <el-table-column label="手机号" prop="phoneNo"></el-table-column>
      <el-table-column label="身份证号" prop="idCode"></el-table-column>
      <el-table-column label="邀请识别码" prop="invitationCode"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">有效</span>
          <span v-else>被禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="结对时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册城市">
        <template slot-scope="scope">
          <span>{{gainCompanyName(scope.row.registerCompanyId)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--下级-->
    <div class="tm-tag" style="margin-top: 35px;">
      <span></span>
      <span>TA的下级（一级：{{partner.details.pCount ? partner.details.pCount : 0}}人，二级：{{partner.details.gpCount ? partner.details.gpCount : 0}}人）</span>
      <div style="clear:both"></div>
    </div>

    <el-form :inline="true" style="margin-top: 20px">
      <!-- <el-form-item label="所属公司">
        <el-cascader
          :options="company.arr"
          v-model="selectedOptions"
          filterable
          :show-all-levels="false"
          clearable
          change-on-select
          @change="changeCompany">
        </el-cascader>
      </el-form-item> -->
      <el-form-item label="级别">
        <el-select v-model="formTest2.level" clearable placeholder="级别">
          <el-option label="全部" value=""></el-option>
          <el-option label="一级" value="1"></el-option>
          <el-option label="二级" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="formTest2.phoneNo" placeholder="手机号码" clearable></el-input>
      </el-form-item>
      <el-form-item label="粉丝姓名">
        <el-input v-model="formTest2.name" placeholder="粉丝姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formTest2.status" clearable placeholder="状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="有效" value="0"></el-option>
          <el-option label="被禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="formTest2.type" clearable placeholder="身份">
          <el-option label="全部" value=""></el-option>
          <el-option label="合伙人" value="1"></el-option>
          <el-option label="普通会员" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeList2">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list2" border style="margin-top: 20px;">
      <el-table-column label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.pId == partner.details.subId">一级</span>
          <span v-else-if="scope.row.gpId == partner.details.subId">二级</span>
        </template>
      </el-table-column>
      <el-table-column label="粉丝姓名" prop="sName"></el-table-column>
      <el-table-column label="手机号" prop="phoneNo"></el-table-column>
      <el-table-column label="身份证号" prop="idCode"></el-table-column>
      <el-table-column label="邀请识别码" prop="invitationCode"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">有效</span>
          <span v-else>被禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="结对时间" prop="createTime">
        <template slot-scope="scope">
          <span>{{scope.row.createTime|time}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="注册公司">
        <template slot-scope="scope">
          <span>{{gainCompanyName(scope.row.registerCompanyId)}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="身份" prop="type">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">合伙人</span>
          <span v-else>普通会员</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" align="center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formTest2.start"
        :page-sizes="pagination.sizes"
        :page-size="formTest2.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getTeamPartnerInfos, getGrandparentPartnerInfos } from "@/api/details";
export default {
  data() {
    return {
      list1: [],
      list2: [],
      selectedOptions: [],
      formTest1: {
        subId: ''
      },
      formTest2: {
        start: 1,
        pageSize: 10,
        sn: '',
        phoneNo: '',
        idCode: '',
        name: '',
        type: '',
        subId: '',
        level: ''
      },
      pagination: { // 分页
        total: 0,
        sizes: [100, 50, 20, 10]
      }
    }
  },
  created () {
    this.getList1();
    this.getList2();
  },
  methods: {
    // 获取团队管理上级的列表
    getList1() {
      this.formTest1.subId = this.partner.details.subId;
      // this.formTest1.subId = 'fae6a36f5f674f198d638efd51485295'
      getGrandparentPartnerInfos(this.formTest1).then(res => {
        if (res.parentPartnerInfo) {
          res.parentPartnerInfo.levelName = '一级';
           this.list1.push(res.parentPartnerInfo);
        }
        if (res.grandparentPartnerInfo) {
          res.grandparentPartnerInfo.levelName = '二级';
          this.list1.push(res.grandparentPartnerInfo);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    },
    // 查询公司的依据
    changeCompany(val) {
      this.formTest2.sn = val[val.length - 1];
    },
    // 判断是否获取传来的参数
    getPartner() {
      if (this.$route.query.part) {
        this.partObj = this.$route.query.part;
      }
    },
    // 获取下级列表
    getList2() {
      this.formTest2.subId = this.partner.details.subId;
      getTeamPartnerInfos(this.formTest2).then(res => {
        this.pagination.total = res.total;
        this.list2 = res.list;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    // 查询
    changeList2() {
      this.formTest2.start = 1;
      this.getList2();
    },
    // 每页多少条
    handleSizeChange(val) {
      this.formTest2.pageSize = val;
      this.getList2();
    },
    // 当前第几页
    handleCurrentChange(val) {
      this.formTest2.start = val;
      this.getList2();
    }
  }
}
</script>

<style>
.tm-tag span {
  display: inline-block;
}
.tm-tag :nth-child(1) {
  height: 14px;
  width: 3px;
  background: #797979;
  margin-top: 3px;
  float: left;
}
.tm-tag :nth-child(2) {
  float: left;
  font-size: 15px;
  margin-left: 13px;
  font-weight: 600;
}
</style>

