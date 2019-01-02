<template>
  <div>
    <el-form :model="formTy" :inline="true">
      <el-form-item label="策略名称：">
        <el-input v-model="formTy.name" placeholder="策略名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属公司：">
        <el-cascader
          :options="company.arr"
          :props="{value: 'companyId', label: 'label'}"
          v-model="selectedOptionYs"
          filterable
          :show-all-levels="false"
          clearable
          change-on-select
          @change="changeCompany">
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitTy">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTableY"
      :data="tableData3"
      tooltip-effect="dark"
      :row-key="tableRowKey"
      border
      style="width: 100%"
      @select="handleSelectionChangeY">
      <el-table-column
        type="selection"
        :reserve-selection="true"
        width="55">
      </el-table-column>
      <el-table-column label="策略名称" prop="name">
      </el-table-column>
      <el-table-column label="基础价格" prop="basePrice">
      </el-table-column>
      <el-table-column label="所属公司" prop="companyName">
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
import { couponsShowStrategyList } from "@/api/coupon";

export default {
  props: ["strategyArr", "companyIds"],
  data() {
    return {
      formTy: {
        couponsId: "",
        companies: "",
        name: "",
        pageSize: 10,
        pageCurrent: 1
      },
      selectedOptionYs: [],
      multipleSelect: [],
      tableData3: [],
      pagination: {
        total: 0,
        sizes: [100, 50, 20, 10]
      }
    }
  },
  mounted () {
    this.multipleSelect = this.strategyArr;
    this.formTy.companies = this.companyIds;
    this.getList();
  },
  methods: {
    // 选择城市的结果
    changeCompany(val) {
      this.formTy.companies = val[val.length - 1];
    },
    // 获取数据
    getList() {
      if (!this.formTy.companies) {
        this.formTy.companies = this.companyIds;
      }
      couponsShowStrategyList(this.formDataFun(this.formTy)).then(res => {
        this.pagination.total = res.totalCount;
        this.tableData3 = res.list;
        const ids = [];
          if (this.multipleSelect.length > 0) {
            this.multipleSelect.forEach(ele => {
              ids.push(ele.strategyId);
            })
          }

         if (this.tableData3.length > 0) {
            this.tableData3.forEach(ele => {
                if (ids.includes(ele.strategyId)) {
                  ele.selected = 1;
                }
               if (ele.selected === 1) {
                 this.$refs.multipleTableY.toggleRowSelection(ele, true);
               } else {
                 this.$refs.multipleTableY.toggleRowSelection(ele, false);
               }
            });
          }
      });
    },
    // 点击查询的效果
    submitTy() {
      this.formTy.pageCurrent = 1;
      this.getList();
    },
    // 给每行赋key值
    tableRowKey(row) {
      return row.strategyId;
    },
    // 选择每页显示多少条
    handleSizeChange(val) {
      this.formTy.pageSize = val;
      this.getList();
    },
    // 选择页数的
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
          return ele.strategyId === r.strategyId;
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
        hash[next.strategyId] ? '' : hash[next.strategyId] = true && item.push(next);
        return item
      }, []);
      this.$emit("strategy", newArr);
    }
  }
}
</script>

<style>

</style>


