<template>
    <div class="dialog">
        <el-dialog
          :title="xinfeng.title"
          :visible.sync="xinfeng.show"
          :close-on-click-modal="false"
          :close-on-press-escape="true"
          :modal-append-to-body="false"
        >
          <div :class="bianhuan">
            
          </div>
        </el-dialog>
    </div>
</template>
<script>
  export default{
      name:'Xinfeng',
      data(){
          return{
            bianhuan:"neirong_r"
          }
      },
      methods:{
          
      },
      props:{
          xinfeng: Object,
          chuhuo: String
      },
      /*async updated(){//这里决定用哪个css
        var z_chuhuo = await chuhuo;
        if(z_chuhuo == 'r'){
          this.bianhuan = "neirong_r"
        }
        if(z_chuhuo == 'sr'){
          this.bianhuan = "neirong_sr"
        }
        if(z_chuhuo == 'ssr'){
          this.bianhuan = "neirong_ssr"
        }
      },*/
      watch:{
        chuhuo(val){
          if(val == 'r'){
            this.bianhuan = "neirong_r"
          }
          if(val == 'sr'){
            this.bianhuan = "neirong_sr"
          }
          if(val == 'ssr'){
            this.bianhuan = "neirong_ssr"
          }
        }
      }
  }
</script>
<style scoped>
.dialog{
  display: inline-block;
  width: 100%;
  height: 100%;
}
.neirong_sr{
  margin: auto;
  width: 70%;
  height: 420px;
  background-image: url(../assets/xinfeng/xf_open_sr.png);
  background-size: 100% 100%;
  animation-name: qian_doudong_sr,hou_kaixin_sr;
  animation-duration: 2s,2s;
  animation-delay: 0s,2s;
  scale: 130%
}
@keyframes qian_doudong_sr {
  0%{
    height: 350px;
    background-image: url(../assets/xinfeng/xf_star.jpg);
    scale: 100%;
  }
  18.75%{
    transform: rotate(10deg);
  }
  37.5%{
    transform: rotate(-10deg);
  }
  56.25%{
    transform: rotate(10deg);
  }
  75%{
    transform: rotate(0deg);
    opacity: 100%;
    scale: 100%;
  }
  100%{
    height: 350px;
    background-image: url(../assets/xinfeng/xf_star.jpg);
    opacity: 0%;
    scale: 0%;
  }
}
@keyframes hou_kaixin_sr{
  0%{
    background-image: url(../assets/xinfeng/xf_open_sr.png);
    scale: 0%;
    opacity: 0%;
  }
  100%{
    scale: 130%;
    opacity: 100%;
  }
}



.neirong_r{
  margin: auto;
  width: 70%;
  height: 420px;
  background-image: url(../assets/xinfeng/xf_open_r.png);
  background-size: 100% 100%;
  animation-name: qian_doudong_r,hou_kaixin_r;
  animation-duration: 2s,2s;
  animation-delay: 0s,2s;
  scale: 130%
}
@keyframes qian_doudong_r {
  0%{
    height: 350px;
    background-image: url(../assets/xinfeng/xf_close.jpg);
    scale: 100%;
  }
  18.75%{
    transform: rotate(10deg);
  }
  37.5%{
    transform: rotate(-10deg);
  }
  56.25%{
    transform: rotate(10deg);
  }
  75%{
    transform: rotate(0deg);
    opacity: 100%;
    scale: 100%;
  }
  100%{
    height: 350px;
    background-image: url(../assets/xinfeng/xf_close.jpg);
    opacity: 0%;
    scale: 0%;
  }
}
@keyframes hou_kaixin_r{
  0%{
    background-image: url(../assets/xinfeng/xf_open_r.png);
    scale: 0%;
    opacity: 0%;
  }
  100%{
    scale: 130%;
    opacity: 100%;
  }
}




.neirong_ssr{
  margin: auto;
  width: 70%;
  height: 420px;
  background-image: url(../assets/xinfeng/xf_open_ssr.png);
  background-size: 100% 100%;
  animation-name: qian_doudong_ssr,hou_kaixin_ssr;
  animation-duration: 2s,2s;
  animation-delay: 0s,2s;
  scale: 130%
}
@keyframes qian_doudong_ssr {
  0%{
    height: 350px;
    background-image: url(../assets/xinfeng/xf_rainbow.jpg);
    scale: 100%;
  }
  18.75%{
    transform: rotate(10deg);
  }
  37.5%{
    transform: rotate(-10deg);
  }
  56.25%{
    transform: rotate(10deg);
  }
  75%{
    transform: rotate(0deg);
    opacity: 100%;
    scale: 100%;
  }
  100%{
    height: 350px;
    background-image: url(../assets/xinfeng/xf_rainbow.jpg);
    opacity: 0%;
    scale: 0%;
  }
}
@keyframes hou_kaixin_ssr{
  0%{
    background-image: url(../assets/xinfeng/xf_open_ssr.png);
    scale: 0%;
    opacity: 0%;
  }
  100%{
    scale: 130%;
    opacity: 100%;
  }
}
</style>

