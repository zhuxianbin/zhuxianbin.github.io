<template>
  <div>
    <el-form :model="formTestX" label-width="130px" ref="ftxRule" :rules="ftxRule">
      <el-row>
        <el-col :span="12">
          <el-form-item label="结算对象：" prop="name">
            <el-col :span="14">
              <el-autocomplete v-model="formTestX.name" :fetch-suggestions="querySearchAsyncX" placeholder="请输入内容" @select="handleSelectX" v-if="!storeObj">
                <i class="el-icon-circle-close el-input__icon" slot="suffix" v-if="formTestX.name" @click="handleIconClickX">
                </i>
              </el-autocomplete>
              <el-autocomplete v-model="formTestX.name" disabled :fetch-suggestions="querySearchAsyncX" placeholder="请输入内容" @select="handleSelectX" v-else>
              </el-autocomplete>
            </el-col>
            <el-col :span="8">
              <el-input v-if="formTestX.name" v-model="formTestX.code" disabled></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关联体验店：" prop="storeIds">
            <select-amout :s-id="storeObj.id" v-model="formTestX.storeIds"></select-amout>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="结算对象类型：" prop="type">
            <el-radio-group v-model="formTestX.type">
              <el-radio :label="1">体验店</el-radio>
              <el-radio :label="2">体验中心</el-radio>
              <el-radio :label="3">加盟服务中心</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="formTestX.status">
              <el-radio :label="1">有效</el-radio>
              <el-radio :label="0">无效</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div align="center" style="margin-top: 30px" v-if="!storeObj">
      <el-button type="primary" @click="submitAdd('ftxRule')">提交</el-button>
      <el-button style="margin-left: 30px" @click="cancelAdd">取消</el-button>
    </div>

    <div v-if="storeObj" align="left">
      <el-button type="primary" style="margin-left: 20px" @click="submitAdd('ftxRule')">保存</el-button>
    </div>

    <template v-if="storeObj">
      <!--标题2-->
      <div class="base-title" style="margin-top: 30px">
        <span class="s1">佣金信息</span>
        <span class="s2"></span>
        <div style="clear:both"></div>
      </div>
      <!---->
      <div style="margin-top: 10px">
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <span>总累计佣金：{{storeObj.totalCommission}}</span>
          </el-col>
          <el-col :span="6">
            <span>已结算佣金：{{storeObj.hasPayCommission}}</span>
          </el-col>
          <el-col :span="6">
            <span>结算中佣金：{{storeObj.noPayCommission}}</span>
          </el-col>
        </el-row>

        <el-row style="margin-top: 10px">
          <el-table :data="dlist" border>
            <el-table-column label="体验店名称" prop="experienceName"></el-table-column>
            <el-table-column label="累计佣金" prop="totalCommission"></el-table-column>
            <el-table-column label="已结算佣金" prop="hasPayCommission"></el-table-column>
            <el-table-column label="结算中佣金" prop="noPayCommission"></el-table-column>
          </el-table>

          <!--分页-->
          <div class="block" align="center">
            <el-pagination 
            @size-change="handleSizeChangedd" 
            @current-change="handleCurrentChangedd" 
            :current-page.sync="paginationdd.page"
            :page-sizes="paginationdd.sizes" 
            :page-size.sync="paginationdd.pageSize" 
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableNum">
            </el-pagination>
          </div>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
import {
  selectSettlementObjectByName,
  addOrUpdateSettlementObject,
  selectSettlementObjectInfo
} from "@/api/commisOrder.js";
import selectAmout from "@/components/select-amout";
export default {
  props: ["storeObj"],
  data() {
    return {
      formTestX: {
        id: "",
        name: "",
        type: "",
        status: "",
        code: "",
        storeIds: ""
      },
      restaurants: [],
      sId: "",
      ftxRule: {
        name: [{ required: true, message: "请输入内容" }],
        storeIds: [{ required: true, message: "请输入内容" }],
        type: [
          { required: true, message: "请选择结算对象类型", trigger: "change" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      dlist: [],
      tList: [],
      tableNum: 0,
      paginationdd: {
        page: 1,
        pageSize: 10,
        sizes: [10, 20, 50, 100]
      }
    };
  },
  components: {
    selectAmout
  },
  mounted() {
    if (this.storeObj) {
      this.selectSettlementObjectInfo();
    }
    this.selectSettlementObjectByName();
  },
  methods: {
    // 分页查询的方法
    paginationFun() {
      this.dlist = [];
      const arr = [];
      let len = 0;
      if (this.paginationdd.page * this.paginationdd.pageSize >= this.tList.length) {
        len = this.tList.length;
      } else {
        len = this.paginationdd.page * this.paginationdd.pageSize;
      }
      for (
        let i = (this.paginationdd.page - 1) * this.paginationdd.pageSize;
        i < len;
        i++
      ) {
        arr.push(this.tList[i]);
      }
      this.dlist = arr;
    },
    // 获取结算对象详情的数据
    selectSettlementObjectInfo() {
      selectSettlementObjectInfo({ id: this.storeObj.id }).then(res => {
        this.tList = res.detailList.list;
        this.tableNum = this.tList.length;
        this.formTestX = {
          id: this.storeObj.id,
          name: res.settlementObject.name,
          code: res.settlementObject.code,
          type: res.settlementObject.type,
          status: res.settlementObject.status,
          storeIds: res.settlementObject.storeIds
        };
        this.paginationFun();
      });
    },
    // 获取所有结算对象
    selectSettlementObjectByName() {
      selectSettlementObjectByName().then(res => {
        const arr = [];
        res.forEach(elememt => {
          const obj = {
            value: elememt.experienceName,
            address: elememt.experienceCode
          };
          arr.push(obj);
        });
        this.restaurants = arr;
      });
    },
    // 模糊查询字段的功能
    querySearchAsyncX(queryString, cb) {
      const restaurants = this.restaurants;
      const results = queryString
        ? restaurants.filter(this.createStateFilterX(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilterX(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        );
      };
    },
    handleSelectX(item) {
      this.formTestX.name = item.value;
      this.formTestX.code = item.address;
    },
    // 点击结算对象删除按钮
    handleIconClickX() {
      this.formTestX.name = "";
    },
    // 点击提交的功能
    submitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addOrUpdateSettlementObject(this.formTestX).then(res => {
            if (this.storeObj) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "创建成功",
                type: "success"
              });
            }

            this.$emit("refreshFun");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 点击取消的按钮
    cancelAdd() {
      this.$emit("closeFun");
    },
    // 选择当前页的效果
    handleCurrentChangedd(val) {
      this.paginationdd.page = val;
      this.paginationFun();
    },
    // 选择每页多少条
    handleSizeChangedd(val) {
      this.paginationdd.pageSize = val;
      this.paginationFun();
    }
  }
};
</script>

<style lang="less">
</style>

