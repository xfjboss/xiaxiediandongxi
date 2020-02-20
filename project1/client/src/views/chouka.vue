<template>
    <div class="zong1">
        <h4 v-text="this.duixiang[0].name"></h4>
        <h4 v-text="this.duixiang[0].gkp"></h4>
        <el-button type="primary" class="anniu1" @click="chouyici(info)">抽一次</el-button>
        <el-button type="primary" class="anniu2" @click="choushici(info)">抽十次</el-button>

        <Xinfeng :xinfeng="xinfengxinxi" :chuhuo="xf_jieguo"></Xinfeng>
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
import Xinfeng from '../components/xinfeng';
  export default{
    name:"chouka",
    data(){
      return{
        duixiang:[{name:"123",gkp:100}],
        xinfengxinxi:{
          show:false,
          title:"",
          rowid:""
        },
        xf_jieguo:""
      }
    },
    methods:{
      async chouyici(xinxi){
        xinxi.gkp = this.duixiang[0].gkp;
        //console.log(xinxi)
        if(xinxi.gkp<=2){
          this.$message({
              type:"error",
              message:"石头不足!"
          });
        }else{
          await this.$axios.post("/api/users/choukayici",xinxi)
          .then((res) => {//显示结果 同步vuex 因为要最后显示页面，避免axios拦截动画与页面动画重复，所以用async await
              console.log(res.data.jg+res.data.shitou);
              xinxi.gkp = res.data.shitou;//这一行貌似是废的

              this.xf_jieguo = res.data.jg;

              //console.log(xinxi);
              this.$store.dispatch("setUser",xinxi);
              this.getprofile();
          });
          this.xinfengxinxi.show = true;//我们希望这行最后执行，所以用async代码块
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
    components:{
        Xinfeng
    },
    created(){
      this.getprofile();
    }
  }
</script>

