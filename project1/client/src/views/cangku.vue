<template>
    <div class="contain_1">
      <el-table
        :data="jubujiangpin"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange"
        >
      <el-table-column
        prop="chouqu_time"
        label="获得日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="wupin_dengji"
        label="物品等级"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="wupin_name"
        label="物品名称"
        :formatter="formatter">
      </el-table-column>

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="operation"
        align='center'
        label="操作"
        fixed="right"
        width="320">
        <template slot-scope="scope">
            <el-button
            size="small"
            type="danger"
            icon="delete"
            v-if="true"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-button type="danger" round @click="handleAllDelete()" style="{float:right;margin:20px;}">删除全部选项</el-button>
    <!--这里遇到个问题，上面那行的内联样式只会有一行生效而且有时会使按钮失去作用-->
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
</template>>

<script>
import { Message } from 'element-ui';
    export default{
        data(){
          return {
            multipleSelection:[],
            jubujiangpin:[],
            jiangpin:[],
            filterjiangpin:[],
            paginations:{
                  page_index:1,//当前位于哪页
                  total:0, //当前数据总数
                  page_size:5,
                  page_sizes:[5,10,15,20],
                  layout:"total, sizes, prev, pager, next, jumper"
            },
          }
        },
        methods: {
          formatter(row, column) {
              return row.address;
          },
          getprofile(){
            this.$axios.get('/api/liwu/liwuchaxun/'+this.$store.getters.user.id)
            .then(res => {
                this.jiangpin = res.data;
                this.filterjiangpin = res.data;
                //console.log(res.data);
                this.setpaginations();
            }).catch((err) => {});
          },
          handleDelete(index,row){
            //console.log(index,row._id)
            this.$axios.delete('/api/liwu/delete/'+row._id)
            .then(res => {
              Message.success('删除成功！');
              this.getprofile();
            }).catch((err) => {});
          },
          handleSizeChange(page_size){
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.jubujiangpin = this.jiangpin.filter((item,index)=>{
                return index < this.paginations.page_size;
            })
          },
          handleCurrentChange(page){
            let index = this.paginations.page_size*(page-1);
            let sum = this.paginations.page_size*page;
            let tables = [];
            for(let i = index;i<sum;i++){
                if(this.jiangpin[i]){
                    tables.push(this.jiangpin[i]);
                }                 
            }
            this.jubujiangpin = tables;
          },
          setpaginations(){
              this.paginations.total = this.jiangpin.length;
              this.paginations.page_index = 1;
              this.paginations.page_size = 5;
              this.jubujiangpin = this.jiangpin.filter((item,index)=>{
                  return index < this.paginations.page_size;
              })
          },
          handleSelectionChange(val){
            this.multipleSelection = val;
          },
          handleAllDelete(){
            const idlist = []
            if(this.multipleSelection != null){
              for(var i=0;i<this.multipleSelection.length;i++){
                idlist.push(this.multipleSelection[i]._id)
              }
              var params = new URLSearchParams();		
              params.append('idlist',JSON.stringify(idlist));//传递数组要用json.stringify

              this.$axios.post('/api/liwu/deleteAll',params)
              .then(async res => {
                await this.getprofile();
                Message.success('删除成功！');
              }).catch((err) => {});
            }else{

            }
          }
        },
        created(){
            this.getprofile();
        }
    }
</script>

<style scoped>
.contain_1 {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}

</style>