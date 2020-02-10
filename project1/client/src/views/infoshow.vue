<template>
    <div class="infoshow">
       <el-row type="flex" class="row-bg" justify="center">
           <el-col :span='8'>
             <div class="user1">
               <div class="user">
                   <img :src="user.avatar" class="avatar" alt="">
               </div>
             </div>
             <div class="user2">
               <div class="user-item">
                    <i class="fa fa-user"></i>
                    <span>{{user.name}}</span>
                </div>
                <div class="user-item">
                    <i class="fa fa-cog"></i>
                    <span>{{user.identity=="manager"?"会长":"团员"}}</span>
                </div>
             </div>
           </el-col>
           <el-col :span='16'>
               <div class="userinfo">
                   
               </div>
           </el-col>
       </el-row>
    </div>
</template>>

<script>
export default {
    name:'infoshow',
    computed:{
        user(){
            return this.$store.getters.user;
        }
    }
}
</script>


<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
  background-color:rgb(209, 231, 229);
  background-size: 100% 100%;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 12%;
  margin: 5px;
}
.user1 {
  width: 99%;
  height: 30%;
  border-radius: 10px;
  margin:10px;
  background-color:white;
  border: 0.4px solid;
  border-color: rgb(209, 208, 208);
}
.user2 {
  width: 99%;
  height: 65%;
  border-radius: 10px;
  margin:10px;
  border: 0.4px solid;
  border-color: rgb(209, 208, 208);
  background-color:white;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  width:95%;
  height: 96%;
  background-color:white;
  margin: auto;
  margin-top: 10px;
  border: 0.4px solid;
  border-color: rgb(209, 208, 208);
  border-radius: 15px;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: rgb(10, 10, 10);
}

</style>