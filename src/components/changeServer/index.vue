<template>
  <el-dialog append-to-body title="开发者工具" :visible.sync="show">
    <el-form label-width="100px">
    <el-row>
      <el-col :span="24">
        <el-form-item label="切换服务器">
          <el-input v-model='servers.value'></el-input>
        </el-form-item>
        <el-form-item label="切换服务器">
          <el-select v-model="servers.value" placeholder="请选择服务器">
            <el-option
              v-for="item in servers.rows"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="">
          <el-button type="primary" @click="doSubmit">保 存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { servers, BASE_API, setServer } from "@/config";
export default {
  data() {
    return {
      show: false,
      servers: {
        value: BASE_API,
        rows: servers
      }
    };
  },
  methods: {
    doSubmit() {
      setServer(this.servers.value);
      window.location.reload();
    }
  },
  created() {
    document.onkeyup = event => {
      if (event.altKey && event.keyCode === 81) {
        this.show = !this.show;
      }
    };
  }
};
</script>

<style>
</style>
