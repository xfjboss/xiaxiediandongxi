<template>
    <div class="index">
        <HeadNav></HeadNav>
        <leftmenu></leftmenu>
        <div class="rightContainer">
     	    <router-view></router-view> 
        </div>
    </div>
</template>>

<style>
.index{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}



/*.transitionBody{
 transition: all 0.15s linear; 
}


.transitionLeft-enter-active{
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);  
}

.transitionLeft-leave-active{
  -webkit-transform: translate(-100%, 0); 
  transform: translate(-100%, 0); 
}*/
</style>

<script>
import HeadNav from '../components/HeadNav'
import leftmenu from '../components/leftmenu'
    export default{
        name:"index",
        components:{
            HeadNav,
            leftmenu
        }
    };
</script>
