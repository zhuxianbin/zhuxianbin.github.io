<template>
  <div>
    <el-form :model="formTy" :inline="true">
      <el-form-item label="车辆型号：">
        <el-input v-model="formTy.name" placeholder="车辆型号" clearable></el-input>
      </el-form-item>
      <el-form-item label="车辆品牌：">
        <el-select v-model="formTy.brand" clearable>
          <el-option 
          v-for="item in options"
          :key="item.id"
          :label="item.cnName"
          :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择公司：">
        <el-cascader
          :options="company.arr"
          v-model="selectedOptionYs"
          :props="{value: 'companyId', label: 'label'}"
          filterable
          :show-all-levels="false"
          clearable
          change-on-select
          @change="changeCompanYy">
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
      <el-table-column label="车型" prop="brand">
      </el-table-column>
      <el-table-column label="车辆品牌" prop="name">
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
import { couponsShowCarModelList, couponsShowCarBrandList } from "@/api/coupon";
export default {
  props: ["companyIds", "modelBusinessType", "modelArr"],
  data() {
    return {
      formTy: {
        couponsId: "",
        businessConfig: "",
        companies: "",
        name: "",
        brand: "",
        pageSize: 10,
        pageCurrent: 1
      },
      selectedOptionYs: [],
      tableData3: [],
      pagination: {
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      options: [],
      multipleSelect: []
    }
  },
  mounted () {
    this.multipleSelect = this.modelArr;
    this.formTy.companies = this.companyIds;
    this.formTy.businessConfig = this.getBusinessType(this.modelBusinessType).toString();
    this.couponsShowCarBrandList().then(() => {
      this.getList();
    });
  },
  methods: {
    // 选择公司
    changeCompanYy(val) {
      this.formTy.companies = val[val.length - 1];
    },
    // 给每行赋key值
    tableRowKey(row) {
      return row.id;
    },
    // 获取数据
    getList() {
      if (!this.formTy.companies) {
        this.formTy.companies = this.companyIds;
      }
      couponsShowCarModelList(this.formDataFun(this.formTy)).then(res => {
        this.pagination.total = res.totalCount;
        this.tableData3 = res.list;
        const ids = [];
          if (this.multipleSelect.length > 0) {
            this.multipleSelect.forEach(ele => {
              ids.push(ele.id);
            })
          }

         if (this.tableData3.length > 0) {
            this.tableData3.forEach(ele => {
                if (ids.includes(ele.id)) {
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
    // 获取车辆品牌的列表
    couponsShowCarBrandList() {
      return new Promise((resolve, reject) => {
        couponsShowCarBrandList().then(res => {
          this.options = res;
          resolve();
        })
      });
    },
    // 查询的结果
    submitTy() {
      this.formTy.pageCurrent = 1;
      this.getList();
    },
    // 分页选择每页多少条
    handleSizeChange(val) {
      this.formTy.pageSize = val;
      this.getList();
    },
    // 分页选择当前第几页
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
          return ele.id === r.id;
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
        hash[next.id] ? '' : hash[next.id] = true && item.push(next);
        return item
      }, []);
      this.$emit("carmodel", newArr);
    }
  }
}
</script>

<style>

</style>


