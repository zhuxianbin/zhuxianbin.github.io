<template>
  <div style="min-width: 1100px; min-height: 760px">
    <baidu-map
      class="map"
      style="display: flex; flex-direction: column"
      v-loading="loadingInstance"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :center="center"
      :zoom="zoom"
      @ready="initMap"
    >
      <el-form
        :model="form"
        :inline="true"
      >
        <el-form-item label="网点名称">
          <el-input
            v-model="form.name"
            placeholder="网点名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="选择公司">
          <el-cascader
            :options="aresArr"
            :props="propsObj"
            v-model="selectedOptions2"
            filterable
            :show-all-levels="false"
            clearable
            change-on-select
            @change="changeCompany"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select
            v-model="form.isActive"
            placeholder="是否启用"
            clearable
          >
            <el-option
              label="是"
              value="1"
            ></el-option>
            <el-option
              label="否"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网点值守状态">
          <el-select
            v-model="form.unattended"
            placeholder="网点值守状态"
            clearable
          >
            <el-option
              label="无人"
              value="1"
            ></el-option>
            <el-option
              label="有人"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网点车位状态">
          <el-select
            v-model="form.parkingState"
            placeholder="网点车位状态"
            clearable
          >
            <el-option
              label="全部"
              value=""
            ></el-option>
            <el-option
              label="满"
              value="1"
            ></el-option>
            <el-option
              label="空"
              value="2"
            ></el-option>
            <el-option
              label="正常"
              value="3"
            ></el-option>
            <el-option
              label="车辆警报"
              value="4"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网点车机状态">
          <el-select
            v-model="form.dotDeviceState"
            placeholder="网点车机状态"
            clearable
          >
            <el-option
              label="全部"
              value="0"
            ></el-option>
            <el-option
              label="在线"
              value="1"
            ></el-option>
            <el-option
              label="离线"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网点车辆状态">
          <el-select
            v-model="form.dotCarState"
            placeholder="网点车辆状态"
            clearable
          >
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.cnName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="省/市/区">
          <el-cascader
            :options="optionsTree"
            v-model="selectedOptions1"
            filterable
            :props="{value: 'areaCode', label: 'name'}"
            :show-all-levels="true"
            clearable
            style="width: 200px"
            change-on-select
            @change="changeCity"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="网点类型">
          <el-select
            v-model="form.dotType"
            placeholder="网点类型"
            clearable
          >
            <el-option
              label="体验店"
              value="0"
            ></el-option>
            <el-option
              label="直营店"
              value="1"
            ></el-option>
            <el-option
              label="自助网点"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网点租赁状态">
          <el-select
            v-model="form.dotRentState"
            placeholder="网点租赁状态"
            clearable
          >
            <el-option
              label="全部"
              value="0"
            ></el-option>
            <el-option
              label="有在租车辆"
              value="1"
            ></el-option>
            <el-option
              label="无在租车辆"
              value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submityMap"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <!--地图显示组件-->
      <bm-view style="width: 100%; height:100px; flex: 1"></bm-view>
      <!--地图的缩放组件-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!--地图坐标-->
      <bml-marker-clusterer
        :averageCenter="true"
        :styles="gyStyles"
      >
        <bm-marker
          v-for="item in points"
          :key="item.id"
          :position="item.position"
          :title="item.title"
          :icon="item.icon"
          @click="infoWindowOpen(item)"
          @mouseover="changeStyle(item, $event)"
          @mouseout="goAway(item, $event)"
        >
          <bm-label
            v-if="item.showLabel"
            :content="item.noOrderCarNum"
            :labelStyle="item.labelStyle"
            :offset="item.offset"
          />
        </bm-marker>
      </bml-marker-clusterer>
      <!--右边的显示-->
      <bm-control
        :offset="offset4"
        anchor="BMAP_ANCHOR_TOP_RIGHT"
      >
        <el-row>
          <el-tag
            type="info"
            style="color: #393B3E"
          >最近一次刷新时间：{{rightObj.updateTime}}</el-tag>
        </el-row>
        <div class="right-div-cont">
          <div
            class="right-div"
            style="margin-top: 15px"
          >
            <span class="s1"></span><span class="s2">无车网点：{{rightObj.noCarDot}}个</span>
            <div style="clear: both"></div>
          </div>

          <div
            class="right-div"
            style="margin-top: 15px"
          >
            <span
              class="s1"
              style="background: #A6D39C"
            ></span><span class="s2">正常网点：{{rightObj.normalDot}}个</span>
            <div style="clear: both"></div>
          </div>

          <div
            class="right-div"
            style="margin-top: 15px"
          >
            <span
              class="s1"
              style="background: #CF5862"
            ></span><span class="s2">车辆爆满网点：{{rightObj.fullCarDot}}个</span>
            <div style="clear: both"></div>
          </div>

          <div
            class="right-div"
            style="margin-top: 15px"
          >
            <span
              class="s1"
              style="background: #F8D697"
            ></span><span class="s2">预警网点：{{rightObj.warningDot}}个</span>
            <div style="clear: both"></div>
          </div>

          <div
            class="right-div"
            style="margin-top: 15px"
          >
            <span
              class="s1"
              style="background: #B2D3EF"
            ></span><span class="s2">亏电网点：{{rightObj.lossElectricDot}}个</span>
            <div style="clear: both"></div>
          </div>

          <div
            class="right-div"
            style="margin-top: 15px"
          >
            <span
              class="s1"
              style="background: #000000"
            ></span><span class="s2">离线网点：{{rightObj.offlineDot}}个</span>
            <div style="clear: both"></div>
          </div>
        </div>
      </bm-control>
      <!--地图自定义控件-->
      <transition name="el-zoom-in-center">
        <bm-control
          v-show="showDetails"
          :offset="offset1"
        >
          <div class="map-cell">
            <el-row>
              <el-tooltip effect="dark" :content="dotName" placement="top-start">
                <span class="map-span-1">{{details.name}}</span>
              </el-tooltip>
              <span class="map-span-2">{{details.cTypeShow}}</span>
              <span
                v-if="details.carParkingState == 1"
                class="map-span-3"
                style="color: red"
              >{{details.parkingStateName}}</span>
              <span
                v-else-if="details.carParkingState == 2"
                class="map-span-3"
                style="color: #AAAAAB"
              >{{details.parkingStateName}}</span>
              <span
                v-else-if="details.carParkingState == 3"
                class="map-span-3"
                style="color: #79C45E"
              >{{details.parkingStateName}}</span>
              <span
                v-else-if="details.carParkingState == 4"
                class="map-span-3"
                style="color: #DEA15C"
              >{{details.parkingStateName}}</span>
              <span class="map-span-3">车位数：{{details.totalParkingPlace}}</span>
              <span class="map-span-3">车辆数：{{details.noOrderCarNum}}</span>
            </el-row>

            <el-row style="margin-top: 10px;">
              <el-col
                :span="6"
                class="map-span-4"
              >离线：{{details.offlineCarCount}}</el-col>
              <el-col
                :span="6"
                class="map-span-4"
              >空闲：{{details.freeCarCount}}</el-col>
              <el-col
                :span="6"
                class="map-span-4"
              >停用：{{details.unUseCarCount}}</el-col>
              <el-col
                :span="6"
                class="map-span-4"
              >亏电：{{details.lossElectricCarCount}}</el-col>
            </el-row>

            <el-row style="margin-top: 10px">
              <el-col
                :span="6"
                class="map-span-4"
              >在租：{{details.orderCarCount}}</el-col>
              <el-col
                :span="6"
                class="map-span-4"
              >故障：{{details.faultCarCount}}</el-col>
              <el-col
                :span="6"
                class="map-span-4"
              >运维：{{details.operationCarCount}}</el-col>
              <el-col
                :span="6"
                class="map-span-4"
              >事故：{{details.troubleCarCount}}</el-col>
            </el-row>
            <img
              class="map-close"
              src="../../assets/images/guanbi.png"
              @click="closeMap"
            />
          </div>

          <el-form
            :model="formTs"
            :inline="true"
            style="margin-top: 10px"
          >
            <el-form-item style="width: 100px">
              <el-input
                v-model="formTs.vehiclePlateId"
                placeholder="车牌号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item style="width: 100px">
              <el-select
                v-model="formTs.brand"
                placeholder="品牌"
                clearable
              >
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.cnName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width: 100px">
              <el-select
                v-model="formTs.deviceState"
                placeholder="车机状态"
                clearable
              >
                <el-option
                  label="全部"
                  value="0"
                ></el-option>
                <el-option
                  label="在线"
                  value="1"
                ></el-option>
                <el-option
                  label="离线"
                  value="2"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width: 100px">
              <el-select
                v-model="formTs.carState"
                placeholder="车辆状态"
                clearable
              >
                <el-option
                  v-for="item in options1"
                  :key="item.id"
                  :label="item.cnName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="width: 100px">
              <el-button
                type="primary"
                @click="searchCar"
              >查询</el-button>
            </el-form-item>
          </el-form>
          <!--需要遍历的效果-->
          <div
            class="map-list"
            v-for="(item,index) in carList"
            :style="index == 0 ? 'margin-top: 0px' : ''"
            :key="item.id"
          >
            <el-row>
              <span class="map-span-1"></span>
              <span
                class="map-span-2"
                style="color: black"
              >{{item.vehiclePlateId}}</span>
              <span
                v-if="item.bizStateShow == '空闲'"
                class="map-span-3"
                style="color: #367D21"
              >{{item.bizStateShow}}</span>
              <span
                v-else-if="item.bizStateShow == '故障'"
                class="map-span-3"
                style="color: red"
              >{{item.bizStateShow}}</span>
              <span
                v-else-if="item.bizStateShow == '亏电'"
                class="map-span-3"
                style="color: #ecab4a"
              >{{item.bizStateShow}}</span>
              <span
                v-else
                class="map-span-3"
                style="color: #878788"
              >{{item.bizStateShow}}</span>
              <span
                v-if="item.offlineState == '在线'"
                class="map-span-3"
                style="color: #367D21"
              >{{item.offlineState}}</span>
              <span
                v-else
                class="map-span-3"
                style="color: #878788"
              >{{item.offlineState}}</span>
              <span
                class="map-span-3"
                style="color: #367D21"
              >电量：{{item.soc ? item.soc + '%' : '--'}}</span>
            </el-row>
            <el-row style="margin-top: 7px">
              <span
                class="map-span-2"
                style="color: black; font-size: 15px"
              >行驶路程：{{item.totalKm ? item.totalKm + 'km' : '--'}}</span>
              <span
                class="map-span-2"
                style="color: black; font-size: 15px;margin-left: 30px"
              >车型：{{item.modelName}}</span>
            </el-row>
            <el-button
              type="warning"
              class="map-list-btn1"
              @click="showFun1(item)"
              :disabled="item.opeCount > 0"
            >生成工单</el-button>
          </div>

          <!--分页-->
          <div
            style="background: #fff; width: 515px; padding: 10px 13px;margin-top: 15px;"
            align="center"
          >
            <el-pagination
              background
              :page-size="pagination.pageSize"
              :current-page="pagination.page"
              @current-change="handleCurrentChangeMap"
              layout="prev, pager, next"
              jumper
              :total="pagination.total"
            >
            </el-pagination>
          </div>
        </bm-control>
      </transition>

      <!--生成订单组件-->
      <transition name="el-zoom-in-center">
        <bm-control
          v-show="showDetails1"
          :offset="offset2"
        >
          <div class="map-dialog">
            <span
              class="map-span-1"
              style="display: block"
            >{{carName}}</span>
            <el-form
              :model="formTn"
              ref="ruleFormTn"
              :rules="ruleFormTn"
              label-width="110px"
              style="margin-top: 15px"
            >
              <el-form-item
                label="选择工单类型"
                prop="workType"
              >
                <el-select
                  v-model="formTn.workType"
                  placeholder="请选择工单类型"
                >
                  <el-option
                    v-for="item in options3"
                    :key="item.id"
                    :label="item.cnName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="选择目标网点"
                prop="replaceDotName"
              >
                <el-col :span="12">
                  <el-input
                    v-model="formTn.replaceDotName"
                    disabled
                  ></el-input>
                </el-col>
                <el-col
                  :span="4"
                  :offset="1"
                >
                  <el-button
                    type="primary"
                    @click="chooseNet"
                  >选择网点</el-button>
                </el-col>
              </el-form-item>

              <el-form-item
                label="备注"
                prop="remark"
              >
                <el-input
                  v-model="formTn.remark"
                  type="textarea"
                  maxlength="30"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="createOrder('ruleFormTn')"
                >提交</el-button>
                <el-button @click="hideFun1">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </bm-control>
      </transition>
    </baidu-map>
    <!--查询网点-->
    <el-dialog
      title="查询网点"
      :visible.sync="dialogVisible"
      width="900px"
    >
      <el-form
        :model="formXn"
        :inline="true"
      >
        <el-form-item label="网点名称">
          <el-input
            v-model="formXn.name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select
            v-model="formXn.isActive"
            clearable
          >
            <el-option
              label="启用"
              value="1"
            ></el-option>
            <el-option
              label="未启用"
              value="0"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="选择公司">
          <el-cascader
            :options="company.arr"
            v-model="selectedOptions3"
            filterable
            :show-all-levels="false"
            clearable
            change-on-select
            @change="changeCompanyX"
          >
          </el-cascader>
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="primary"
            @click="searchNet"
          >查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="netList"
        border
        ref="multipleTableX"
        tooltip-effect="dark"
      >
        <el-table-column
          label="选择"
          width="55"
        >
          <template slot-scope="scope">
            <el-radio
              v-model="chooseName"
              :label="scope.row.name"
              @change="selectDot(scope.row)"
            ></el-radio>
          </template>
        </el-table-column>
        <el-table-column
          label="编码"
          prop="code"
        >
        </el-table-column>
        <el-table-column
          label="名称"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="地址"
          prop="address"
        >
        </el-table-column>
        <el-table-column
          label="是否启用"
          prop="isActive"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isActive == 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          label="行政区域"
          prop="sAddress"
        >
        </el-table-column>
        <el-table-column label="还车网点">
          <template slot-scope="scope">
            <span>本地</span>
          </template>
        </el-table-column>
        <el-table-column
          label="车位数量"
          prop="totalParkingPlace"
        >
        </el-table-column>
         <el-table-column label="空闲车位" prop="totalUse">
           <template slot-scope="scope">
             <span>{{(scope.row.totalParkingPlace - scope.row.totalUse) >= 0 ? (scope.row.totalParkingPlace - scope.row.totalUse) : 0}}</span>
           </template>
        </el-table-column>
      </el-table>

      <div
        class="block"
        align="center"
      >
        <el-pagination
          @size-change="handleSizeChangeX"
          @current-change="handleCurrentChangeX"
          :current-page="formXn.start"
          :page-sizes="paginationX.sizes"
          :page-size="formXn.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationX.total"
        >
        </el-pagination>
      </div>

      <div
        class="block"
        align="center"
      >
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="confirmFun"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { BmlMarkerClusterer } from "vue-baidu-map";
import { getAllAreasInfo } from "@/api/partnerList";
import { getAreaList } from "@/api/tending";
import {
  getWarningList,
  getDicts,
  getCarByDot,
  selectWorkOrderTypeDicts,
  getBranchDotsByPage,
  addWorkOrder
} from "@/api/network-alert";
export default {
  data() {
    return {
      aresArr: [],
      propsObj: {value: 'companySn', label: 'companyName'},
      form: {
        name: "",
        companySn: "",
        isActive: "1",
        parkingState: "",
        dotType: "",
        dotRentState: "",
        dotCarState: "",
        areaId: "",
        dotDeviceState: "",
        unattended: ""
      },
      rightObj: {
        updateTime: "",
        fullCarDot: "",
        lossElectricDot: "",
        noCarDot: "",
        normalDot: "",
        offlineDot: "",
        warningDot: ""
      },
      details: {},
      formTs: {
        dotId: "",
        vehiclePlateId: "",
        brand: "",
        deviceState: "",
        carState: ""
      },
      formTn: {
        carId: "",
        carNo: "",
        carBusType: "",
        dotGroupId: "",
        dotGroupName: "",
        dotId: "",
        dotName: "",
        replaceDotId: "",
        replaceDotName: "",
        remark: "",
        taskTimeType: "1",
        // taskTimeStr: "",
        workType: "",
        taskReason: "work_task_reason_qt",
        modelsId: ""
      },
      formXn: {
        start: 1,
        pageSize: 10,
        isActive: "",
        companySn: "",
        name: ""
      },
      dotName: "",
      ruleFormTn: {
        workType: [
          { required: true, message: "请选择工单类型", trigger: "change" }
        ],
        replaceDotName: [{ required: true, message: "请选择选择网点" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      selectedOptions1: [],
      selectedOptions2: [],
      selectedOptions3: [],
      options1: [],
      options2: [],
      options3: [],
      mapShow: false,
      optionsTree: [],
      points: [],
      center: "杭州",
      zoom: 9,
      showDetails: false,
      showDetails1: false,
      gyStyles: [],
      map: "",
      BMap: "",
      pagination: {
        page: 1,
        pageSize: 4,
        total: 0
      },
      carName: "",
      cars: [],
      carList: [],
      loadingInstance: false,
      dialogVisible: false,
      netList: [],
      offset1: { width: 70, height: 20 },
      offset2: { width: 600, height: 170 },
      offset4: { width: 15, height: 20 },
      tevl: "",
      chooseDotId: "",
      chooseName: "",
      paginationX: {
        total: 0,
        sizes: [100, 50, 20, 10]
      },
      timeid: ""
    };
  },
  components: {
    BmlMarkerClusterer
  },
  mounted() {
    this.loadingInstance = true;
    Promise.all([this.getDicts(), this.selectWorkOrderTypeDicts(), this.getAreaList()]).then(
      result => {
        this.getWarningList().then(() => {
          this.getAllAreasInfo();
          this.timerFun();
        });
      }
    );
  },
  beforeDestroy() {
    window.clearInterval(this.timeid);
  },
  methods: {
    // 获取所属区域的接口
    getAreaList() {
      return new Promise((resolve, reject) => {
        getAreaList().then(res => {
          this.aresArr = res;
          resolve();
        }).catch(err => {
          console.log(err);
        });
      });
    },
    // 定时器每3秒刷新一次
    timerFun() {
      this.timeid = window.setInterval(this.getWarningList, 180000);
    },
    // 获取网点预警
    getWarningList() {
      return new Promise((resolve, reject) => {
        // this.loadingInstance = Loading.service({ fullscreen: true });
        // this.loadingInstance = true;
        getWarningList(this.form).then(res => {
          this.rightObj = { ...res };
          this.rightObj.updateTime = this.time(new Date());
          const arr = res.warningDataVOList;
          const arrays = [];
          if (arr.length === 0) {
            // this.map.clearOverlays();
            this.points = arrays;
            this.center = "宁波";
            this.loadingInstance = false;
            resolve(arrays);
          } else {
          arr.forEach(ele => {
            /**
             * carParkingState 判断网点状态 1满 2空 3正 4预警
             * lossElectricCarCount 是否亏电
             * offlineCarCount 是否离线
             */
            const ico = {
              url: "",
              size: { width: 50, height: 74 }
            };
            const labelStyle = {
              background: "",
              color: "#fff",
              fontSize: "17px",
              width: "35px",
              height: "36px",
              textAlign: "center",
              lineHeight: "36px",
              borderStyle: "none"
            };
            if (ele.carParkingState === "1") {
              ele.showLabel = false;
              ele.parkingStateName = "满车位";
              if (ele.lossElectricCarCount > 0 && ele.offlineCarCount > 0) {
                ico.url = require("../../assets/images/icon_manAll.png");
              } else if (ele.lossElectricCarCount > 0) {
                ico.url = require("../../assets/images/icon_manK.png");
              } else if (ele.offlineCarCount > 0) {
                ico.url = require("../../assets/images/icon_manL.png");
              } else {
                ico.url = require("../../assets/images/icon_man.png");
              }
            } else if (ele.carParkingState === "2") {
              ele.showLabel = false;
              ele.parkingStateName = "无车";
              ico.url = require("../../assets/images/icon_not.png");
            } else if (ele.carParkingState === "3") {
              ele.showLabel = true;
              ele.parkingStateName =
                "空闲车位(" + (ele.totalParkingPlace - ele.noOrderCarNum) + ")";
              labelStyle.background = "#5EC74F";
              if (ele.lossElectricCarCount > 0 && ele.offlineCarCount > 0) {
                ico.url = require("../../assets/images/icon_sucAll.png");
              } else if (ele.lossElectricCarCount > 0) {
                ico.url = require("../../assets/images/icon_sucK.png");
              } else if (ele.offlineCarCount > 0) {
                ico.url = require("../../assets/images/icon_sucL.png");
              } else {
                ico.url = require("../../assets/images/icon_suc.png");
              }
            } else if (ele.carParkingState === "4") {
              ele.showLabel = true;
              ele.parkingStateName =
                "空闲车位(" + (ele.totalParkingPlace - ele.noOrderCarNum) + ")";
              labelStyle.background = "#EA9F4F";
              if (ele.lossElectricCarCount > 0 && ele.offlineCarCount > 0) {
                ico.url = require("../../assets/images/icon_waringAll.png");
              } else if (ele.lossElectricCarCount > 0) {
                ico.url = require("../../assets/images/icon_waringK.png");
              } else if (ele.offlineCarCount > 0) {
                ico.url = require("../../assets/images/icon_waringL.png");
              } else {
                ico.url = require("../../assets/images/icon_waring.png");
              }
            }
            const obj = {
              id: ele.id,
              position: { lng: ele.lng, lat: ele.lat },
              icon: ico,
              title: ele.name,
              noOrderCarNum: ele.noOrderCarNum + "",
              showLabel: ele.showLabel,
              labelStyle: labelStyle,
              offset: { width: 7, height: 17 },
              name: ele.name,
              companySn: ele.companySn,
              cTypeShow: ele.cTypeShow,
              carParkingState: ele.carParkingState,
              parkingStateName: ele.parkingStateName,
              totalParkingPlace: ele.totalParkingPlace,
              offlineCarCount: ele.offlineCarCount,
              freeCarCount: ele.freeCarCount,
              unUseCarCount: ele.unUseCarCount,
              lossElectricCarCount: ele.lossElectricCarCount,
              orderCarCount: ele.orderCarCount,
              faultCarCount: ele.faultCarCount,
              operationCarCount: ele.operationCarCount,
              troubleCarCount: ele.troubleCarCount
            };
            arrays.push(obj);
          });
          this.points = arrays;
          this.center = this.points[0].position;
          this.loadingInstance = false;
          resolve(arrays);
          }
        });
      });
    },
    // 获取网点车辆状态的接口
    getDicts() {
      return new Promise((resolve, reject) => {
        getDicts({ groupCode: "carBizState" }).then(res => {
          const arr = [];
          res.forEach(ele => {
            if (
              ele.cnName === "亏电" ||
              ele.cnName === "故障中" ||
              ele.cnName === "运维中" ||
              ele.cnName === "停用" ||
              ele.cnName === "空闲" ||
              ele.cnName === "事故中" ||
              ele.cnName === "占位预约中"
            ) {
              arr.push(ele);
            }
          });
          this.options1 = arr;
          resolve();
        });
      });
    },
    // 获取品牌的接口
    getBrands() {
      return new Promise((resolve, reject) => {
        getDicts({ groupCode: "carBrand" }).then(res => {
          this.options2 = res;
          resolve();
        });
      });
    },
    // 获取工单任务类型
    selectWorkOrderTypeDicts() {
      return new Promise((resolve, reject) => {
        selectWorkOrderTypeDicts().then(res => {
          this.options3 = res;
          resolve();
        });
      });
    },
    // 获取省市区的接口
    getAllAreasInfo() {
      return new Promise((resolve, reject) => {
        getAllAreasInfo({ level: 4 }).then(res => {
          this.optionsTree = res;
          resolve();
        });
      });
    },
    // 初始化地图
    initMap({ BMap, map, marker }) {
      return new Promise((resolve, reject) => {
        this.map = map;
        this.BMap = BMap;
        resolve();
      });
    },
    // 监听窗口的大小
    changeCity(val) {
      this.form.areaId = val[val.length - 1];
      // if (val) {
      //   this.center = val[val.length - 1];
      // } else {
      //   this.center = "宁波";
      // }
    },
    // 选择公司的级联效果
    changeCompany(val) {
      this.form.companySn = val[val.length - 1];
    },
    // 查询的结果
    submityMap() {
      this.loadingInstance = true;
      this.getWarningList();
    },
    // 鼠标移动到坐标的效果
    changeStyle(element, ev) {
      ev.target.V.style.border = "4px solid #ddd";
      ev.target.V.style.borderImage =
        "-webkit-linear-gradient(#F80, #2ED) 20 20";
      ev.target.V.style.borderImage = "-moz-linear-gradient(#F80, #2ED) 20 20";
      ev.target.V.style.borderImage = "linear-gradient(#F80, #2ED) 20 20";
    },
    // 鼠标移出坐标的效果
    goAway(element, ev) {
      ev.target.V.style.borderStyle = "none";
    },
    // 点击的效果
    infoWindowOpen(row) {
      this.loadingInstance = true;
      this.details = { ...row };
      this.dotName = this.details.name;
      this.details.name = this.cutString(this.details.name, 14);
      this.getBrands().then(() => {
        this.searchCar().then(() => {
          this.showDetails = true;
          this.loadingInstance = false;
        });
      });
    },
    // 显示生成工单
    showFun1(row) {
      this.carName = row.vehiclePlateId;
      this.formTn.carId = row.id;
      this.formTn.carNo = row.vehiclePlateId;
      this.formTn.modelsId = row.modelId;
      this.formTn.carBusType = row.type;
      this.formTn.workType = "";
      this.formTn.replaceDotId = "";
      this.formTn.replaceDotName = "";
      this.formTn.remark = "";
      this.showDetails1 = true;
    },
    // 隐藏生成工单
    hideFun1() {
      this.showDetails1 = false;
    },
    // 关闭map的信息框
    closeMap() {
      this.showDetails1 = false;
      this.showDetails = false;
    },
    // 查询车辆的列表
    searchCar() {
      return new Promise((resolve, reject) => {
        this.pagination.page = 1;
        this.formTs.dotId = this.details.id;
        this.formTn.dotId = this.details.id;
        this.formTn.dotName = this.details.name;
        getCarByDot(this.formTs).then(res => {
          this.pagination.total = res.length;
          this.cars = res;
          this.paginationFun();
          resolve();
        });
      });
    },
    // 分页查询的方法
    paginationFun() {
      this.carList = [];
      let len = 0;
      if (this.pagination.page * this.pagination.pageSize >= this.cars.length) {
        len = this.cars.length;
      } else {
        len = this.pagination.page * this.pagination.pageSize;
      }
      for (
        let i = (this.pagination.page - 1) * this.pagination.pageSize;
        i < len;
        i++
      ) {
        this.carList.push(this.cars[i]);
      }
    },
    // 选择网点的效果
    chooseNet() {
      this.getBranchDotsByPage().then(() => {
        this.dialogVisible = true;
      });
    },
    // 点击分页的效果
    handleCurrentChangeMap(val) {
      this.pagination.page = val;
      this.paginationFun();
    },
    // 选择工单的网点查询公司
    changeCompanyX(val) {
      this.formXn.companySn = val[val.length - 1];
    },
    // 查询网点的方法
    getBranchDotsByPage() {
      return new Promise((resolve, reject) => {
        this.formXn.companySn = this.details.companySn;
        getBranchDotsByPage(this.formXn).then(res => {
          this.paginationX.total = res.total;
          this.netList = res.list;
          resolve();
        });
      });
    },
    // 根据条件查询网点的方法
    searchNet() {
      this.formXn.start = 1;
      this.getBranchDotsByPage();
    },
    // 选择网点的分页 显示多少条
    handleSizeChangeX(val) {
      this.formXn.pageSize = val;
      this.getBranchDotsByPage();
    },
    // 选择网点的分页 点击当前页
    handleCurrentChangeX(val) {
      this.formXn.start = val;
      this.getBranchDotsByPage();
    },
    // 选择网点的结果
    selectDot(row) {
      this.chooseDotId = row.id;
    },
    // 确定网点的结果
    confirmFun() {
      this.formTn.replaceDotId = this.chooseDotId;
      this.formTn.replaceDotName = this.chooseName;
      this.dialogVisible = false;
    },
    // 创建工单
    createOrder(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loadingInstance = true;
          addWorkOrder(this.formTn)
            .then(res => {
              this.$message({
                message: "生成成功",
                type: "success"
              });
              this.showDetails1 = false;
              getCarByDot(this.formTs).then(res => {
                this.pagination.total = res.length;
                this.cars = res;
                this.paginationFun();
                this.loadingInstance = false;
              });
            })
            .catch(e => {
              this.loadingInstance = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
.map {
  min-width: 100%;
  height: 960px;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
.map-cell {
  position: relative;
  width: 515px;
  height: 90px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 7px;
  padding: 10px 13px;
}
.map-cell span {
  display: inline-block;
}
.map-span-1 {
  font-size: 16px;
  color: black;
}
.map-span-2 {
  font-size: 13px;
  color: red;
  line-height: 1.8;
}
.map-span-3 {
  font-size: 13px;
  color: black;
  line-height: 1.8;
  margin-left: 20px;
}
.map-span-4 {
  font-size: 13px;
  color: black;
}
.map-list {
  position: relative;
  width: 515px;
  height: 76px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 7px;
  padding: 10px 13px;
  margin-top: 15px;
}
.map-list-btn1 {
  position: absolute;
  right: 30px;
  bottom: 10px;
}
.map-dialog {
  padding: 10px 13px;
  width: 360px;
  height: 260px;
  background: #fff;
  border-radius: 4px;
}
.map-close {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 24px;
  cursor: pointer;
}
.right-div-cont {
  background: #fff;
  width: 220px;
  height: 248px;
  border-radius: 4px;
  margin-top: 10px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 10px;
  padding-right: 10px;
}
.right-div .s1 {
  display: inline-block;
  width: 26px;
  height: 13px;
  background: #c7c7c8;
  border-radius: 2px;
  line-height: 1;
  float: left;
  margin-top: 3px;
}
.right-div .s2 {
  float: left;
  display: inline-block;
  color: #6a6e7a;
  font-size: 13px;
  margin-left: 4px;
  margin-top: 3px;
  line-height: 1;
}
</style>

