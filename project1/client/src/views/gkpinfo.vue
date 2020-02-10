<template>
    <div class="home">
        <div class="container">
            <div class="container1">
                <p class="title">以下是您的点数信息：</p>
                <el-table
                :data="gkpxinxi"
                style="width: 90%;margin: auto;border-radius: 5px;margin-top: 30px;box-shadow: 0px 5px 10px rgba(31, 29, 29, 0.8);">
                    <el-table-column
                        prop="name"
                        label="游戏ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="gonghui"
                        label="工会"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="gkp"
                        label="G/DKP(单位：分)">
                    </el-table-column>
                </el-table>

                <el-button type="primary" class="submit_btn" @click="chongzhi()">前往充值</el-button>
            </div>
        </div>
    </div>
</template>

<script>
  export default{
    name:"gkpinfo",
    data(){
      return{
        gkpxinxi:[],
      }
    },
    methods:{
      chongzhi(){
        this.$router.push('/gkpcharge/');
      },
      getprofile(){
          this.$axios.get('/api/users/getgkp/'+this.$store.getters.user.id)
          .then(res => {
              this.gkpxinxi.push(res.data);
             
          }).catch((err) => {});
      },
    },
    computed:{
      user(){
        return this.$store.getters.user;
      },     
    },
    created(){
      this.getprofile();
    },
  }
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: url(../assets/moshou4.jpg) ;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.377);
  text-align: center;
  color: white;
}
.container1 {
  width: 60%;
  height: 60%;
  margin: auto;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.26);
  text-align: center;
  color: white;
  box-shadow: 0px 5px 10px rgba(31, 29, 29, 0.8);
}
.title {
  font-size: 30px;
  text-shadow: 5px 5px 10px black;
  padding-top: 30px;
}
.submit_btn {
  margin-top: 50px;
  margin-left: auto;
  width: 70%;
  height: 10%;
  box-shadow: 0px 5px 10px rgba(31, 29, 29, 0.8);
}

</style>