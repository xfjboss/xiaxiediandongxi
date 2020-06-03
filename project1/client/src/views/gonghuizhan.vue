<template>
    <div class="zong">
        <div class="baikuang">
            <div class="fillcontain">
                <el-select v-model="value" placeholder="请选择日期">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button
                    size="large"
                    type="primary"
                    icon="delete"
                    v-if="true"
                    @click="chaxun()">查询</el-button>

                <div class="table_container">
                    <el-table
                    v-if="tabledata.length>0?true:false"
                    :data="tabledata"
                    max-height="450"
                    border
                    style="width: 100%">
                        <el-table-column
                        prop="yx_id"
                        label="游戏ID"
                        align='center'
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="first_dam"
                        label="第一刀伤害"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="second_dam"
                        label="第二刀伤害"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="third_dam"
                        label="第三刀伤害"
                        align='center'
                        width="180"> 
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
                                v-if="true"
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

                </div>
            </div>
        </div>
    </div>
</template>>

<script>
export default {
    data(){
        return {
            options: [{
            value: '选项1',
            label: '第一天'
            }, {
            value: '选项2',
            label: '第二天'
            }, {
            value: '选项3',
            label: '第三天'
            }, {
            value: '选项4',
            label: '第四天'
            }, {
            value: '选项5',
            label: '第五天'
            },{
            value: '选项6',
            label: '第六天'
            }],
            value: '',
            tabledata: [
                {yx_id:'莲',first_dam: '999999',second_dam: '999999',third_dam: '999999',remark:'我没有开挂！'},
                {yx_id:'xfjboss',first_dam: '600000',second_dam: '700000',third_dam: '500000',remark:'无'}
            ]
        }
    }
}
</script>>

<style scoped>
.zong {
  width: 100%;
  height: 100%;
  background: url(../assets/pcr.jpg) ;
  background-size: 100% 100%;
  overflow: hidden;
}
.baikuang {
  margin: auto;
  width: 90%;
  height: 90%;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.432);
  text-align: center;
  color: rgb(255, 255, 255);
  border-radius: 15px;
}
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.table_container {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 15px;
}
</style>