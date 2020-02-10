<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="4" class="logo-container">
                <img src="../assets/moshoulogo1.png" class="logo" alt="">
                <span class="title">魔兽世界工会管理系统</span>
            </el-col>


            <el-col :span="4" class="logo-container1" v-if="gonghui">
                <span class="title1">亲您还没有加入工会      </span>
                <el-button type="warning" @click="jiarugonghui()" size="small">加入公会</el-button>
            </el-col>
            <el-col :span="4" class="logo-container1" v-if="!gonghui">
                <span class="title1">工会:{{this.user.gonghui}}</span>
            </el-col>

            <el-col :span="4" class="user">
                <div class="userinfo">
                    <img :src="user.avatar" class="avatar" alt="">
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarname">{{user.name}}</p>
                    </div>
                    <span class="username">
                        <!--下拉箭头-->
                        <el-dropdown trigger="hover" @command='setDialogInfo'>
                          <span class="el-dropdown-link">
                            关于用户<i class="el-icon-caret-bottom el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="info">个人信息</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
            </el-col>
        </el-row>
    </header>
</template>

<script>
export default{
    name:"head-nav",
    computed:{
      user(){
        return this.$store.getters.user;
      },
      gonghui(){
        if(this.$store.getters.user.gonghui=="")
          return true;
        else return false;
      }
    },
    methods:{
      setDialogInfo(cmdItem){
        switch(cmdItem){
          case "info":
            this.showInfoList();
            break;
          case "logout":
            this.logout();
            break;
        }
      },
      showInfoList(){
        this.$router.push('/infoshow')
      },
      logout(){
        localStorage.removeItem('eleToken');
        this.$store.dispatch('clearCurrentState');
        this.$router.push('/login');
      },
      jiarugonghui(){
        this.$router.push('/entergh')
      }
    }
};
</script>


<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 700px;
}
.logo-container1 {
  line-height: 60px;
  min-width: 350px;
  text-align: right;
}
.logo {
  height: 50px;
  width: 150px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
  text-shadow: 5px 5px 10px black;
}
.title1 {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
  text-shadow: 5px 5px 10px black;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown{
  color:rgb(255, 255, 255);
}
</style>