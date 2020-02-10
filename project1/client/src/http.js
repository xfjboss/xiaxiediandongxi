import axios from 'axios';
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import router from './router';

let loading
function startloading(){
    loading = Loading.service({
        lock:true,
        text:'拼命加载中。。。',
        background:'rgba(0,0,0,0.7)'
    });
}

function endLoading(){
    loading.close();
}


//请求拦截
axios.interceptors.request.use(
    config => {
        //加载动画
        startloading();

        if(localStorage.eleToken){
            //请求头
            config.headers.Authorization=localStorage.eleToken;
        }

        return config;
    },error=>{
        return Promise.reject(error);
    }
);

//响应拦截
axios.interceptors.response.use(
    response=>{
        //结束加载动画
        endLoading();
        
        return response;
    },error=>{
        endLoading();

        Message.error(error.response.data);
        const { status } = error.response;
        if(status == 401){
            Message.error('登录状态失效！');
            localStorage.removeItem('eleToken');
            router.push('/login');
        }
        if(status == 403){
            Message.error('非法操作！');
        }

        return Promise.reject(error);
    }
);



export default axios;