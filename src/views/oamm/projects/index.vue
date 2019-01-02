<template>
  <div class="app-container">
    <div class="panel-container">
      <div class="filter-container">
        <el-form :inline="true" :model="params" label-width="100px">
          <el-form-item label="收费项目">
            <el-input v-model="params.name" clearable placeholder="收费项目"></el-input>
          </el-form-item>
          <el-form-item label="收费子项目">
            <el-input v-model="params.name" clearable placeholder="收费子项目"></el-input>
          </el-form-item>

          <el-form-item label="车型">
            <el-select v-model="params.state" clearable placeholder="支付状态">
              <el-option label="全部" value></el-option>
              <el-option label="未认证" value="0"></el-option>
              <el-option label="已认证" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="params.state" clearable placeholder="支付状态">
              <el-option label="全部" value></el-option>
              <el-option label="未认证" value="0"></el-option>
              <el-option label="已认证" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="filter-buttons">
          <el-button type="primary" size="medium" @click="onSubmit">查询</el-button>
        </div>
      </div>
      <div class="option-container">
        <el-button type="primary" @click="onAddOrEdit">添加</el-button>
      </div>
      <div>
        <el-table>
          <el-table-column label="收费项目"></el-table-column>
          <el-table-column label="收费子项目"></el-table-column>
          <el-table-column label="收费金额(元)"></el-table-column>
          <el-table-column label="车型"></el-table-column>
          <el-table-column label="是否启用"></el-table-column>
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
