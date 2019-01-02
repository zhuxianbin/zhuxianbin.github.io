<template>
  <div class="app-container">
    <div class="panel-container">
      <el-form v-model="coupon" class="filter-container" :inline="true">
        <el-form-item label="名称">
          <el-input v-model="coupon.name" placeholder="卡券名称"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="coupon.type" placeholder="请选择类型">
            <el-option label="全部" value></el-option>
            <el-option label="折扣券" value="zk"></el-option>
            <el-option label="代金券" value="mj"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="微信卡券" style="display:none">
          <el-select v-model="coupon.weixin" placeholder="请选择类型"></el-select>
        </el-form-item>
        <el-form-item label="门店">
          <el-cascader
            :options="company.arr"
            :props="{value: 'companyId', label: 'label'}"
            v-model="selectedOptionYs"
            filterable
            :show-all-levels="false"
            clearable
            change-on-select
            @change="changeCompany"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="coupon.state" placeholder="请选择状态">
            <el-option label="草稿" value="0"></el-option>
            <el-option label="审核通过" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchCoupon(coupon)">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="option-container">
        <el-button
          type="primary"
          v-if="partner.permission.authority['HHR_COUPONS_MANAGEMENT'].includes('HHR_ADD_COUPONS')"
          icon="el-icon-plus"
          @click="addShow=true"
        >添加</el-button>
        <el-button
          type="primary"
          v-if="partner.permission.authority['HHR_COUPONS_MANAGEMENT'].includes('HHR_AUTO_COUPONS')"
          @click="ruleShow=true,ruleFirst=true,getCouponsRule(ruleSearch)"
        >自动发券</el-button>
        <el-button
          type="primary"
          @click="modalShow=true"
          v-if="partner.permission.authority['HHR_COUPONS_MANAGEMENT'].includes('HHR_MANUAL_COUPONS')"
        >人工发券</el-button>
        <el-button type="primary">发放记录</el-button>
      </div>
      <el-table :data="couponList" borderstyle="width: 100%" style="margin: 20px 0">
        <el-table-column prop="type" label="卡券类型" width="100"></el-table-column>
        <el-table-column prop="id" label="卡券ID" width></el-table-column>
        <el-table-column prop="name" label="卡券名称" width></el-table-column>
        <el-table-column prop="validDate" label="有效期" width></el-table-column>
        <el-table-column prop="stock" label="库存" width="100"></el-table-column>
        <el-table-column prop="companies" label="适用区域" width></el-table-column>
        <el-table-column prop="state" label="状态" width="100"></el-table-column>
        <!-- <el-table-column fixed prop="weixin" label="微信卡券" width="100"></el-table-column> -->
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editCoupon(scope.row)"
              v-if="partner.permission.authority['HHR_COUPONS_MANAGEMENT'].includes('HHR_EDIT_COUPONS')"
            >编辑</el-button>
            <!-- <el-button type="text" size="small" @click="copyCoupon(scope.row)">复制</el-button>  -->
            <el-button
              @click.native.prevent="deleteCoupon(scope.$index,scope.row,couponList)"
              v-if="partner.permission.authority['HHR_COUPONS_MANAGEMENT'].includes('HHR_DELETE_COUPONS')"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" align="center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="couponList.pageCurrent"
          :page-sizes="couponPagination.sizes"
          :page-size="couponList.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="couponPagination.total"
        ></el-pagination>
      </div>
    </div>
    <!--新增添加-->
    <el-dialog title="选择优惠券发行平台" :visible.sync="addShow">
      <p>是否同时创建微信卡券</p>
      <el-radio-group v-model="addType">
        <el-radio :label="1" disabled>同时创建微信平台优惠券</el-radio>
        <el-radio :label="2" disabled>仅创建内部平台优惠券</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="primary" @click="addCoupon">确 定</el-button>
      </span>
    </el-dialog>
    <!--人工发券-->
    <el-dialog :title="modal.title" :visible.sync="modalShow" width="1000px">
      <div v-if="modalShow">
        <div v-show="modal.firstStep">
          <member
            :pagination="pagination"
            :member="memberSearch"
            :memberList="member.list"
            :ids="member.ids"
            :multipleSelect="member.selected"
            :showStatus="modal.secondStep"
            v-on:showNext="showNext"
            v-on:searchMember="searchMember"
            v-on:memberSelect="memberSelect"
            v-on:selectAll="selectAll"
          ></member>
        </div>
        <div v-show="modal.secondStep">
          <el-form :model="manual" ref="manual" label-width="80px" size="mini">
            <el-form-item label="发券原因" prop="reason" :rules="[{required: true,message:'发券原因不能为空'}]">
              <el-input maxlength="100" v-model="manual.reason"></el-input>
            </el-form-item>
          </el-form>
          <coupon
            :searchCoupon="sendCoupon.search"
            :sendCoupon="sendCoupon.list"
            :multipleSelect="sendCoupon.selected"
            :auto="modalShow"
            v-on:search="searchsendCoupon"
            v-on:manualSubmit="manualSubmit('manual')"
            v-on:manualprev="pre"
            v-on:couponSelect="couponSelect"
            v-on:selectAll="couponSelectAll"
          ></coupon>
        </div>
      </div>
    </el-dialog>
    <!-- <el-dialog :title="操作记录">
      <el-table :data="couponList" borderstyle="width: 100%" border style="margin: 20px 0">
      <el-table-column fixed prop="time" label="操作时间" width="100"></el-table-column>
      <el-table-column fixed prop="" label="操作人" width="100"></el-table-column>
      <el-table-column fixed prop="type" label="操作类型" width="100"></el-table-column>
      <el-table-column fixed prop="content" label="操作内容" width="100"></el-table-column>
    </el-table>
    </el-dialog>-->
    <!--自动发券-->
    <el-dialog title="自动发券" :visible.sync="ruleShow" width="1000px">
      <div v-if="ruleFirst">
        <rule
          :ruleSearch="ruleSearch"
          :couponRule="couponRule.list"
          :multipleSelect="couponRule.selected"
          :deleted="deleted"
          v-on:search="searchRule"
          v-on:enableDisable="enableDisable"
          v-on:deleteRule="deleteRule"
          v-on:addRule="addRule"
          v-on:editRule="editRule"
        ></rule>
      </div>
      <div v-if="ruleSecond">
        <el-form :model="rule" :inline="true" :rules="rules" :ref="rule">
          <el-form-item label="规则名称" prop="name">
            <el-input v-model="rule.name"></el-input>
          </el-form-item>
          <el-form-item label="规则类型" prop="type">
            <el-select placeholder="请选择" v-model="rule.type">
              <el-option label="订单消费满额" value="order"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规则有效期" prop="date">
            <el-date-picker
              v-model="rule.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="满额" prop="amount" v-if="rule.type=='order'">
            <el-input v-model="rule.amount" type="number"></el-input>
          </el-form-item>
        </el-form>
        <coupon
          :searchCoupon="sendCoupon.search"
          :sendCoupon="sendCoupon.list"
          :multipleSelect="sendCoupon.selected"
          :auto="modalShow"
          v-on:search="searchsendCoupon"
          v-on:couponSelect="couponSelect"
          v-on:selectAll="couponSelectAll"
        ></coupon>
        <div style="margin:20px 0 10px;text-align:center">
          <el-button @click="autoSubmit(rule)" type="primary">提交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/coupon";
import member from "@/components/manualCoupon/member";
import coupon from "@/components/manualCoupon/coupon";
import rule from "@/components/manualCoupon/auto";

export default {
  data() {
    return {
      // 分页设置
      pagination: {
        total: 0,
        sizes: [20, 30, 40, 50]
      },
      couponPagination: {
        total: 0,
        sizes: [20, 30, 40, 50]
      },
      // 门店下拉列表
      selectedOptionYs: [],
      // 优惠券搜索
      coupon: {
        pageCurrent: 1,
        pageSize: 20,
        name: "",
        type: "",
        company_id: "",
        state: ""
      },
      // 优惠券列表
      couponList: [],
      // 操作记录
      operating: [],
      // 新增优惠券
      addShow: false,
      addType: 2,
      memberSearch: {
        start: 1,
        pageSize: 20,
        phoneNo: "",
        name: "",
        startTime: "",
        endTime: "",
        status: "",
        hasOrder: ""
      },
      // 人工发券
      modalShow: false,
      modal: {
        title: "人工发券",
        firstStep: true,
        secondStep: false
      },
      manual: {
        reason: ""
      },
      // 自动发券
      ruleShow: false,
      ruleFirst: false,
      ruleSecond: false,
      ruleUpdate: "",
      ruleSearch: {
        pageCurrent: 1,
        pageSize: 20,
        name: "",
        type: "order",
        isEnable: ""
      },
      couponRule: {
        selected: [],
        list: [],
        ids: []
      },
      hasCoupon: {
        couponsIds: [],
        couponsNums: []
      },
      deleted: false,
      rule: {
        name: "",
        type: "",
        date: "",
        amount: "",
        isEnable: 1
      },
      // 新增自动发券规则
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        date: [{ required: true, message: "请选择日期", trigger: "change" }],
        amount: [{ required: true, message: "请输入金额", trigger: "blur" }]
      },
      // 选中会员
      member: {
        selected: [],
        list: [],
        ids: []
      },
      // 手动发券 发券列表
      sendCoupon: {
        search: {
          type: "",
          companyId: "",
          businessType: ""
        },
        list: [],
        selected: [],
        ids: []
      }
    };
  },

  components: {
    member,
    coupon,
    rule
  },
  created() {
    this.getCoupon(this.coupon);
  },
  watch: {
    "memberSearch.start": {
      handler() {
        this.getMember(this.memberSearch);
      },
      deep: true
    },
    "memberSearch.pageSize": {
      handler() {
        this.getMember(this.memberSearch);
      },
      deep: true
    },
    coupon: {
      handler() {
        this.getCoupon(this.coupon);
      },
      deep: true
    },
    // 关闭后重置
    modalShow: {
      handler() {
        this.memberReset();
      }
    },
    ruleShow: {
      handler() {
        this.memberReset();
        this.couponReset();
        if (!this.ruleShow) {
          this.ruleSecond = false;
        }
      }
    }
  },
  methods: {
    // 全选
    // checkAll(val){
    //   this.member.selected=val
    //   console.log(val)
    // },
    // 跳转优惠券
    addCoupon() {
      this.addShow = false;
      this.$router.push({
        path: "/marketingGM/add-coupon"
      });
    },
    // 编辑优惠券
    editCoupon(row) {
      this.$router.push({
        path: "/marketingGM/modify-coupon",
        query: { couponId: row.id }
      });
    },
    // 复制优惠券
    copyCoupon(row) {
      this.$router.push({
        path: "/marketingGM/copy-coupon",
        query: { couponId: row.id }
      });
    },
    // 获取优惠券列表页面
    // 每页条数
    handleSizeChange(val) {
      this.coupon.pageSize = val;
    },
    // 第几页
    handleCurrentChange(val) {
      this.coupon.pageCurrent = val;
    },
    // 主页面-门店列表
    changeCompany(val) {
      this.coupon.company_id = val[val.length - 1];
      console.log(this.coupon.company_id);
    },
    // 搜索优惠券
    searchCoupon(data) {
      this.getCoupon(data);
    },
    // 获取优惠券
    getCoupon(data) {
      api.getCouponList(data).then(res => {
        this.couponList = res.list;
        this.couponPagination.total = res.totalCount;
      });
    },
    // 删除优惠券
    deleteCoupon(index, row, data) {
      this.$confirm("删除动作不可逆，是否确认删除该卡券?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .deleteCoupons({
              couponsId: row.id
            })
            .then(res => {
              data.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 查看优惠券操作记录
    operateHistory(row) {},
    // 会员搜索
    searchMember(data) {
      data.startTime = this.time(data.startTime, "YYYY-MM-DD");
      data.endTime = this.time(data.endTime, "YYYY-MM-DD");
      this.member.selected = [];
      this.getMember(data);
    },
    selectAll(data) {
      this.member.selected = data;
    },
    memberSelect(data) {
      this.member.selected = data;
    },
    couponSelect(data) {
      this.sendCoupon.selected = data;
    },
    couponSelectAll(data) {
      this.sendCoupon.selected = data;
    },
    // 获取会员列表
    getMember(data) {
      api.getMember(data).then(res => {
        this.pagination.total = res.total;
        this.member.list = res.list;
        res.list.map(item => {
          item.selected = 0;
        });
        this.member.list = res.list;
        this.pagination.total = res.total;
        this.member.ids = [];
        if (this.member.selected.length > 0) {
          this.member.selected.forEach(ele => {
            this.member.ids.push(ele.id);
          });
        }
        if (this.member.list.length > 0) {
          this.member.list.forEach(ele => {
            if (this.member.ids.includes(ele.id)) {
              ele.selected = 1;
            }
          });
        }
      });
    },
    showNext() {
      this.modal.firstStep = false;
      this.modal.secondStep = true;
    },
    pre() {
      this.modal.firstStep = true;
      this.modal.secondStep = false;
    },
    searchsendCoupon(data) {
      this.getSendCoupon(data);
    },
    // 获取发行的优惠券列表
    getSendCoupon(data) {
      api.sendCoupon(data).then(res => {
        res.map(item => {
          item.selected = 0;
          item.number = 0;
          item.stocked = item.stock == "不限" ? 9999999 : Number(item.stock);
        });
        this.sendCoupon.list = res;
        const data = {};
        this.sendCoupon.selected.forEach(item => {
          data[item.id] = item;
        });
        this.sendCoupon.list.forEach(item => {
          Object.assign(item, data[item.id]);
        });
        if (this.ruleUpdate) {
          this.hasCoupon.couponsIds.forEach((item, index) => {
            this.sendCoupon.selected.push({
              id: item,
              number: this.hasCoupon.couponsNums[index],
              selected: 1
            });
          });

          const data = {};
          this.sendCoupon.selected.forEach(item => {
            data[item.id] = item;
          });

          this.sendCoupon.list.forEach(item => {
            console.log("hebing");
            Object.assign(item, data[item.id]);
          });
          console.log(this.sendCoupon.list);
        }
      });
    },
    // 人工发券关闭后数据清空
    memberReset() {
      if (this.modalShow == false) {
        (this.memberSearch = {
          start: 1,
          pageSize: 20,
          phoneNo: "",
          name: "",
          startTime: "",
          endTime: "",
          status: "",
          hasOrder: ""
        }),
          (this.member.list = []);
        this.member.selected = [];
        this.coupon.list = [];
        this.coupon.selected = [];
        this.sendCoupon.list = [];
        this.sendCoupon.selected = [];
        (this.manual.reason = ""),
          // this.coupon = { ...this.coupon,...def};
          (this.modal.firstStep = true),
          (this.modal.secondStep = false);
      }
    },
    // 自动发券清空
    couponReset() {
      if (this.ruleShow == false) {
        (this.couponRule.list = []),
          (this.couponRule.selected = []),
          (this.ruleFirst = false),
          (this.sendCoupon.list = []),
          (this.sendCoupon.selected = []),
          (this.rule = {
            name: "",
            type: "",
            date: "",
            amount: ""
          });
        this.hasCoupon = {
          couponsIds: [],
          couponsNums: []
        };
      }
    },
    // 人工发券提交
    manualSubmit(formName) {
      const data = {
        subscriberIds: [],
        couponIds: [],
        couponNums: []
      };
      this.member.selected.forEach(ele => {
        data.subscriberIds.push(ele.id);
      });

      this.sendCoupon.selected.forEach(ele => {
        data.couponIds.push(ele.id);
        data.couponNums.push(ele.number);
      });
      for (var key in data) {
        data[key] = data[key].join(",");
      }
      data.reason = this.manual.reason;
      // 表单校验
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.couponHandleGrant(data).then(res => {
            if (res.length) {
              this.$alert(res.toString().replace(/,/, "<br>"), "提示", {
                dangerouslyUseHTMLString: true
              });
            } else {
              this.$message({
                message: "添加成功",
                type: "success"
              });
            }
            this.modalShow = false;
          });
        } else {
          return false;
        }
      });
    },
    searchRule(data) {
      this.getCouponsRule(data);
    },
    // 自动发券规则列表
    getCouponsRule(data) {
      api.getCouponsRule(data).then(res => {
        res.list.map(item => {
          item.selected = 0;
        });
        this.couponRule.list = res.list;
        console.log(this.couponRule.list);
      });
    },

    // 规则禁用
    enableDisable(data, index) {
      const isEnable = {
        id: data.id,
        isEnable: data.isEnable == 0 ? 1 : 0
      };
      const text = data.isEnable == 0 ? "启用" : "禁用";
      this.$confirm(`是否确认${text}该规则`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.enableDisable(isEnable).then(res => {
            this.couponRule.list[index].isEnable =
              isEnable.isEnable == 0 ? 0 : 1;
          });
        })
        .catch(() => {});
    },
    // 规则删除
    deleteRule(data) {
      let ids = "";
      data.forEach(ele => {
        ids = ids + ele.id + ",";
      });
      this.$confirm(`确认删除规则`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .deleteRule({
              ids: ids
            })
            .then(res => {
              this.getCouponsRule(this.ruleSearch);
              this.deleted = !this.deleted;
            });
        })
        .catch(() => {});
    },
    // 新增规则
    addRule() {
      (this.ruleFirst = false), (this.ruleSecond = true);
    },
    // 自动发券-新增规则 提交
    autoSubmit(formName) {
      const coupons = {
        couponsId: [],
        couponsNums: []
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.sendCoupon.selected.length > 0) {
            this.sendCoupon.selected.forEach(ele => {
              coupons.couponsId.push(ele.id);
              coupons.couponsNums.push(ele.number);
            });
            for (var key in coupons) {
              coupons[key] = coupons[key].join(",");
            }
            const rule = {
              name: this.rule.name,
              type: this.rule.type,
              amount: this.rule.amount,
              validStartDate:
                this.time(this.rule.date[0], "YYYY-MM-DD") + " 00:00:00",
              validEndDate:
                this.time(this.rule.date[1], "YYYY-MM-DD") + " 23:59:59",
              isEnable: this.rule.isEnable
            };
            const couponsRule = {
              ...rule,
              ...coupons
            };
            if (this.ruleUpdate) {
              api
                .ruleUpdate({
                  ...rule,
                  ...coupons,
                  id: this.ruleUpdate
                })
                .then(res => {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                  this.ruleShow = false;
                  this.couponReset();
                  this.ruleUpdate = false;
                });
            } else {
              api.addRule(couponsRule).then(res => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.ruleShow = false;
                this.couponReset();
                this.ruleUpdate = false;
              });
            }
          } else {
            this.$message.error("请选择优惠券");
          }
        } else {
          return false;
        }
      });
    },
    // 获取编辑规则
    editRule(data) {
      api.ruleInitUpdate({ id: data }).then(res => {
        const start = this.time(res.validStartDate, "YYYY-MM-DD");
        const end = this.time(res.validEndDate, "YYYY-MM-DD");
        this.rule = {
          name: res.name,
          type: res.type,
          amount: res.amount,
          date: [start, end],
          isEnable: res.isEnable
        };
        this.hasCoupon.couponsIds = res.couponsIds.split(",");
        this.hasCoupon.couponsNums = res.couponsNums.split(",");
        this.ruleFirst = false;
        this.ruleSecond = true;
        this.ruleUpdate = data;
      });
    }
  }
};
</script>



