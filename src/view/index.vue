<template>
  <div class="body">
    <el-row>
      <el-col :span="3">
        <el-menu style="height: 100vh;" text-color="black" active-text-color="lightseagreen" :router="true"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <!-- <el-submenu index="1" v-if="userAuth">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/user">用户列表</el-menu-item>
              <el-menu-item index="/role">角色列表</el-menu-item>
            </el-submenu> -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/user">用户列表</el-menu-item>
              <el-menu-item index="/role">角色列表</el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>脉搏管理</span>
              </template>
              <el-menu-item index="/calendar">日历排程</el-menu-item>
              <el-menu-item index="/question">问题管理</el-menu-item>
              <el-menu-item index="/group">规则管理</el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="2" v-if="activityAuth">
              <template slot="title">
                <i class="el-icon-s-help"></i>
                <span>活动资料管理</span>
              </template>
              <el-menu-item index="/upload">上传活动资料</el-menu-item>
              <el-menu-item index="/activity">活动资料列表</el-menu-item>
              <el-menu-item index="/myProject">我的项目</el-menu-item>
            </el-submenu> -->
          </el-menu>
      </el-col>
      <el-col :span="21">
        <div class="header" style="display:flex;justify-content: end;align-items: center;">
          <button class="btn" @click="logout()">
              <p>Logout</p>
              <i class="el-icon-right"></i>
          </button>
        </div>
        <div class="main">
          <router-view/>
        </div>
      </el-col>
    </el-row>
</div>
</template>

<script>
import store from '@/store/index';
  export default { 
    data() {
      return {
        userAuth: false,
        // activityAuth: true
      }
    },
    created() {
      console.log(store.state)
      if(store.state.permList.includes("user")){
        this.userAuth = true
      } else if (localStorage.getItem('qx').includes('user')) {
        this.userAuth = true
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      logout() {
        localStorage.clear()
				sessionStorage.clear()
        this.$router.push({ path:'/login' })
      }
    }
  }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 70px;
    border-bottom: lightseagreen 1px solid;
  }
  .el-menu {
    border:  lightseagreen 1px solid;
    /* border-left: lightseagreen 1px solid; */
  }
.btn {
  width: 140px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  position: relative;
  background-color: transparent;
  transition: .2s cubic-bezier(0.19, 1, 0.22, 1);
  opacity: 0.6;
  color: lightseagreen;
  cursor: pointer;
}

.btn::after {
  content: '';
  border-bottom: 3px double rgb(18, 107, 103);
  width: 0;
  height: 100%;
  position: absolute;
  margin-top: -5px;
  top: 0;
  left: 5px;
  visibility: hidden;
  opacity: 1;
  transition: .2s linear;
}

.btn .icon {
  transform: translateX(0%);
  transition: .2s linear;
  animation: attention 1.2s linear infinite;
}

.btn:hover::after {
  visibility: visible;
  opacity: 0.7;
  width: 90%;
}

.btn:hover {
  letter-spacing: 2px;
  opacity: 1;
}

.btn:hover > .icon {
  transform: translateX(30%);
  animation: none;
}

@keyframes attention {
  0% {
    transform: translateX(0%);
  }

  50% {
    transform: translateX(30%);
  }
}
</style>