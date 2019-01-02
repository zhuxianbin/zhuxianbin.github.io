<template>
  <div>
    <!--表单-->
    <el-form :model="digForm" label-width="100px">
      <el-form-item label="当前状态">
        <span>{{partnerObj.status == '1' ? '被禁用' : '有效'}}</span>
      </el-form-item>
      <el-form-item label="解禁原因" v-if="partnerObj.status == '1'">
        <el-select v-model="digForm.disableReason">
          <el-option label="刷单已惩罚" value="1"></el-option>
          <el-option label="违约已完结" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="禁用原因" v-else>
        <el-select v-model="digForm.enableReason">
          <el-option label="刷单行为" value="0"></el-option>
          <el-option label="本人支持违约" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="4" v-model="digForm.remark"></el-input>
      </el-form-item> 
      <el-form-item >
        <el-button type="primary" :disabled="canTJ" @click="referFun">提交</el-button>
      </el-form-item>  
    </el-form>
    <!--操作记录-->
    <div class="tm-tag">
      <span></span>
      <span>操作记录</span>
      <div style="clear:both"></div>
    </div>
    <!--表格显示数据-->
    <el-table :data="tdata" border style="margin-top: 20px;">
      <el-table-column label="时间" prop="operationDate">
        <template slot-scope="scope">
          <span>{{scope.row.operationDate|time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" prop="operationName"></el-table-column>
      <el-table-column label="操作" prop="type">
        <template slot-scope="scope">
          <span>{{scope.row.type == '0' ? '解除禁用' : '禁用合伙人'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作原因" prop="enableReason">
        <template slot-scope="scope">
          <span v-if="scope.row.type == '0'">{{scope.row.disableReason == '1' ? '刷单已惩罚' : '违约已完结'}}</span>
          <span v-else>{{scope.row.enableReason == '0' ? '刷单行为' : '本人支持违约'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" prop="remark"></el-table-column>
    </el-table>
    <div class="block" align="center">
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="formTest1.start"
        :page-sizes="pagination1.sizes"
        :page-size="formTest1.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination1.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { disablePartnerInfo, enablePartnerInfo, getPartnerInfoChangeLogList } from "@/api/partnerList";
export default {
  props: ['partnerObj'],
  data () {
    return {
      tdata: [],
      digForm: {
        partnerId: '',
        type: '0',
        enableReason: '', // 解禁
        disableReason: '', // 禁用
        remark: ''
      },
      formTest1: {
        start: 1,
        pageSize: 10,
        partnerId: '',
        type: ''
      },
      pagination1: { // 分页
        total: 0,
        sizes: [100, 50, 20, 10]
      }
    }
  },
  computed: {
    canTJ() {
      if (this.partnerObj.status === '0') {
        if (this.digForm.enableReason === '') {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.digForm.disableReason === '') {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  mounted () {
    this.getPCL()
  },
  methods: {
    // 点击提交的功能
    referFun() {
      if (this.partnerObj.status === '1') {
        // 解除
        const o = {
          partnerId: this.partnerObj.id,
          type: '0',
          disableReason: this.digForm.disableReason,
          remark: this.digForm.remark
        }
        enablePartnerInfo(o).then(res => {
          console.log('解除成功');
          this.$emit('relClose');
        }).catch(err => {
          this.$message.error(err);
        });
      } else {
        // 禁用
        const o = {
          partnerId: this.partnerObj.id,
          type: '1',
          enableReason: this.digForm.enableReason,
          remark: this.digForm.remark
        }
        disablePartnerInfo(o).then(res => {
          console.log('禁用成功');
          this.$emit('relClose');
        }).catch(err => {
          this.$message.error(err);
        })
      }
    },
    // 查询禁用记录列表
    getPCL() {
      const o = {
        partnerId: this.partnerObj.id,
        type: '0'
      }
      this.formTest1 = Object.assign({}, this.formTest1, o);
      getPartnerInfoChangeLogList(this.formTest1).then(res => {
        this.pagination1.total = res.total;
        this.tdata = res.list;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    // 每页多少条
    handleSizeChange1(val) {
      this.formTest1.pageSize = val;
      this.getPCL();
    },
    // 当前第几页
    handleCurrentChange1(val) {
      this.formTest1.start = val;
      this.getPCL();
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
  margin-top: 5px;
  float: left;
}
.tm-tag :nth-child(2) {
  float: left;
  font-size: 15px;
  margin-left: 13px;
  font-weight: 600;
}
</style>

