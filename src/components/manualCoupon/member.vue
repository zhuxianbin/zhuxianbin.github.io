<template>
  <div>
    <el-form v-model="member" :inline="true" size="mini" label-width="100px">
      <el-form-item label="手机号">
        <el-input v-model="member.phoneNo" style="width:200px" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="member.name" style="width:200px" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="会员状态">
        <el-select v-model="member.state" style="width:200px" placeholder="请选择状态">
          <el-option label="资料未提交" value="1"></el-option>
          <el-option label="资料待审核" value="2"></el-option>
          <el-option label="资料已审核" value="3"></el-option>
          <el-option label="审核未通过" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单">
        <el-select v-model="member.hasOrder" style="width:200px" placeholder="有无订单">
          <el-option label="有" value="1"></el-option>
          <el-option label="无" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="member.startTime"
          type="date"
          placeholder="注册起始"
          style="width:200px"
          :picker-options="startTime"
          format="yyyy-MM-dd"
        ></el-date-picker>
        <el-date-picker
          v-model="member.endTime"
          type="date"
          placeholder="注册截止"
          style="width:200px"
          format="yyyy-MM-dd"
          :picker-options="endTime"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table
        :data="memberList"
        ref="multipleTableY"
        :row-key="tableRowKey"
        border
        style="width: 100%"
        height="300"
        @selection-change="handleSelectionChange"
      >
        <!-- @select-all="selectAll" -->
        <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
        <el-table-column prop="phoneNo" label="手机号" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="state" label="会员状态" width="100">
          <template slot-scope="scope">
            <span>{{statusText[scope.row.state-1]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="idCode" label="身份证号码"></el-table-column>
        <el-table-column prop="hasOrder" label="有无订单" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.hasOrder=='0'?'无':'有'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="注册时间" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.createDate|time}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row class="mt-10">
      <el-col :span="6">
        <span>已选择{{memberSelect.length}}个会员</span>
        <el-button type="primary" size="mini" @click="show" :disabled="memberSelect.length==0">下一步</el-button>
      </el-col>
      <el-col :span="18" class="t-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="member.pageCurrent"
          :page-sizes="pagination.sizes"
          :page-size="member.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "member",
  props: ["member", "memberList", "pagination", "ids", "showStatus"],
  data() {
    return {
      memberSelect: [],
      all: false,
      statusText: ["资料未提交", "资料待审核", "资料已审核", "审核未通过"],
      //时间范围选择限制
      startTime: {
        disabledDate: time => {
          if (this.member.endTime != "") {
            return (
              time.getTime() > Date.now() ||
              time.getTime() > this.member.endTime
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      endTime: {
        disabledDate: time => {
          return (
            time.getTime() < this.member.startTime ||
            time.getTime() > Date.now()
          );
        }
      }
    };
  },
  created() {
    this.search(this.member);
  },
  watch: {
    'member.start': {
      handler() {
        // this.checked();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 每页多少条
    handleSizeChange(val) {
      this.member.pageSize = val;
    },
    // 当前第几页
    handleCurrentChange(val) {
      this.member.start = val;
    },
    //tabel-key
    tableRowKey(row) {
      //console.log(row);
      return row.id;
    },
    //选中
    handleSelectionChange(s, r) {
      console.log(s, r);
      this.memberSelect = s;
      // if (r.selected === 0) {
      //   r.selected = 1;
      //   this.memberSelect.push(r);
      //   this.$refs.multipleTableY.toggleRowSelection(r, true);
      // } else {
      //   r.selected = 0;
      //   const index = this.memberSelect.findIndex(ele => {
      //     return ele.id === r.id;
      //   });
      //   this.memberSelect.splice(index, 1);
      //   this.$refs.multipleTableY.toggleRowSelection(r, false);
      // }
      // //this.removeRepeat(this.memberSelect, 'id');
      // //this.memberSelect = Array.from(new Set( this.memberSelect))
      this.$emit("memberSelect", this.memberSelect);
    },
    selectAll(s) {
      // console.log(s);
      // this.memberSelect = s;
      // this.memberList.forEach(item => {
      //   item.selected = 0;
      // });
      // const data = {};
      // this.memberSelect.forEach(item => {
      //   item.selected = 1;
      //   data[item.id] = item;
      // });
      // //this.memberSelect = Array.from(new Set( this.memberSelect))

      // this.memberList.forEach(item => {
      //   Object.assign(item, data[item.id]);
      // });
      // this.removeRepeat(this.memberSelect, "id");

      this.$emit("selectAll", this.memberSelect);
      console.log(this.memberSelect);
    },

    removeRepeat(arr, key) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i][key] === arr[j][key]) {
            arr.splice(j, 1);
            j = j - 1; // 关键，因为splice()删除元素之后，会使得数组长度减小，此时如果没有j=j-1的话，会导致相同id项在重复两次以上之后无法进行去重，且会错误删除id没有重复的项。
          }
        }
      }
    },
    //checked获取选择状态
    checked() {
      console.log(33)
      if (this.memberList.length > 0) {
        console.log(33)
        this.memberList.forEach(ele => {
          if (ele.selected == 1) {
            console.log(3)
            this.$refs.multipleTableY.toggleRowSelection(ele, true);
          } else {
            this.$refs.multipleTableY.toggleRowSelection(ele, false);
          }
        });
      }
    },
    //下一步
    show() {
      this.$emit("showNext");
    },
    //搜索会员
    search() {
      if (this.memberSelect.length) {
        this.$refs.multipleTableY.clearSelection();
        this.memberSelect = [];
      }
      this.$emit("searchMember", this.member);
    }
  }
};
</script>