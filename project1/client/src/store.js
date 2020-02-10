import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types={
  SET_AUTHENTICATIED:'SET_AUTHENTICATIED',
  SET_USER:'SET_USER',
  SET_GONGHUI:'SET_GONGHUI',
  SET_GKP:'SET_GKP'
}

const state={
  isAuthenticatied:false,
  user: {}
}
const getters={
  isAuthenticatied:state=>state.isAuthenticatied,
  user: state=>state.user
}
const mutations={
  [types.SET_AUTHENTICATIED](state,isAuthenticatied){
    if(isAuthenticatied) state.isAuthenticatied = isAuthenticatied;
    else state.isAuthenticatied = false;
  },
  [types.SET_USER](state,user){
    if(user) state.user=user;
    else state.user={};
  },
  [types.SET_GONGHUI](state,gonghui){
    if(gonghui){
      state.user.gonghui = gonghui;
    }
  },
  [types.SET_GKP](state,gkp){
    if(gkp){
      state.user.gkp = gkp;
    }
  }
}
const actions={
  setAuthenticatied:({commit},isAuthenticatied)=>{
    commit(types.SET_AUTHENTICATIED,isAuthenticatied);
  },
  setUser:({commit},user)=>{
    commit(types.SET_USER,user);
  },
  clearCurrentState:({commit})=>{
    commit(types.SET_AUTHENTICATIED,false);
    commit(types.SET_USER,null);
  },
  setgonghui:({commit},gonghui)=>{
    commit(types.SET_GONGHUI,gonghui);
  },
  setgkp:({commit},gkp)=>{
    commit(types.SET_GKP,gkp);
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
