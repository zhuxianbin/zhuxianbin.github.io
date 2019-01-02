<template>
  <div class="sel-amout-cont" @mouseover="lockin" @mouseout="lockout">
    <el-input v-model="state3" @focus="inhand" clearable/>
    <div class="el-amout-search" v-show="showTree">
      <el-tree ref="treeObj" :data="resultArr" 
      show-checkbox 
      node-key="uuid"
      :props="defaultProps" 
      :default-expanded-keys="defaultExpanded"
      @check-change="handleCheck">
      </el-tree>
    </div>
  </div>
</template>

<script>
import { selectExperienceStoreTree } from "@/api/commisOrder";
export default {
  model: {
     prop: 'storeIds',
     event: 'changeVal'
  },
  props: ["sId", "storeIds"],
  data() {
    return {
      defaultProps: {
        label: "companyName",
        value: "storeCode",
        children: "children",
        disabled: (d, n) => {
          if (d.enableStatus !== 0) {
            return false;
          } else {
            return true;
          }
        }
      },
      state3: "",
      idStr: "",
      divState: false,
      resultArr: [],
      showTree: false,
      selectObjArr: [],
      companyIds: [10, 18, 19, 20, 21, 22, 23, 24, 40, 58, 38],
      defaultExpanded: []
    };
  },
  mounted() {
    // 监听鼠标事件
    window.document.body.onmousedown = e => {
      this.outhand();
    };
    // 初始化确定是否有选中
    this.selectExperienceStoreTree().then(res => {
      this.getMenuName(res);
      this.$refs.treeObj.setCheckedNodes(this.selectObjArr);
    })
  },
  methods: {
    // 获取关联体验店的功能
    selectExperienceStoreTree() {
      return new Promise((resolve, reject) => {
        selectExperienceStoreTree({id: this.sId}).then(res => {
          this.resultArr = res;
          resolve(res);
        })
      });
    },
    // 锁的功能
    lockin() {
      this.divState = true;
    },
    lockout() {
      this.divState = false;
    },
    inhand() {
      this.showTree = true;
    },
    outhand() {
      if (this.divState) {
        this.showTree = true;
      } else {
        this.showTree = false;
      }
    },
    // 遍历树形
    getMenuName(menus) {
      for (const value of menus) {
        if (value.selectStatus !== 0) {
          this.selectObjArr.push(value);
        }
        if (this.companyIds.includes(value.companyId)) {
          this.defaultExpanded.push(value.uuid);
        }
        if (value.children) {
          this.getMenuName(value.children);
        }
      }
    },
    // 选择的结果
    handleCheck() {
      const arr = this.$refs.treeObj.getCheckedNodes();
      const ids = [];
      const names = [];
      arr.forEach(element => {
        if (element.storeCode) {
          ids.push(element.storeCode);
          names.push(element.companyName);
        }
      });
      this.state3 = names.toString();
      this.idStr = ids.toString();
      this.changeVal();
    },
    // 绑定事件
    changeVal() {
      this.$emit("changeVal", this.idStr);
    }
  },
  watch: {
    state3(val) {
      if (!val) {
        this.$refs.treeObj.setCheckedKeys([]);
        this.idStr = "";
        this.changeVal();
      }
    },
    storeIds(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="less">
.sel-amout-cont {
  position: relative;
  width: 100%;
  height: auto;
}
.el-amout-search {
  width: 100%;
  position: absolute;
  top: 38px;
  left: 0px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 5000;
  border: 1px solid #dcdee5;
  background-color: #fff;
}
</style>


