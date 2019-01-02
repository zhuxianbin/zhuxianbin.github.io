<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container" :style="$route.query.hiddenLeft ? 'margin-left: 0px' : ''">
      <div class="header-container">
        <navbar v-if="$route.query.hiddenLeft ? false : true"></navbar>
        <tags-view></tags-view>
      </div>
      <div class="body-container" :style="$route.query.hiddenLeft ? 'padding-top: 30px' : 'padding-top: 84px'">
        <app-main></app-main>
      </div>
    </div>
    <changeServer />
  </div>
</template>

<script>
import {
  Navbar,
  Sidebar,
  AppMain,
  TagsView,
  AppHeader,
  changeServer
} from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    AppHeader,
    changeServer
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  created() {},
  methods: {
    handleClickOutside() {
      this.$store.dispatch("closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style lang="less" scoped>
.clearfix() {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.main-container {
  height: 100%;
  position: relative;
}
.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.header-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 9;
}

.body-container {
  box-sizing: border-box;
  padding-top: 84px;
}
</style>
