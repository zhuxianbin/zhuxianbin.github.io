<template>
<div>
         <p>选择优惠券</p>
         <el-form :model='searchCoupon'  :inline="true">
           <el-form-item label='优惠类型' prop="type">
              <el-select placeholder='请选择' v-model='searchCoupon.type'>
                 <el-option label="全部" value=""></el-option>
                 <el-option label="代金券" value="mj"></el-option>
                 <el-option label="折扣券" value="zk"></el-option>
              </el-select>
           </el-form-item>
           <el-form-item label='适用业务' prop="businessType">
              <el-select placeholder="请选择" v-model='searchCoupon.businessType'>
               <el-option label="全部" value=""></el-option>
                <el-option label="整租" value="2"></el-option>
                 <el-option label="长短租" value="1"></el-option>
                 <el-option label="日租" value="5"></el-option>
                 <el-option label="分时" value="3"></el-option>
               <el-option label="集团" value="4"></el-option>
              </el-select>
           </el-form-item>
          <el-form-item label='适用地区' prop="companyId">
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
                <el-button type="primary" @click="search">查询</el-button>
           </el-form-item>
         </el-form>
         <el-table 
             :data="sendCoupon" 
             ref="multipleTableY"
             :row-key="tableRowKey"
             borderstyle="width: 100%"
             height="300"
             border
            @select="handleSelectionChangeY"
              @select-all="selectAll">
            <el-table-column 
               :reserve-selection="true"
               type="selection" 
                width="55">
            </el-table-column>
            <el-table-column fixed prop="name" label="优惠券名称" width="100">
            </el-table-column>
            <el-table-column fixed prop="type" label="类型" width="100">
            </el-table-column>
            <el-table-column fixed prop="stock" label="剩余库存" width="100">
            </el-table-column>
            <el-table-column  fixed prop="number" label="数量" width="150">
            <template slot-scope="scope">
                   <el-input-number v-model="scope.row.number"
                     :min="1" 
                     :max="scope.row.stocked"
                     @change="handleChange(scope.row)"
                     >
                     </el-input-number>
            </template>
            </el-table-column>
            <el-table-column fixed prop="validDate" label="有效日期" width="100">
            </el-table-column>
            <el-table-column fixed prop="businessType" label="适用业务" width="150">
            </el-table-column>
             <el-table-column fixed prop="companies" label="适用地区" >
            </el-table-column>
         </el-table>
         <div style="margin:20px 0 10px;text-align:center" v-if="auto">
             <el-button type="primary" @click="prev" >上一步</el-button>
             <el-button type="primary" @click="submit">提交</el-button>
         </div>
      </div>
</template>

<script>
export default {
  name: "coupon",
  props:["searchCoupon","sendCoupon",'auto'],
  data(){
     return{
        selectedOptionYs:[],
        multipleSelect:[]
     }
    
  },
  created() {
     this.search(this.searchCoupon)
  },
  watch:{
    sendCoupon: {
      handler() {
        this.checked();
      },
      deep: true
    },
  },
  methods:{
   changeCompany(val) {
      this.searchCoupon.companyId = val[val.length - 1];
    },
   //发行优惠券搜索
   search(){
      this.$emit("search", this.searchCoupon);
      this.checked()
   },
   submit(){
      this.$emit("manualSubmit")
   },
   prev(){
      this.$emit('manualprev')
   },
   tableRowKey(row) {
      return row.id;
   },
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
      this.multipleSelect = Array.from(new Set( this.multipleSelect))
     
      this.$emit('couponSelect',this.multipleSelect)
    },
   handleChange(r){
      if (r.selected === 1) {
        this.multipleSelect.forEach((item, index)=>{
           if(item.id == r.id){
              item.number = r.number
           }
        });
      
      }
   },
    selectAll(s){
      this.multipleSelect =s;
      this.sendCoupon.forEach(item=>{
            item.selected=0
      })
      const data = {};
      this.multipleSelect.forEach(item => {
          item.selected=1;
          data[item.id] = item;
      });
      this.sendCoupon.forEach(item => {
          Object.assign(item, data[item.id]);
      });
       this.multipleSelect = Array.from(new Set( this.multipleSelect))
       this.$emit('selectAll',this.multipleSelect)
    
    },
   checked() {
      if (this.sendCoupon.length > 0) {
        this.sendCoupon.forEach(ele => {
          if (ele.selected == 1) {
            this.$refs.multipleTableY.toggleRowSelection(ele, true);
          } else {
            this.$refs.multipleTableY.toggleRowSelection(ele, false);
          }
        });
      }
    },
  }
}
</script>

<style>

</style>

