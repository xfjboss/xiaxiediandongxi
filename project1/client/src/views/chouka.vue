<template>
    <div class="zong1">
        <div>{{this.duixiang[0].name}}{{this.duixiang[0].gkp}}</div>
        <el-button type="primary" class="anniu1" @click="chouyici(info)">抽一次</el-button>
        <el-button type="primary" class="anniu2" @click="choushici(info)">抽十次</el-button>
    </div>
    
</template>>

<style scoped>
.zong1 {
  width: 100%;
  height: 100%;
  background: url(../assets/chouka.jpg) ;
  background-size: 100% 100%;
}
.anniu1 {
  position:absolute;
  left:550px;
  top:600px;
  width: 200px;
  height: 80px;
  border-radius: 20px;
}
.anniu2 {
  position:absolute;
  left:850px;
  top:600px;
  width: 200px;
  height: 80px;
  border-radius: 20px;
}
</style>


<script>
  export default{
    name:"chouka",
    data(){
      return{
        duixiang:[]
      }
    },
    methods:{
      chouyici(xinxi){
        xinxi.gkp = this.duixiang[0].gkp;
        //console.log(xinxi)
        if(xinxi.gkp<=2){
          this.$message({
              type:"error",
              message:"石头不足!"
          });
        }else{
          this.$axios.post("/api/users/choukayici",xinxi)
          .then((res) => {//显示结果 同步vuex
              console.log(res.data.jg+res.data.shitou);
              xinxi.gkp = res.data.shitou;
              //console.log(xinxi);
              this.$store.dispatch("setUser",xinxi);
              this.getprofile();
          });
        }
      },
      choushici(xinxi){
        xinxi.gkp = this.duixiang[0].gkp;
        if(xinxi.gkp<=29){
          this.$message({
              type:"error",
              message:"石头不足!"
          });
        }else{
          this.$axios.post("/api/users/choukashici",xinxi)
          .then((res) => {//显示结果 同步vuex
              console.log(res.data.jg+res.data.shitou);
              xinxi.gkp = res.data.shitou;
              //console.log(xinxi);
              this.$store.dispatch("setUser",xinxi);
              this.getprofile();
          });
        }
      },

      getprofile(){
          this.$axios.get('/api/users/getgkp/'+this.$store.getters.user.id)
          .then(res => {
              this.duixiang = [];
              this.duixiang.push(res.data);       
          }).catch((err) => {});
      }
      
    },
    computed:{
        info(){
            return this.$store.getters.user;
        }
    },
    created(){
      this.getprofile();
    }
  }
</script>

