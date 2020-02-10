<template>
    <div class="dialog">
        <el-dialog
          :title="dialog.title"
          :visible.sync="dialog.show"
          :close-on-click-modal="false"
          :close-on-press-escape="true"
          :modal-append-to-body="false"
        >
        <div class="form">
            <el-form
            ref="form"
            :model="formdata"
            :rules="form_rules"
            label-width="120px"
            style="margin:10px;width:auto;"
            >
            <el-form-item label="收支类型">
                <el-select v-model="formdata.type" placeholder="收支类型">
                    <el-option v-for="(formtype,index) in format_type_list" :key="index" 
                    :label="formtype" :value="formtype">

                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="discribe" label="收支描述">
                <el-input type="textarea" v-model="formdata.describe"></el-input>
            </el-form-item>

            <el-form-item prop='income' label="收入:">
                <el-input type="income" v-model="formdata.income"></el-input>
            </el-form-item>

            <el-form-item prop='expend' label="支出:">
                <el-input type="expend" v-model="formdata.expend"></el-input>
            </el-form-item>

            <el-form-item prop='cash' label="账户现金:">
                <el-input type="cash" v-model="formdata.cash"></el-input>
            </el-form-item>

            <el-form-item label="备注:">
                <el-input type="textarea" v-model="formdata.remark"></el-input>
            </el-form-item>
            <el-form-item class="text_right">

            </el-form-item>
                <el-button @click="dialog.show = false">取消</el-button>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form>
        </div>
        </el-dialog>
    </div>
</template>
<script>
export default{
    name:'Dialog',
    data(){
        return{
            format_type_list:[
                "提现",
                "提现手续费",
                "充值",
                "优惠券",
                "充值礼券",
                "转账"
            ],
            form_rules:{
                describe:[
                    {required:true,message:"收支描述不能为空",trigger:'blur'}
                ],
                income:[
                    {required:true,message:"收入不能为空",trigger:'blur'}
                ],
                expend:[
                    {required:true,message:"支出不能为空",trigger:'blur'}
                ],
                cash:[
                    {required:true,message:"账户资金不能为空",trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        onSubmit(form){
            if(this.dialog.title == "添加个人信息"){
                this.$refs[form].validate(valid=>{
                    if(valid){
                        //console.log(this.formdata);
                        this.$axios.post("api/profile/add",this.formdata)
                        .then(res=>{
                            this.$message.success("添加成功");
                            this.dialog.show = false;
                            //this.formdata = {};
                            this.$emit('update');
                            this.$emit('qingchu');
                        });
                    }
                })
            }
            if(this.dialog.title == "编辑个人信息"){
                this.$refs[form].validate(valid=>{
                    if(valid){
                        //console.log(this.formdata);
                        this.$axios.post('api/profile/edit/'+this.dialog.rowid,this.formdata)
                        .then(res=>{
                            this.$message.success("修改成功");
                            this.dialog.show = false;
                            //this.formdata = {};
                            this.$emit('update');
                            this.$emit('qingchu');
                        });
                    }
                })
            }
        }
    },
    props:{
        dialog: Object,
        formdata: Object
    }
};
</script>
<style scoped>


</style>