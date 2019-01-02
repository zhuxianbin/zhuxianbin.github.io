<template>
  <div v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
    <!--暂无数据-->
    <div v-if="!hasData" align="center">
      <p>暂无数据</p>
    </div>
    <div v-else v-for="(item, index) in logList" class="hs-d" :key="item.id" :style="index !== 0 ? 'margin-top: 40px' : ''">
      <el-row>
        <el-col :span="2">
          <el-tag>{{item.maintainPeriodName}}</el-tag>
        </el-col>
        <el-col :span="5">
          <el-col :span="9">
            <span class="hs">保养车辆</span>
          </el-col>
          <el-col :span="14">
            <el-input placeholder="" v-model="item.carNo" disabled></el-input>
          </el-col>
        </el-col>
        <el-col :span="5">
          <el-col :span="9">
            <span class="hs">车辆类型</span>
          </el-col>
          <el-col :span="14">
            <el-input placeholder="" v-model="item.carTypeName" disabled></el-input>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="14">
            <span class="hs">实际维护里程(KM)</span>
          </el-col>
          <el-col :span="9">
            <el-input v-model="item.maintainMileage" placeholder="实际维护里程(KM)" maxlength="15" clearable onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" @blur="fixedFun(item, 'maintainMileage')"></el-input>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="8">
            <span class="hs">配件费用</span>
          </el-col>
          <el-col :span="14">
            <el-input v-model="item.partsFee" placeholder="配件费用" clearable maxlength="15" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" @blur="fixedFun(item, 'partsFee')"></el-input>
          </el-col>
        </el-col>
        <el-col :span="5" style="margin-top: 12px;">
          <el-col :span="9">
            <span class="hs">工时费用</span>
          </el-col>
          <el-col :span="14">
            <el-input v-model="item.timeFee" placeholder="工时费用" clearable maxlength="15" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" @blur="fixedFun(item, 'timeFee')"></el-input>
          </el-col>
        </el-col>
        <el-col :span="5" style="margin-top: 12px;">
          <el-col :span="9">
            <span class="hs">费用合计</span>
          </el-col>
          <el-col :span="14">
            <el-input :value="summyFun(item.partsFee, item.timeFee, item.feeTotal)" placeholder="费用合计" disabled clearable onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"></el-input>
          </el-col>
        </el-col>
        <el-col :span="4" style="margin-top: 12px;">
          <el-col :span="8">
            <span class="hs">办理人</span>
          </el-col>
          <el-col :span="15">
            <el-tooltip class="item" effect="dark" :content="item.operatorName" placement="top-start">
              <el-input disabled :value="cutString(item.operatorName, 8)" placeholder=""></el-input>
            </el-tooltip>
          </el-col>
        </el-col>
        <el-col :span="5" style="margin-top: 12px;">
          <el-col :span="9">
            <span class="hs">维护项目</span>
          </el-col>
          <el-col :span="15">
            <el-select v-model="item.itemCode" placeholder="维护项目" clearable>
              <el-option v-for="item in projects" :key="item.id" :label="item.cnName" :value="item.code">
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="6" style="margin-top: 12px;">
          <el-col :span="8">
            <span class="hs">保养日期</span>
          </el-col>
          <el-col :span="15">
            <el-date-picker v-model="item.maintainTime" type="date" clearable value-format="timestamp" placeholder="保养日期">
            </el-date-picker>
          </el-col>
        </el-col>
        <el-col :span="5" :offset="3" style="margin-top: 12px;">
          <el-button type="warning" @click="updateData(item)" v-if="partner.permission.authority['HHR_MAINTAIN_MONITOR'].includes('HHR_UPDATE_VEHICLE_MAINTAIN_RECORD')">编辑</el-button>
          <template v-if="partner.permission.authority['HHR_MAINTAIN_MONITOR'].includes('HHR_DELETE_VEHICLE_MAINTAIN_RECORD')">
            <el-button type="danger" v-if="index == logList.length -1" @click="deleData(item, index)">删除</el-button>
          </template>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getMaintainRecordListById,
  getMaintainItemList,
  deleteVehicleMaintainRecord,
  updateVehicleMaintainRecord
} from "@/api/tending";
export default {
  props: ["dataRow"],
  data() {
    return {
      hasData: false,
      logList: [],
      projects: [],
      loading: true
    };
  },
  mounted() {
    this.getMaintainItemList().then(
      this.getMaintainRecordListById().then(() => {
        this.loading = false;
      })
    );
  },
  methods: {
    // 计算合计的方法
    summyFun(t1, t2, t3) {
      t3 = t1 * 1 + t2 * 1;
      if (t3 === 0) {
        t3 = "0.00";
      } else {
        t3 = (t3 * 1).toFixed(2);
      }
      return t3;
    },
    // 获取历史数据
    getMaintainRecordListById() {
      return new Promise((resolve, reject) => {
        getMaintainRecordListById({ carNo: this.dataRow.carNo })
          .then(res => {
            this.logList = res;
            if (res.length > 0) {
              this.logList.forEach(ele => {
                ele.maintainMileage =
                  ele.maintainMileage === 0
                    ? "0.00"
                    : (ele.maintainMileage * 1).toFixed(2);
                ele.partsFee =
                  ele.partsFee === 0 ? "0.00" : (ele.partsFee * 1).toFixed(2);
                ele.timeFee =
                  ele.timeFee === 0 ? "0.00" : (ele.timeFee * 1).toFixed(2);
              });
              this.hasData = true;
            }
            resolve(2);
          })
          .catch(err => {
            reject(err);
            console.log(err);
          });
      });
    },
    // 获取维护
    getMaintainItemList() {
      return new Promise((resolve, reject) => {
        getMaintainItemList()
          .then(res => {
            this.projects = res;
            resolve(1);
          })
          .catch(err => {
            reject(err);
            console.log(err);
          });
      });
    },
    // 删除功能
    deleData(row, i) {
      this.$confirm("确定要删除" + row.maintainPeriodName + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteVehicleMaintainRecord({ id: row.id }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.logList.splice(i, 1);
            if (this.logList.length === 0) {
              this.hasData = false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑功能
    updateData(row) {
      const obj = {
        id: row.id,
        maintainTime: this.time(row.maintainTime, "YYYY-MM-DD"),
        maintainMileage: row.maintainMileage,
        partsFee: row.partsFee,
        timeFee: row.timeFee,
        feeTotal: row.feeTotal,
        itemCode: row.itemCode
      };
      this.$confirm("确定要修改" + row.maintainPeriodName + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          updateVehicleMaintainRecord(obj).then(res => {
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
            this.getMaintainRecordListById();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 数据保留2位小数
    fixedFun(ele, str) {
      if (str === "maintainMileage") {
        ele.maintainMileage = (parseFloat(ele.maintainMileage) * 1).toFixed(2);
        if (isNaN(ele.maintainMileage)) {
          ele.maintainMileage = "0.00";
        }
      } else if (str === "partsFee") {
        ele.partsFee = (parseFloat(ele.partsFee) * 1).toFixed(2);
        if (isNaN(ele.maintainMileage)) {
          ele.maintainMileage = "0.00";
        }
      } else if (str === "timeFee") {
        ele.timeFee = (parseFloat(ele.timeFee) * 1).toFixed(2);
        if (isNaN(ele.timeFee)) {
          ele.timeFee = "0.00";
        }
      }
    }
  }
};
</script>

<style>
.hs-d {
  padding-top: 5px;
  border-top: 1px solid #ccc;
}
.hs {
  line-height: 30px;
}
</style>

