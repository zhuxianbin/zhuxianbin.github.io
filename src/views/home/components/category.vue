<template>
    <div class='category'>
        <div class='category-list'>
            <div class='category-list-title'>全部课程:</div>
            <div class='category-list-items'>
                <template v-for="item in rows">
                    <span :key='item.id' class='category-item'>{{item.name}}</span>
                </template>
            </div>
        </div>
        <div class='category-list'></div>
        <div class='category-list'></div>
    </div>
</template>

<script>
import { getCategory } from "@/api";
export default {
  data() {
    return {
      rows: []
    };
  },
  methods: {
    getCategory() {
      getCategory().then(({ data }) => {
        this.rows = data;
      });
    }
  },
  created() {
    this.getCategory();
  }
};
</script>

<style lang="less" scoped>
.category {
  border: 1px solid #e6e6e6;
  background: #fff;
  margin-bottom: -1px;
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
