<template>
    <div class="dialog">
        <el-dialog
          :title="xinfeng.title"
          :visible.sync="xinfeng.show"
          :close-on-click-modal="false"
          :close-on-press-escape="true"
          :modal-append-to-body="false"
        >
          <div class="neirong">
            {{this.chuhuo}}
          </div>
        </el-dialog>
    </div>
</template>
<script>
export default{
    name:'Xinfeng',
    data(){
        return{
           
        }
    },
    methods:{
        
    },
    props:{
        xinfeng: Object,
        chuhuo: String
    }
};
</script>
<style scoped>


</style>

