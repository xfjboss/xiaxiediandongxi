<template>
  <el-row class="menu_page">  
    <el-col>
        <el-menu
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#ffd04b">
        <router-link to="/home">
            <el-menu-item index="0">
                <i class="fa fa-margin fa-server"></i>
                <span slot="title">首页</span>
            </el-menu-item>
        </router-link>
            <template v-for="item in items">
                <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                    <template slot="title">
                        <i :class="'fa fa-margin '+item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                        <el-menu-item :index="citem.path">
                            <span slot="title">{{citem.name}}</span>
                        </el-menu-item>
                    </router-link>
                </el-submenu>
            </template>
        </el-menu>
  </el-col>
</el-row>
</template>

<script>
export default{
    name:"leftmenu",
    data(){
        return {
            items:[
                {
                    icon: 'fa-money',
                    name: '交易查看',
                    path: 'fund',
                    children:[
                        {path:"fundlist",name:"团队交易信息"},
                        {path:"myfundlist",name:"我的交易信息"}
                    ]
                },
                {
                    icon: 'fa-asterisk',
                    name: '账号管理',
                    path: 'info',
                    children:[
                        {path:"infoshow",name:"个人信息"},
                        {path:"infoedit",name:"个人信息修改"}
                    ]
                },
                {
                    icon: 'fa-money',
                    name: 'G/DKP管理',
                    path: 'gkp',
                    children:[
                        {path:"gkpinfo",name:"G/DKP查询"},
                        {path:"gkpcharge",name:"GKP充值"}
                    ]
                },
                {
                    icon: 'fa-server',
                    name: '我的工会',
                    path: 'gonghui',
                    children:[
                        {path:"ghmenber",name:"工会人员"},
                    ]
                },
                {
                    icon: 'fa-money',
                    name: '幸运抽卡',
                    path: 'chou',
                    children:[
                        {path:"chouka",name:"进入奖池"},
                        {path:"cangku",name:"我的仓库"}
                    ]
                },
                {
                    icon: 'fa-server',
                    name: '工会战记录',
                    path: 'huizhan',
                    children:[
                        {path:"gonghuizhan",name:"工会战统计"}
                    ]
                }
            ]
        }
    }
};
</script>


<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>