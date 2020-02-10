<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">魔兽世界工会管理</span>

                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <el-form-item label="公会名称" prop="gonghui">
                        <el-input v-model="registerUser.gonghui" placeholder="请输入您所属工会"></el-input>
                    </el-form-item>
                    
                    <el-form-item type="password" label="选择身份">
                        <el-select v-model="registerUser.identity" placeholder="请选择身份">
                            <el-option label="会长" value="manager"></el-option>
                            <el-option label="团员" value="employee"></el-option>
                        </el-select>
                    </el-form-item>
                    

                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>>

<script>
import { error } from 'util';
    export default{
        name:"register",
        components:{},
        data(){
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };

            return{
                registerUser:{
                    name:"",
                    email:"",
                    pasword:"",
                    password2:"",
                    identity:"employee",
                    gonghui:"",
                    gkp:0
                },
                rules:{
                    name:[
                        {
                            required:true,message:"用户名不能为空",trigger:"blur"
                        },
                        {
                            min:2,max:30,message:"长度不合法",trigger:"blur"
                        }
                    ],
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
                    password2:[
                        {
                            required:true,message:"确认密码不能为空",trigger:"blur"
                        },
                        {
                            min:6,max:30,message:"长度在6到30位之间",trigger:"blur"
                        },
                        {
                            validator:validatePass2,trigger:"blur"
                        }
                    ],
                    gonghui:[{}]
                }
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/register",this.registerUser)
                        .then(res=>{
                            this.$message({
                                message:"账号注册成功",
                                type:"success"
                            });
                            this.$router.push('/login');
                        })
                        .catch(error=>{
                            this.$message({
                                message:"邮箱已被注册",
                                type:"error"
                            });
                        })

                        //this.$router.push('/login');
                    } 
                });
            }
        }
    };
</script>

<style scoped>
.register {
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
.registerForm {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.473);
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(53, 52, 52, 0.8);
}

.submit_btn {
  width: 100%;
}

</style>