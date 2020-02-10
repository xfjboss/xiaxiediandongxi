<template>
    <div class="home">
        <div class="container">

           <el-form :model="enterghinfo" ref="enterghInfo" label-width="60px" class="entergh"> 
                    <el-form-item label="公会名" prop="ghname">
                        <el-input v-model="enterghinfo.ghname" placeholder="请输入您想加入的公会名"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('enterghInfo')">申请</el-button>
                    </el-form-item>
                    
            </el-form>

        </div>
    </div>
</template>
<script>
  export default{
    name:"entergh",
    data(){
      return{
        enterghinfo:{
          ghname:"",
          shenqingrenid:""
        }
      }
    },
    methods:{
      submitForm(info){
        this.enterghinfo.shenqingrenid = this.user.id;
        //console.log(this.enterghinfo);
        this.$axios.post("/api/users/gonghuishenqing/"+this.user.id,this.enterghinfo)
        .then((res) => {
          //console.log(res.data);
          this.$message({
                      type:"success",
                      message:"加入成功!"
                  });
          this.$store.dispatch("setgonghui",res.data.gonghui);
        }).catch((err) => {});
      }
    },
    computed:{
      user(){
        return this.$store.getters.user;
      },
    }
  }
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: url(../assets/moshou3.jpg) ;
  background-size: 90% 100%;
}
.container {
  position: absolute;
  top: 3.7%;
  left: 10%;
  width: 25%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.377);
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
}
.entergh {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.473);
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(53, 52, 52, 0.8);
}
.submit_btn {
  width: 100%;
  height: 100%;
}
</style>