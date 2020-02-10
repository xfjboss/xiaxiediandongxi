const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const Liwu = require("../../models/liwu");
const bcrypt = require("bcrypt");//加密
const jwt = require('jsonwebtoken');//引入jwt
const gravatar = require('gravatar');//头像
const keys = require("../../config/keys");
const passport = require("passport");

/*router.get("/test",(req,res)=>{
    res.json({msg:"login works"});
})*/

function chouyifa(){
    const shu = Math.random()*100;
    console.log(shu)
    if(shu<=1){
        return "ssr"
    }
    if(shu<=5.0 && shu>1){
        return "sr"
    }
    if(shu>5.0){
        return "r"
    }
}
function choushifa(){
    var jieguo = [];
    for(i=0;i<10;i++){
        let shu = Math.random()*100;
        if(shu<=1){
            jieguo.push("ssr")
        }
        if(shu<=5.0 && shu>1){
            jieguo.push("sr")
        }
        if(shu>5.0){
            jieguo.push("r")
        }
    }
    return jieguo
}



router.post("/register",(req,res)=>{
    //console.log(req.body);
    //查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json('邮箱已被占用!');
            }else{
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                
                const newuser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password,
                    gonghui:req.body.gonghui,
                    gkp:req.body.gkp,
                    identity:req.body.identity
                })
                //加密password
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newuser.password, salt, (err, hash)=>{
                        //if(err)throw err;

                        newuser.password=hash;
                        newuser.save()
                               .then(user=>res.json(user))
                               .catch(err=>console.log(err));
                    });
                });
                
            }
        })
})

//port api/users/login
//desc 返回token jwt passport
//access public

router.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user=>{
            if(!user){
                return res.status(404).json('用户不存在！');
            }

            //用户存在=>密码匹配
            bcrypt.compare(password, user.password)
                  .then(isMatch=>{
                      if(isMatch){
                          const rule = {id:user.id,
                                        name:user.name,
                                        avatar:user.avatar,
                                        identity:user.identity,
                                        gonghui:user.gonghui,
                                        gkp:user.gkp
                                        };

                          jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                            res.json({
                                success:true,
                                token:"Bearer "+token
                            });
                          })

                          //res.json({msg:"success"});
                      }else{
                        return res.status(400).json('密码错误！');
                      }
                  })
        })

})

//port GET api/users/current
//desc 返回current user
//access private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    });
})


//port POST api/users/gonghuishenqing
//dese 返回一个信息是否加入成功
router.post("/gonghuishenqing/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const usergonghui = {};
    //console.log("进来了");
    usergonghui.gonghui = req.body.ghname;
    User.findOneAndUpdate(
        {_id:req.params.id},
        {$set:usergonghui},
        {new:true}
    ).then(user=>res.json(user))
    
})

//get api.users/getgkp
//dese 返回gkp
router.get("/getgkp/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    User.findOne({_id:req.params.id})
    .then(user => {
        res.json(user);
    }).catch((err) => {});
})


//port POST api/users/gkpchongzhi
//dese 返回充值信息
router.post("/gkpchongzhi/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const name = req.body.chongren;
    const id = req.params.id;
    
    User.findOne({name})
    .then(user => {
        if(!user){
            return res.status(404).json('用户不存在！');
        }
        user.gkp = user.gkp + req.body.chongshu;
        const gkpchongxinxi = user;
        User.findOneAndUpdate(
            {_id:id},
            {$set:gkpchongxinxi},
            {new:true}
        ).then(user=>res.json(user))
    })
})


//抽卡1次
// post 反回抽卡结果
router.post("/choukayici",passport.authenticate("jwt",{session:false}),(req,res)=>{
    var id = req.body.id;
    var gkp = req.body.gkp;
    var name = req.body.name;
    var jieguo = chouyifa();//得到抽卡结果
    //扣除相应的石头并改变数据库
    gkp = gkp - 3;
    //console.log(gkp);
    if(gkp<0){//石头不够了
        return res.status(403).json('石头不够！');
    }
    if(gkp>=0){//石头够
        const liwuFields = new Liwu({
        suoshuren_id:id,
        suoshuren:name,
        wupin_name:'物品a',
        wupin_dengji:jieguo
        })
            
        liwuFields.save()
        .then(liwu=>{})
        .catch(err=>console.log(err));


        User.findOne({name})
        .then(user => {
            if(!user){
                return res.status(404).json('用户不存在！');
            }
            user.gkp = user.gkp - 3;
            var choukaxinxi = user;
            User.findOneAndUpdate(
                {_id:id},
                {$set:choukaxinxi},
                {new:true}
            ).then(res.json({
                jg:jieguo,
                shitou:gkp
            }))
        })
    }
})


//抽卡10次
// post 反回抽卡结果
router.post("/choukashici",passport.authenticate("jwt",{session:false}),(req,res)=>{
    var id = req.body.id;
    var gkp = req.body.gkp;
    var name = req.body.name;
    var jieguo = choushifa();//得到抽卡结果
    //扣除相应的石头并改变数据库
    gkp = gkp - 30;
    //console.log(gkp);
    if(gkp<0){//石头不够了
        return res.status(403).json('石头不够！');
    }
    if(gkp>=0){//石头够
        for(i=0;i<=9;i++){
            const liwuFields = new Liwu({
            suoshuren_id:id,
            suoshuren:name,
            wupin_name:'物品a',
            wupin_dengji:jieguo[i]
            })
            
            liwuFields.save()
            .then(liwu=>{})
            .catch(err=>console.log(err));

        }
        User.findOne({name})
        .then(user => {
            if(!user){
                return res.status(404).json('用户不存在！');
            }
            user.gkp = user.gkp - 30;
            var choukaxinxi = user;
            User.findOneAndUpdate(
                {_id:id},
                {$set:choukaxinxi},
                {new:true}
            ).then(res.json({
                jg:jieguo,
                shitou:gkp
            }))
        })
    }
})


module.exports = router;