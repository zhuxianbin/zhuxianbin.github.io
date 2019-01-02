<template>
  <div class="app-container">
    <div class="panel-container">
      <el-form :inline="true" :model="params" class="filter-container" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="params.name" clearable placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="params.phoneNo" clearable placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="params.name" clearable placeholder="操作人"></el-input>
        </el-form-item>
        <el-form-item label="收费项目">
          <el-input v-model="params.name" clearable placeholder="收费项目"></el-input>
        </el-form-item>
        <el-form-item label="收费子项目">
          <el-input v-model="params.name" clearable placeholder="收费子项目"></el-input>
        </el-form-item>

        <el-form-item label="交易门店">
          <el-cascader
            :options="company.areasInfo"
            v-model="selectedOptions1"
            filterable
            :props="{value: 'name', label: 'name'}"
            :show-all-levels="false"
            clearable
            change-on-select
            @change="changeCity"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-select v-model="params.state" clearable placeholder="支付状态">
            <el-option label="全部" value></el-option>
            <el-option label="未认证" value="0"></el-option>
            <el-option label="已认证" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="操作时间">
          <el-date-picker
            v-model="timeValues"
            type="daterange"
            range-separator="至"
            clearable
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="option-container">
        <el-button type="primary" @click="onAddOrEdit">添加</el-button>
      </div>
      <div>
        <el-table>
          <el-table-column label="会员姓名"></el-table-column>
          <el-table-column label="收费项目"></el-table-column>
          <el-table-column label="收费子项目"></el-table-column>
          <el-table-column label="收费金额"></el-table-column>
          <el-table-column label="操作人"></el-table-column>
          <el-table-column label="操作时间"></el-table-column>
          <el-table-column label="是否开票"></el-table-column>
          <el-table-column label="交易门店"></el-table-column>
          <el-table-column label="支付状态"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="dialog.show" :title="dialog.title">
      <component :is="dialog.is"></component>
    </el-dialog>
  </div>
</template>

<script>
import addOrEdit from "./_add-or-edit";
export default {
  components: {
    addOrEdit
  },
  data() {
    return {
      params: {},
      dialog: {
        is: "addOrEdit",
        title: "收费选择",
        show: false
      }
    };
  },
  methods: {
    onSubmit() {},
    onAddOrEdit() {
      this.dialog.show = true;
    }
  }
};
</script>

<style>
</style>
