<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">魔兽世界工会管理</span>

                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
                    
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登陆</el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>>

<script>
import jwt_decode from 'jwt-decode';
import { error } from 'util';
    export default{
        name:"login",
        components:{},
        data(){

            return{
                loginUser:{
                    email:"",
                    pasword:""
                },
                rules:{
                    email:[
                        {
                            type:"email",required:true,message:"邮箱格式不正确",trigger:"blur"
                        }
                    ],
                    password:[
                        {
                            required:true,message:"密码不能为空",trigger:"blur"
                        },
                        {
                            min:6,max:30,message:"长度在6到30位之间",trigger:"blur"
                        }
                    ],
                }
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/login",this.loginUser)
                        .then(res=>{
                            //拿到token
                            const {token} = res.data;
                            localStorage.setItem("eleToken",token);

                            const decode = jwt_decode(token);
                            //console.log(decode);
                            //存储解析的token以及user到vuex中
                            this.$store.dispatch("setAuthenticatied",!this.isEmpty(decode));
                            this.$store.dispatch("setUser",decode);
                            console.log(decode)
                            this.$router.push('/index');
                        })
                        .catch(error=>{
                           //alert("登陆失败");
                        })

                        //this.$router.push('/index');
                    } 
                });
            },
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    };
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/moshou1.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 11.7%;
  left: 37%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
  text-shadow: 5px 5px 10px black;
}
.loginForm {
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
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>