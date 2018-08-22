<template>
    <div class='category'>
        <div class='category-list'>
            <div class='category-list-title'>教育分类:</div>
            <div class='category-list-items'>
              <span @click='doSelect({},0);rows.active = ""' :class='{active:rows.active===""}' class='category-item'>全部</span>
              <template v-for="(item,index) in rows.items">
                  <span 
                  :key='item.id' 
                  @click='doSelect(item,0);rows.active = index' 
                  :class='{active:rows.active===index}' 
                  class='category-item'>{{item.name}}</span>
              </template>
            </div>
        </div>
        <div class='category-list' v-if='rows_2.items.length>0'>
          <div class='category-list-title'>职业资格:</div>
            <div class='category-list-items'>
              <!-- <span @click='doSelect(0,1,0)' class='category-item'>全部</span> -->
              <template v-for="(item,index) in rows_2.items">
                  <span :key='item.id' @click='doSelect(item,1);rows_2.active = index' :class='{active:rows_2.active===index}' class='category-item'>{{item.name}}</span>
              </template>
            </div>
        </div>
        <!-- <div class='category-list'></div> -->
    </div>
</template>

<script>
import { mapState } from "vuex";
import { getCategory } from "@/api";
export default {
  props: {
    category: {
      type: [Number, String],
      default() {
        return '';
      }
    }
  },
  data() {
    console.log(this.category,"category")
    return {
      rows: { active: '', items: [] },
      rows_2: { active: '', items: [] },
      selected: []
    };
  },
  computed: {
    ...mapState({
      cateList: state => state.cateList
    })
  },
  methods: {
    doSelect(item, level, index) {
      if (level === 0) {
        this.rows_2.items = item.children || [];
        this.rows_2.active = "";
      }
      this.selected[level] = item;
      this.$emit("update:category", item.id);
      this.$emit("change", this.selected.map(item => item.id));
    },
    // getCategory() {
    //   getCategory().then(({ data }) => {
    //     this.rows.items = data;
    //   });
    // }
  },
  // watch:{
  //   cateList(){
  //     console.log(this);
  //   }
  // },
  created() {
    this.rows.items = this.cateList;
  }
};
</script>

<style lang="less" scoped>
.category {
  border: 1px solid #e6e6e6;
  background: #fff;
  padding: 10px;
  .category-item {
    display: inline-block;
    margin: 0 10px;
    &:hover,
    &.active {
      color: #f80;
      cursor: pointer;
    }
  }
}
.category-list {
  overflow: hidden;
  line-height: 45px;
  border-bottom: 1px solid #e6e6e6;
  padding-left: 100px;
  .category-list-title {
    float: left;
    margin-left: -100px;
    width: 80px;
    text-align: right;
    color: #999;
  }
}
</style>
