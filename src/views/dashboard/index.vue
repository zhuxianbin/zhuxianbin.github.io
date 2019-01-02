<template>
  <div class="dashboard-container">
    <div class="dashboard-text">集团：{{name}}</div>
    <div class="dashboard-text">账号：{{username}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'username'
    ])
  }
}
</script>

<style lang="less" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
