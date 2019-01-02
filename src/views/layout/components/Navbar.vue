<template>
  <div>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <!-- <el-button  size="mini" plain @click="dialogVisible6=true; diagIndex = 0">修改密码</el-button> -->
      <!-- <el-button  size="mini" plain @click="logout">退出登录</el-button> -->
    </div>
  </el-menu>
  <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible6"
      width="30%">
      <UpdatePwd v-if="diagIndex === 0" v-on:pClose="closeDig"></UpdatePwd>
    </el-dialog>
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth' // 验权
import { mapGetters, mapActions } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import UpdatePwd from './UpdatePwd'

export default {
  data () {
    return {
      dialogVisible6: false,
      diagIndex: -1
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker,
    UpdatePwd
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  methods: {
    ...mapActions('user', {
      _LogOut: 'LogOut'
    }),
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$confirm('确定要退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeToken()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    closeDig() {
      this.dialogVisible6 = false
      this.diagIndex = -1
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    margin-right: 16px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0px 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 20px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 20px;
          height: 20px;
          border-radius: 0px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -14px;
          top: 22px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
