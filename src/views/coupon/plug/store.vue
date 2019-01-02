<template>
  <div>
    <el-form
      :model="formTy"
      :inline="true"
    >
      <el-form-item label="门店名称：">
        <el-input
          v-model="formTy.companyName"
          placeholder="门店名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="所属区域：">
        <el-cascader
          :options="company.areasInfo"
          v-model="selectedOptionYs"
          filterable
          :props="{value: 'areaCode', label: 'name'}"
          :show-all-levels="false"
          clearable
          change-on-select
          @change="changeCity"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitTy"
        >查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTableY"
      :data="tableData3"
      tooltip-effect="dark"
      :row-key="tableRowKey"
      border
      style="width: 100%"
      @select="handleSelectionChangeY"
    >
      <el-table-column
        type="selection"
        :reserve-selection="true"
        width="55"
      >
      </el-table-column>
      <el-table-column
        label="门店名称"
        prop="companyName"
      >
      </el-table-column>
      <el-table-column
        label="所属地区"
        prop="address"
      >
      </el-table-column>
      <el-table-column
        label="业务范围"
        prop="businessType"
      >
      </el-table-column>
    </el-table>
    <!--分页-->
    <div
      class="block"
      align="center"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formTy.pageCurrent"
        :page-sizes="pagination.sizes"
        :page-size="formTy.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
    <!--尾部-->
    <div
      align="center"
      style="margin-top: 26px;"
    >
      <el-button @click="cancelFun">取 消</el-button>
      <el-button
        type="primary"
        @click="determineFun"
      >确 定</el-button>
    </div>
  </div>
</template>

<script>
import { couponsShowCompanyList } from "@/api/coupon";

export default {
  props: ["storeArr"],
  data() {
    return {
      formTy: {
        pageCurrent: 1,
        pageSize: 10,
        couponsId: "",
        companyName: "",
        city: ""
      },
      pagination: {
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      multipleSelect: [],
      selectedOptionYs: [],
      tableData3: []
    };
  },
  mounted() {
    this.multipleSelect = this.storeArr;
    this.getList();
  },
  methods: {
    // 选择城市后的效果
    changeCity(val) {
      this.formTy.city = val[val.length - 1];
    },

    // 整体反写的代码
    checked() {
        if (this.multipleSelect) {
          this.multipleSelect.forEach(ele => {
             this.$refs.multipleTableY.toggleRowSelection(ele, true);
          })
        }
    },
    // 获取数据的方法
    getList() {
      return new Promise((resolve, reject) => {
        couponsShowCompanyList(this.formDataFun(this.formTy)).then(res => {
          this.pagination.total = res.totalCount;
          this.tableData3 = res.list;

          const ids = [];
          if (this.multipleSelect.length > 0) {
            this.multipleSelect.forEach(ele => {
              ids.push(ele.companyId);
            })
          }

          if (this.tableData3.length > 0) {
            this.tableData3.forEach(ele => {
                if (ids.includes(ele.companyId)) {
                  ele.selected = 1;
                }
               if (ele.selected === 1) {
                 this.$refs.multipleTableY.toggleRowSelection(ele, true);
               } else {
                 this.$refs.multipleTableY.toggleRowSelection(ele, false);
               }
            })
          }
          resolve();
        });
      });
    },
    // 点击查询的效果
    submitTy() {
      this.formTy.pageCurrent = 1;
      this.getList();
    },
    // 给每行赋key值
    tableRowKey(row) {
      return row.companyId;
    },
    // 改变当前页多少条的效果
    handleSizeChange(val) {
      this.formTy.pageSize = val;
      this.getList();
    },
    // 获取第几页
    handleCurrentChange(val) {
      this.formTy.pageCurrent = val;
      this.getList();
    },
    // 当选择项发生变化时会触发该事件 加入到缓存中
    handleSelectionChangeY(s, r) {
      if (r.selected === 0) {
        r.selected = 1;
        this.multipleSelect.push(r);
        this.$refs.multipleTableY.toggleRowSelection(r, true);
      } else {
        r.selected = 0;
        const index = this.multipleSelect.findIndex(ele => {
          return ele.companyId === r.companyId;
        });
        this.multipleSelect.splice(index, 1);
        this.$refs.multipleTableY.toggleRowSelection(r, false);
      }
    },
    // 点击取消的按钮
    cancelFun() {
      this.$emit("close");
    },
    // 点击确认
    determineFun() {
      // 去掉数组重复的
      const hash = {};
      const newArr = this.multipleSelect.reduceRight((item, next) => {
        hash[next.companyId] ? '' : hash[next.companyId] = true && item.push(next);
        return item
      }, []);
      this.$emit("store", newArr);
    }
  }
};
</script>

<style>
</style>


