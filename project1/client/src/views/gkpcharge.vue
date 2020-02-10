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

                <p class="title">充值接口(伪)</p>
                <el-form :model="gkpchongzhi" :rules="rules" ref="gkpCharge" label-width="120px" class="loginForm">

                    <el-form-item label="充值账户" prop="chongren" class="zizi">
                        <el-input class="biaodan1" v-model="gkpchongzhi.chongren" placeholder="请输入充值账户ID"></el-input>
                    </el-form-item>

                    <el-form-item label="充值数额" prop="chongshu" class="zizi">
                        <el-input class="biaodan2" v-model.number="gkpchongzhi.chongshu" placeholder="请输入充值点数"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" class="submit_btn1" @click="chonggkp('gkpCharge')">充值</el-button>
                    </el-form-item>
                </el-form>


            </div>
        </div>
    </div>
</template>

<script>
  export default{
    name:"gkpcharge",
    data(){
        const shuziyanzheng = (rule, value, callback) => {
            // 输入 8--，value 为 8
            // 估计这里内部使用了 parseInt() / parseFloat()
            value = Number(value)
            if (value <= 0 || value > 500) {
                callback(new Error('充值点数最小为1，最大为500'))
            } else {
                callback()
            }
        }


      return{
        gkpxinxi:[],
        gkpchongzhi:{
            chongshu:10,
            chongren:this.$store.getters.user.name
        },

        rules:{
                    chongren:[
                        {
                            required:true,message:"必须填写充值帐户ID",trigger:"blur"
                        }
                    ],
                    chongshu:[
                        {
                            required:true,message:"请填写充值数额",trigger:"blur"
                        },
                        {
                            type:"number", message:"请规范填写",trigger:"blur"
                        },
                        {
                            validator: shuziyanzheng, // 自定义验证
                            trigger: "blur"
                        },
                    ],
                },

      }
    },
    methods:{
      chonggkp(item){
        this.$refs[item].validate((valid) => {
            if(valid){
                this.$axios.post("/api/users/gkpchongzhi/"+this.user.id,this.gkpchongzhi)
                .then((res) => {
                  this.$message({
                      type:"success",
                      message:"充值成功!"
                  });
                  this.user.gkp = this.user.gkp + this.gkpchongzhi.chongshu;
                  this.$store.dispatch("setUser",this.user);
                  console.log(this.user)
                  this.getprofile();
                });
            }
        })
      },
      getprofile(){
          this.$axios.get('/api/users/getgkp/'+this.$store.getters.user.id)
          .then(res => {
              this.gkpxinxi = [];
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
  color: black;
}
.container1 {
  width: 60%;
  height: 100%;
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
.submit_btn1 {
  margin-top: 50px;
  margin-left: -15%;
  width: 70%;
  height: 15%;
  box-shadow: 0px 5px 10px rgba(31, 29, 29, 0.8);
}
.loginForm {
  margin-top: 20px;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  color: black;
}
.biaodan1{
    box-shadow: 0px 5px 10px rgba(31, 29, 29, 0.8);
    width: 70%;
    margin-left: -15%;
}
.biaodan2{
    box-shadow: 0px 5px 10px rgba(31, 29, 29, 0.8);
    width: 70%;
    margin-left: -15%;
}
/*.zizi .el-form-item__label{
    color: rgb(0, 0, 0);
    font-size: 17px;
}*/
</style>