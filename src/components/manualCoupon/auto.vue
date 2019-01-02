<template>
   <div>
   <el-form :model='ruleSearch'  :inline="true">
        <el-form-item label='规则名称' prop="name">
            <el-input v-model='ruleSearch.name' placeholder="请输入规则名称">
            </el-input>
        </el-form-item>
         <el-form-item label='规则类型' prop="type">
            <el-select placeholder="请选择" v-model='ruleSearch.type'>
               <el-option label="订单消费满额" value="order"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label='启用' prop="isEnable">
            <el-select placeholder="请选择" v-model='ruleSearch.isEnable'>
               <el-option label="全部" value=""></el-option>
               <el-option label="启用" value="1"></el-option>
               <el-option label="禁用" value="0"></el-option>
              </el-select>
        </el-form-item>
        <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
    </el-form>
    <div style="margin:0 0 20px 0">
        <el-button type="primary" @click="addRule">添加 </el-button>
        <el-button type="danger" @click="deleteRule">删除 </el-button>
    </div>
    <el-table :data="couponRule" 
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
        <el-table-column prop="name" label="规则名称"></el-table-column>
        <el-table-column prop="type" label="规则类型">
            <template slot-scope="scope">
            <span>{{scope.row.type=='order'?'订单消费满额':'其他'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="validDate" label="有效日期"></el-table-column>
        <el-table-column prop="isEnable" label="是否启用">
            <template slot-scope="scope">
            <span>{{scope.row.isEnable=='0'?'禁用':'启用'}}</span>
          </template>
        </el-table-column>
         <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="enableDisable    (scope.row,scope.$index)" >
            <span>{{scope.row.isEnable==1?'禁用':'启用'}}</span>
             </el-button>
          
          <el-button type="text" size="small" @click="editRule(scope.row.id)" >编辑</el-button>  
          <!-- <el-button type="text" size="small">记录</el-button> -->
         
        </template>
      </el-table-column>
  
    </el-table>
   </div>
    

</template>
<script>
export default {
   name:"rule",
   props:["ruleSearch","couponRule",'multipleSelect','deleted'],
    watch: {
    deleted: {
      handler() {
        this.$refs.multipleTableY.clearSelection();
      },
      deep: true
    },
    couponRule:{
       handler() {
        this.checked()
      },
      deep: true
    }
  },
   methods:{
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
     
    },
      selectAll(s){
      //this.multipleSelect =[]
      if(s.length){
        for(var i =0;i<s.length;i++){
          this.multipleSelect.push(s[i]);
        }
        this.couponRule.forEach(item=>{
          item.selected=1
        })
      }else{
        this.multipleSelect.splice(0,this.multipleSelect.length);
        this.couponRule.forEach(item=>{
          item.selected=0;
        })
      }
    },
     checked() {
      if (this.couponRule.length > 0) {
        this.couponRule.forEach(ele => {
          if (ele.selected === 1) {
            console.log(12)
            this.$refs.multipleTableY.toggleRowSelection(ele, true);
          } else {
            this.$refs.multipleTableY.toggleRowSelection(ele, false);
          }
        });
      }
    },
     search(){
         this.$emit("search",this.ruleSearch);
     },
     enableDisable(data,index){
         //console.log(data)
         this.$emit("enableDisable",data,index)
     },
     deleteRule(){
       this.$emit('deleteRule',this.multipleSelect)
     },
     addRule(){
       this.$emit('addRule')
     },
     editRule(data){
       this.$emit('editRule',data)
     }
    
   
  }
}
 
</script>
