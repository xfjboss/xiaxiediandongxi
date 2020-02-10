<template>
    <div class="fillcontain">
        <div>
            <el-form :inline="true" ref="add_data" :model="search_data">
                <el-form-item label="按照时间筛选">
                    <el-date-picker
                        v-model="search_data.starttime"
                        type="datetime"
                        placeholder="选择开始时间"
                        >
                    </el-date-picker>
                    --
                    <el-date-picker
                        v-model="search_data.endtime"
                        type="datetime"
                        placeholder="选择截至时间"
                        >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="handlesearch()">筛选信息</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" size="small" icon="search" @click="getprofile()">刷新页面</el-button>
                </el-form-item>

                <el-form-item class="btnRight">
                    <el-button type="primary" size="small" icon="view" v-if="user.identity == 'manager'" @click="handleAdd()">添加信息</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
            v-if="tabledata.length>0?true:false"
            :data="tabledata"
            max-height="450"
            border
            style="width: 100%">
                <el-table-column
                type="index"
                label="序号"
                align='center'
                width="70">
                </el-table-column>
                <el-table-column
                prop="date"
                label="创建时间"
                align="center"
                width="250">  

                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="type"
                label="收支类型"
                align='center'
                width="150">
                </el-table-column>
                <el-table-column
                prop="describe"
                label="收支描述"
                align='center'
                width="180">
                </el-table-column>
                <el-table-column
                prop="income"
                label="收入"
                align='center'
                width="170"> 

                <template slot-scope="scope">  
                    <span style="color:#00d053">+ {{ scope.row.income }}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="expend"
                label="支出"
                align='center'
                width="170">

                <template slot-scope="scope">  
                    <span style="color:#f56767">- {{ scope.row.expend }}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="cash"
                label="账户现金"
                align='center'
                width="170">

                <template slot-scope="scope">  
                    <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="remark"
                label="备注"
                align='center'
                width="220">
                </el-table-column>

                <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    fixed="right"
                    width="320">
                    <template slot-scope="scope">
                        <el-button
                        type="warning"
                        size="small"
                        icon="edit"
                        v-if="user.identity == 'manager'"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="small"
                        type="danger"
                        icon="delete"
                        v-if="true"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="paginations.page_index"
                            :page-sizes="paginations.page_sizes"
                            :page-size="paginations.page_size"
                            :layout="paginations.layout"
                            :total="paginations.total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <Dialog :dialog="dialog" :formdata="formdata" @update="getprofile" @qingchu="qingchufd"></Dialog>
    </div>
</template>>


<script>
import { Message } from 'element-ui';
import Dialog from '../components/Dialog';
  export default{
      name:"fundlist",
      data(){
          return {
              search_data:{
                  starttime:"",
                  endtime:""
              },
              filtertabledata:[],
              paginations:{
                  page_index:1,//当前位于哪页
                  total:0, //当前数据总数
                  page_size:5,
                  page_sizes:[5,10,15,20],
                  layout:"total, sizes, prev, pager, next, jumper"
              },
              tabledata:[],
              alltabledata:[],
              formdata:{
                type:"",
                describe:"",
                income:"",
                expend:"",
                cash:"",
                remark:"",
                id:""
              },
              dialog:{
                  show:false,
                  title:"",
                  rowid:""
              }
          }
      },
      computed:{
          user(){
              return this.$store.getters.user;
          }
      },
      created(){
          this.getprofile();
      },
      methods:{
          getprofile(){
              this.$axios.get('/api/profile')
              .then(res => {
                  this.alltabledata = res.data;
                  this.filtertabledata = res.data;
                  //console.log(res.data);
                  this.setpaginations();
              }).catch((err) => {});
          },
          setpaginations(){
              this.paginations.total = this.alltabledata.length;
              this.paginations.page_index = 1;
              this.paginations.page_size = 5;
              this.tabledata = this.alltabledata.filter((item,index)=>{
                  return index < this.paginations.page_size;
              })
          },
          handleEdit(index,row){
              this.dialog.title = "编辑个人信息";
              this.dialog.rowid = row._id;
              this.formdata={
                  type:row.type,
                  describe:row.describe,
                  income:row.income,
                  expend:row.expend,
                  cash:row.cash,
                  remark:row.remark
              }

              this.dialog.show = true;
          },
          handleDelete(index,row){
              this.$axios.delete('/api/profile/delete/'+row._id)
              .then(res => {
                  Message.success('删除成功！');
                  this.$axios.get('/api/profile')
                  .then(res => {
                  this.tabledata = res.data;
                  //console.log(res.data);
                    }).catch((err) => {});
                })
          },
          handleAdd(){
              this.dialog.title = "添加个人信息"
              this.dialog.show = true;
          },
          qingchufd(){
              this.formdata = {};
          },
          handleSizeChange(page_size){
              this.paginations.page_index = 1;
              this.paginations.page_size = page_size;
              this.tabledata = this.alltabledata.filter((item,index)=>{
                  return index < this.paginations.page_size;
              })
          },
          handleCurrentChange(page){
              let index = this.paginations.page_size*(page-1);
              let sum = this.paginations.page_size*page;
              let tables = [];
              for(let i = index;i<sum;i++){
                  if(this.alltabledata[i]){
                      tables.push(this.alltabledata[i]);
                  }                 
              }
              this.tabledata = tables;
          },
          handlesearch(){
              if(!this.search_data.starttime || !this.search_data.endtime){
                  this.$message({
                      type:"warning",
                      message:"请选择时间!"
                  });
                  return;
              }
              const stime = this.search_data.starttime.getTime();
              const etime = this.search_data.endtime.getTime();

              this.alltabledata = this.filtertabledata.filter(item=>{
                  let date = new Date(item.date);
                  let time = date.getTime();
                  return time >= stime && time <= etime;
              });
              this.setpaginations();
          }
      },
      components:{
          Dialog
      }
  }
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.dujia{
    background-color:#ffc400
}
.btnRight{
    float:right;
}
</style>