<template>
  <div class="app-container">
    <el-tag type="success">添加优惠券</el-tag>
    <el-form
      :model="formTest"
      ref="ruleTest"
      :rules="ruleTest"
      style="width: 1100px;margin-top: 20px;"
      label-width="140px"
    >
      <div class="bt">
        <span
          class="s1"
          style="margin-left: 0px"
        ></span>
        <span class="s2">基本信息</span>
        <div style="clear:both"></div>
      </div>
      <el-form-item
        prop="type"
        label="优惠券类型："
        style="margin-top: 20px;"
      >
        <el-radio
          v-model="formTest.type"
          label="mj"
          @change="changeType"
        >代金券</el-radio>
        <el-radio
          v-model="formTest.type"
          label="zk"
          @change="changeType"
        >折扣券</el-radio>
      </el-form-item>

      <el-form-item
        label="优惠券名称："
        prop="name"
      >
        <el-input
          v-model="formTest.name"
          placeholder="优惠券名称"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item
        label="减免金额："
        v-if="formTest.type == 'mj'"
        prop="minusAmount"
      >
        <el-col :span="12">
          <el-input
            v-model.number="formTest.minusAmount"
            placeholder="减免金额"
            @keyup.enter.native="limitNum($event)"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="1">&nbsp;元</el-col>
      </el-form-item>

      <el-form-item
        label="打折力度："
        v-if="formTest.type == 'zk'"
        prop="discount"
      >
        <el-col :span="12">
          <el-input
            v-model.number="formTest.discount"
            placeholder="打折力度"
            @keyup.enter.native="limitNum($event)"
            clearable
          ></el-input>
        </el-col>
      </el-form-item>

      <el-row>
        <el-col :span="formTest.validDateType ? 3 : 12">
          <el-form-item
            label="有效日期："
            prop="validDateType"
          >
            <el-radio-group v-model="formTest.validDateType">
              <el-col
                :span="24"
                style="margin-top: 10px;"
              >
                <el-radio :label="1">固定日期</el-radio>
              </el-col>
              <el-col
                :span="24"
                style="margin-top: 30px;"
              >
                <el-radio :label="2">领券后</el-radio>
              </el-col>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="21">
          <el-col
            :span="24"
            style="height: 46px;"
          >
            <el-form-item
              v-if="formTest.validDateType == 1"
              prop="validStartTime"
            >
              <el-date-picker
                v-model="validTime"
                v-show="formTest.validDateType == 1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                clearable
                @change="chooseTime"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-col
              :span="6"
              v-show="formTest.validDateType == 2"
            >
              <el-form-item
                v-if="formTest.validDateType == 2"
                prop="validDate1"
              >
                <el-input
                  v-model.number="formTest.validDate1"
                  @keyup.enter.native="limitN($event)"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="4"
              v-show="formTest.validDateType == 2"
              style="color: #606166;font-size: 14px; line-height: 2.6"
            >&nbsp;天生效，有效天数&nbsp;
            </el-col>
            <el-col
              :span="6"
              :pull="4"
              v-show="formTest.validDateType == 2"
            >
              <el-form-item
                v-if="formTest.validDateType == 2"
                prop="validDate2"
              >
                <el-input
                  v-model.number="formTest.validDate2"
                  @keyup.enter.native="limitN($event)"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="1"
              :pull="4"
              v-show="formTest.validDateType == 2"
              style="color: #606166;font-size: 14px; line-height: 2.6"
            >&nbsp;天</el-col>
          </el-col>
        </el-col>
      </el-row>

      <div class="bt">
        <span
          class="s1"
          style="margin-left: 0px"
        ></span>
        <span class="s2">优惠信息</span>
        <div style="clear:both"></div>
      </div>

      <el-form-item
        label="领券限制："
        prop="maxStockPerSub"
        style="margin-top: 20px;"
      >
        <el-col :span="10">
          <el-input
            v-model.number="formTest.maxStockPerSub"
            @keyup.enter.native="limitN($event)"
            placeholder="领券限制"
            clearable
          ></el-input>
        </el-col>
        <el-col
          :span="1"
          style="color: #606166"
        >&nbsp;张</el-col>
      </el-form-item>

      <el-form-item
        label="使用条件："
        v-if="formTest.type == 'mj'"
        prop="fullAmount"
      >
        <el-col
          :span="2.6"
          style="color: #606166"
        >
          消费满&nbsp;
        </el-col>
        <el-col :span="8">
          <el-input
            v-model.number="formTest.fullAmount"
            @keyup.enter.native="limitNum($event)"
            placeholder="几"
            clearable
          ></el-input>
        </el-col>
        <el-col
          :span="3"
          style="color: #606166"
        >&nbsp;元可用</el-col>
      </el-form-item>

      <el-form-item
        label="使用条件："
        v-if="formTest.type == 'zk'"
        prop="discountLimit"
      >
        <el-col
          :span="2.6"
          style="color: #606166"
        >
          折扣上限&nbsp;
        </el-col>
        <el-col :span="8">
          <el-input
            v-model.number="formTest.discountLimit"
            placeholder="几"
            @keyup.enter.native="limitNum($event)"
            clearable
          ></el-input>
        </el-col>
        <el-col
          :span="3"
          style="color: #606166"
        >&nbsp;元</el-col>
      </el-form-item>

      <div class="bt">
        <span
          class="s1"
          style="margin-left: 0px"
        ></span>
        <span class="s2">使用设置</span>
        <div style="clear:both"></div>
      </div>

      <el-form-item
        label="优惠券库存："
        style="margin-top: 20px;"
        prop="stock"
      >
        <el-col :span="5">
          <el-radio-group
            v-model="radio1"
            @change="changeStock"
          >
            <el-radio :label="-1">不限数量</el-radio>
            <el-radio :label="0">限制数量</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="7">
          <el-input
            v-show="radio1 == 0"
            v-model.number="formTest.stock"
            placeholder="几"
            @keyup.enter.native="limitN($event)"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="1">
          <span v-show="radio1 == 0">张</span>
        </el-col>
      </el-form-item>

      <el-form-item
        label="适用地区说明："
        prop="validCompanyDesc"
      >
        <el-input
          v-model="formTest.validCompanyDesc"
          placeholder="适用地区说明"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item
        label="适用地区："
        prop="companies"
      >
        <el-radio-group
          v-model="formTest.companyType"
          @change="changeCompanyType"
        >
          <el-col :span="24">
            <el-radio
              :label="-1"
              :disabled="nationalDis"
            >全国适用</el-radio>
          </el-col>
          <el-col
            :span="24"
            style="margin-top: 15px;"
          >
            <el-radio
              :label="1"
              @click.native="openDialog1"
            >指定区域适用</el-radio>
          </el-col>
        </el-radio-group>
        <el-col :span="24">{{companiesName ? "（" + cutString(companiesName, 100) + " ）" : ""}}</el-col>
      </el-form-item>

      <el-form-item
        label="适用业务："
        prop="businessType"
      >
        <el-checkbox-group
          v-model="businessType"
          @change="getCarModels"
          v-loading="checkboxLoading"
          :disabled="!formTest.companies"
        >
          <el-checkbox label="整租"></el-checkbox>
          <el-checkbox label="长短租"></el-checkbox>
          <el-checkbox label="日租"></el-checkbox>
          <el-checkbox label="分时"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
        label="适用策略："
        prop="strategies"
      >
        <el-radio-group
          v-model="formTest.strategyType"
          :disabled="!formTest.companies || businessType.length === 0"
          @change="changeStrategyType"
        >
          <el-col :span="24">
            <el-radio :label="-1">全策略</el-radio>
          </el-col>
          <el-col
            :span="24"
            style="margin-top: 15px;"
          >
            <el-radio
              :label="1"
              @click.native="openDialog2"
            >指定策略可用</el-radio>
          </el-col>
        </el-radio-group>
        <el-col :span="24">
          <span>{{strategiesName ? "（" + cutString(strategiesName, 100) + "）" : ""}}</span>
        </el-col>
      </el-form-item>

      <el-form-item
        label="适用车型："
        prop="carModels"
      >
        <span>{{cutString(modelName, 100)}}&emsp;</span>
        <el-button
          v-loading="checkboxLoading"
          v-show="modelName"
          type="text"
          style="color: #DBA54F"
          @click="openDialog3"
        >修改</el-button>
      </el-form-item>

      <!-- <el-form-item label="是否启用：">
        <el-radio
          v-model="formTest.isEnable"
          :label="1"
        >启用</el-radio>
        <el-radio
          v-model="formTest.isEnable"
          :label="0"
        >禁用</el-radio>
      </el-form-item> -->

      <el-form-item
        label="使用须知："
        prop="intro"
      >
        <el-input
          type="textarea"
          v-model="formTest.intro"
          placeholder="使用须知"
          :rows="4"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitUp(1, 'ruleTest')"
        >确认提交</el-button>
        <el-button @click="submitUp(0, 'ruleTest')">暂存</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      :title="dialogObj.title"
      :visible.sync="dialogVisible"
      :width="dialogObj.width"
      @close="handleClose"
    >
      <p-store
        v-if="dialogObj.index == 0"
        @store="listenStore"
        @close="cancelFun"
        :store-arr="storeArr"
      ></p-store>
      <p-strategy
        v-else-if="dialogObj.index == 1"
        @strategy="listenStrategy"
        @close="cancelFun"
        :strategy-arr="strategyArr"
        :company-ids="companiesCD"
      ></p-strategy>
      <p-model
        v-else-if="dialogObj.index == 2"
        @carmodel="listenModel"
        @close="cancelFun"
        :model-arr="modelArr"
        :company-ids="formTest.companies"
        :model-business-type="businessType"
      ></p-model>
      <!-- <div align="center" style="margin-top: 26px;">
        <el-button @click="cancelFun">取 消</el-button>
        <el-button type="primary" @click="determineFun">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  couponsAdd,
  couponsShowCarModelList,
  couponsInitUpdateCoupons,
  couponsUpdate,
  couponsIsShowAllArea
} from "@/api/coupon";

export default {
  name: "addCoupon",
  data() {
    const validateName = (rule, value, callback) => {
      if (value !== "") {
        if (!this.WidthCheck(value, 18)) {
          callback(new Error("长度在9个字以内"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
    const validateCompanyDesc = (rule, value, callback) => {
      if (value !== "") {
        if (!this.WidthCheck(value, 30)) {
          callback(new Error("长度在15个字以内"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
    const validateIntro = (rule, value, callback) => {
      if (value !== "") {
        if (!this.WidthCheck(value, 400)) {
          callback(new Error("长度在200个字以内"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
    const validateMinusAmount = (rule, value, callback) => {
      if (value !== "") {
        if (
          /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false ||
          value * 1 === 0
        ) {
          callback(new Error("请填写大于0的数字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateDiscount = (rule, value, callback) => {
      if (value !== "") {
        if (
          /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false ||
          value * 1 === 0
        ) {
          callback(new Error("请填写大于0的数字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateValidDate1 = (rule, value, callback) => {
      if (value !== "") {
        if (
          /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false ||
          value * 1 === 0
        ) {
          callback(new Error("请填写大于0的数字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateValidDate2 = (rule, value, callback) => {
      if (value !== "") {
        if (
          /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false ||
          value * 1 === 0
        ) {
          callback(new Error("请填写大于0的数字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateMaxStockPerSub = (rule, value, callback) => {
      if (value !== "") {
        if (
          /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false ||
          value * 1 === 0
        ) {
          callback(new Error("请填写大于0的数字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateFullAmount = (rule, value, callback) => {
      if (value !== "") {
        if (
          /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false ||
          value * 1 === 0
        ) {
          callback(new Error("请填写大于0的数字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateDiscountLimit = (rule, value, callback) => {
      if (value !== "") {
        if (
          /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false ||
          value * 1 === 0
        ) {
          callback(new Error("请填写大于0的数字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validateStock = (rule, value, callback) => {
      if (value * 1 === -1) {
        callback();
      } else {
        if (value !== "") {
          if (
            /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false ||
            value * 1 === 0
          ) {
            callback(new Error("请填写大于0的数字"));
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    };
    return {
      radio1: -1,
      validTime: [],
      businessType: [],
      companiesName: "",
      strategiesName: "",
      modelName: "",
      checkboxLoading: false,
      formTest: {
        id: "",
        type: "mj",
        name: "",
        minusAmount: "",
        discount: "",
        discountLimit: "",
        fullAmount: "",
        validDateType: 1,
        validStartTime: "",
        validEndTime: "",
        validDate1: "",
        validDate2: "",
        maxStockPerSub: "",
        stock: "",
        validCompanyDesc: "",
        companyType: "",
        companies: "",
        businessType: "",
        strategyType: "",
        strategies: "",
        carModels: "",
        state: "",
        isEnable: 1,
        intro: ""
      },
      ruleTest: {
        type: [
          { required: true, message: "请选择优惠券类型", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入优惠券名称", trigger: "blur" },
          { validator: validateName }
        ],
        minusAmount: [
          { required: true, message: "请输入减免金额", trigger: "blur" },
          { validator: validateMinusAmount, trigger: "blur" }
        ],
        discount: [
          { required: true, message: "请输入打折力度", trigger: "blur" },
          { validator: validateDiscount, trigger: "blur" }
        ],
        validDateType: [
          { required: true, message: "请选择有效期", trigger: "change" }
        ],
        validStartTime: [
          {
            required: true,
            message: "请选择开始时间和结束时间",
            trigger: "blur"
          }
        ],
        validDate1: [
          { required: true, message: "请输入天数", trigger: "blur" },
          { validator: validateValidDate1, trigger: "blur" }
        ],
        validDate2: [
          { required: true, message: "请输入天数", trigger: "blur" },
          { validator: validateValidDate2, trigger: "blur" }
        ],
        maxStockPerSub: [
          { required: true, message: "请输入领券限制", trigger: "blur" },
          { validator: validateMaxStockPerSub, trigger: "blur" }
        ],
        fullAmount: [
          {
            required: true,
            message: "请输入满多少金额后使用",
            trigger: "blur"
          },
          { validator: validateFullAmount, trigger: "blur" }
        ],
        discountLimit: [
          { required: true, message: "请输入折扣上限", trigger: "blur" },
          { validator: validateDiscountLimit, trigger: "blur" }
        ],
        radio1: [
          { required: true, message: "请选择优惠券库存", trigger: "change" }
        ],
        stock: [
          { required: true, message: "请输入库存数量", trigger: "blur" },
          { validator: validateStock, trigger: "blur" }
        ],
        validCompanyDesc: [
          { required: true, message: "请输入适用地区说明", trigger: "blur" },
          {validator: validateCompanyDesc}
        ],
        companies: [{ required: true, message: "请选择使用地区" }],
        businessType: [{ required: true, message: "请选择适用业务" }],
        strategies: [{ required: true, message: "请选择策略" }],
        carModels: [{ required: true, message: "没有指定车型" }],
        intro: [{ required: true, message: "请输入使用须知", trigger: "blur" },
                {validator: validateIntro}]
      },
      formModel: {
        businessConfig: "",
        companies: "",
        name: "",
        brand: "",
        pageSize: 3000,
        pageCurrent: 1
      },
      checkList: [],
      dialogObj: {
        closeNum: 0,
        index: -1,
        title: "",
        width: "760px",
        storeObj: ""
      },
      storeArr: [],
      strategyArr: [],
      modelArr: [],
      companiesCD: "",
      dialogVisible: false,
      nationalDis: false
    };
  },
  computed: {},
  components: {
    "p-store": () => import("./plug/store.vue"),
    "p-strategy": () => import("./plug/strategy.vue"),
    "p-model": () => import("./plug/model.vue")
  },
  mounted() {
    this.checkCouponId();
  },
  methods: {
    // 是否可以点击全国
    couponsIsShowAllArea() {
      return new Promise((resolve, reject) => {
        couponsIsShowAllArea().then(res => {
          this.nationalDis = !res;
          resolve();
        });
      });
    },
    // 刚进添加的页面的时候判断是否有优惠券的id传来
    checkCouponId() {
      this.couponsIsShowAllArea().then(res => {
        if (this.$route.query.couponId) {
          this.formTest.id = this.$route.query.couponId;
          this.getDetails();
        }
      });
    },
    // 获取优惠券的详情
    getDetails() {
      couponsInitUpdateCoupons({ id: this.formTest.id }).then(res => {
        this.formTest = { ...res.coupons };
        if (res.coupons.stock > 0) {
          this.radio1 = 0;
        } else {
          this.radio1 = -1;
        }
        const start = this.time(res.coupons.validStartTime, "YYYY-MM-DD");
        const end = this.time(res.coupons.validEndTime, "YYYY-MM-DD");
        this.validTime = [start, end];
        this.formTest.validStartTime = start;
        this.formTest.validEndTime = end;
        if (res.coupons.companyType === 1) {
          this.reverseStore(res.couponsCompanyDataVOList);
        } else {
          this.formTest.companies = -1;
        }
        if (res.coupons.businessType) {
          this.reverseBusiness(res.coupons.businessType);
        }
        if (res.coupons.strategyType === 1) {
          this.reverseStrategy(res.couponsStrategyDataVOList);
        } else {
          this.formTest.strategies = -1;
        }
        if (res.couponsCarModelDataVOList.length > 0) {
          this.reverseModels(res.couponsCarModelDataVOList);
        }
      });
    },
    // 打开使用地区查询
    openDialog1() {
      this.dialogObj.index = 0;
      this.dialogObj.title = "选择门店";
      this.dialogObj.width = "960px";
      this.dialogVisible = true;
    },
    // 打开查询策略
    openDialog2() {
      if (this.formTest.companies !== -1) {
        this.companiesCD = this.formTest.companies;
      }
      this.dialogObj.index = 1;
      this.dialogObj.title = "选择策略";
      this.dialogVisible = true;
    },
    // 获取车型
    getCarModels() {
      this.checkboxLoading = true;
      this.formTest.businessType = this.getBusinessType(
        this.businessType
      ).toString();
      this.formTest.strategyType = "";
      this.formTest.strategies = "";
      this.strategiesName = "";
      this.strategyArr = [];
      if (!this.formTest.businessType) {
        this.modelArr = [];
        this.formTest.carModels = "";
        this.modelName = "";
        this.checkboxLoading = false;
        return false;
      }

      if (this.formTest.companyType === -1) {
        this.formTest.companies = -1;
        this.formModel.companies = "";
      } else {
        this.formModel.companies = this.formTest.companies;
      }

      this.formModel.businessConfig = this.formTest.businessType;
      couponsShowCarModelList(this.formDataFun(this.formModel)).then(res => {
        this.modelArr = res.list;
        this.listenModel(res.list);
        this.checkboxLoading = false;
      });
    },
    // 改变所选区域的情况
    changeCompanyType() {
      this.businessType = [];
      this.modelArr = [];
      this.storeArr = [];
      this.formTest.carModels = "";
      this.modelName = "";
      this.companiesName = "";
      this.formTest.strategyType = "";
      this.formTest.strategies = "";
      this.strategiesName = "";
      this.strategyArr = [];
      if (this.formTest.companyType === -1) {
        this.formTest.companies = -1;
      } else {
        this.formTest.companies = "";
      }
    },
    // 改变优惠券类型的选择
    changeType() {
      if (this.formTest.type === "mj") {
        this.formTest.discountLimit = "";
      } else {
        this.formTest.fullAmount = "";
      }
    },
    // 改变有效日期的选择
    changeValidDateType() {
      if (this.formTest.validDateType === 1) {
        this.formTest.validDate1 = "";
        this.formTest.validDate2 = "";
      } else {
        this.validTime = [];
        this.formTest.validStartTime = "";
        this.formTest.validEndTime = "";
      }
    },
    // 改变优惠券库存
    changeStock() {
      if (this.radio1 === -1) {
        this.formTest.stock = -1;
      } else {
        this.formTest.stock = "";
      }
    },
    // 改变策略的情况
    changeStrategyType() {
      this.strategyArr = [];
      this.strategiesName = "";
      if (this.formTest.strategyType === -1) {
        this.formTest.strategies = -1;
      } else {
        this.formTest.strategies = "";
      }
    },
    // 打开查询车型
    openDialog3() {
      this.dialogObj.index = 2;
      this.dialogObj.title = "选择车型";
      this.dialogVisible = true;
    },
    // 弹出框关闭的回调
    handleClose() {
      this.dialogObj.index = -1;
    },
    // 选择有效期的结果
    chooseTime() {
      if (this.validTime && this.validTime.length > 0) {
        this.formTest.validStartTime = this.validTime[0] + " 00:00:00";
        this.formTest.validEndTime = this.validTime[1] + " 23:59:59";
      } else {
        this.formTest.validStartTime = "";
        this.formTest.validEndTime = "";
      }
    },
    // 提交或暂存
    submitUp(n, formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formTest.state = n;
          if (this.formTest.companies === -1) {
            this.formTest.companies = "";
          }
          if (this.formTest.strategies === -1) {
            this.formTest.strategies === "";
          }
          couponsAdd(this.formDataFun(this.formTest)).then(res => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$router.push({ path: "/marketingGM/coupon" });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 点击弹出框取消的按钮
    cancelFun() {
      this.dialogVisible = false;
    },
    // 反写门店
    reverseStore(val) {
      this.storeArr = val;
      const idArr = [];
      const nameArr = [];
      val.forEach(ele => {
        idArr.push(ele.companyId);
        nameArr.push(ele.companyName);
      });
      this.formTest.companies = idArr.toString();
      this.companiesName = nameArr.toString();
    },
    // 反写业务类型
    reverseBusiness(val) {
      const arr1 = val.split(",");
      const arr2 = [];
      this.businessTypeArr.forEach(ele => {
        if (arr1.includes(ele.value)) {
          arr2.push(ele.name);
        }
      });
      this.businessType = arr2;
    },
    // 反写策略
    reverseStrategy(val) {
      this.strategyArr = val;
      const idArr = [];
      const nameArr = [];
      val.forEach(ele => {
        idArr.push(ele.strategyId);
        nameArr.push(ele.name);
      });
      this.formTest.strategies = idArr.toString();
      this.strategiesName = nameArr.toString();
    },
    // 反写车型
    reverseModels(val) {
      this.modelArr = val;
      const idArr = [];
      const nameArr = [];
      val.forEach(ele => {
        idArr.push(ele.id);
        nameArr.push(ele.name);
      });
      this.formTest.carModels = idArr.toString();
      this.modelName = nameArr.toString();
    },
    // 监听门店的选择
    listenStore(val) {
      this.storeArr = val;
      const idArr = [];
      const nameArr = [];
      if (val.length > 0) {
        val.forEach(ele => {
          idArr.push(ele.companyId);
          nameArr.push(ele.companyName);
        });
      }
      this.formTest.companies = idArr.toString();
      this.companiesName = nameArr.toString();
      this.dialogVisible = false;
      // 重新获取一次车型
      this.checkboxLoading = true;
      if (!this.formTest.companies) {
        this.formTest.businessType = "";
        this.businessType = [];
        this.listenModel([]);
        this.listenStrategy([]);
        this.checkboxLoading = false;
        return false;
      } else {
        if (!this.formTest.businessType) {
          this.checkboxLoading = false;
          return false;
        }
      }

      this.formModel.businessConfig = this.formTest.businessType;
      this.formModel.companies = this.formTest.companies;
      couponsShowCarModelList(this.formDataFun(this.formModel)).then(res => {
        this.modelArr = res.list;
        this.listenModel(res.list);
        this.checkboxLoading = false;
      });
    },
    // 监听策略选择
    listenStrategy(val) {
      this.strategyArr = val;
      const idArr = [];
      const nameArr = [];
      if (val.length > 0) {
        val.forEach(ele => {
          idArr.push(ele.strategyId);
          nameArr.push(ele.name);
        });
      }
      this.formTest.strategies = idArr.toString();
      this.strategiesName = nameArr.toString();
      this.dialogVisible = false;
    },
    // 监听车型选择
    listenModel(val) {
      this.modelArr = val;
      const idArr = [];
      const nameArr = [];
      if (val.length > 0) {
        val.forEach(ele => {
          idArr.push(ele.id);
          nameArr.push(ele.name);
        });
      }
      this.formTest.carModels = idArr.toString();
      this.modelName = nameArr.toString();
      this.dialogVisible = false;
    }
  }
};
</script>

<style>
</style>
