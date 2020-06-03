const express = require("express");
const router = express.Router();
const Liwu = require("../../models/liwu");
const passport = require("passport");

//port GET api/liwu
//desc  获取所有信息
//access private
router.get("/liwuchaxun/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Liwu.find({"suoshuren_id":req.params.id})//
    .then(liwu => {
        if(!liwu){
            return res.status(404).json("没有任何内容");
        }
        res.json(liwu);
    }).catch((err) => {
        return res.status(404).json(err);
    });
})

//port DELETE api/liwu/delete/:id
//desc  删除单个信息接口
//access private

router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Liwu.findOneAndRemove({_id:req.params.id}).then(liwu=>{
        liwu.save().then(liwu=>res.json(liwu));
    })
    .catch(err=>res.status(404).json("删除失败"));
})


//port DELETE api/liwu/deleteAll
//desc  删除多个信息接口
//access private
router.post("/deleteAll",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const shanchulist = JSON.parse(req.body.idlist)
    console.log(shanchulist);
    console.log(typeof(shanchulist));
    Liwu.remove({_id:{$in:shanchulist}})//remove 被弃用了
    .then(liwu=>{
        res.json(liwu);
    })
    .catch(err=>res.status(404).json(err));

/*
    Liwu.findOneAndRemove({_id:req.params.id}).then(liwu=>{
        liwu.save().then(liwu=>res.json(liwu));
    })
    .catch(err=>res.status(404).json("删除失败"));
    */
})



//port POST api/liwu/insert
//desc  添加信息接口
//access private
/*
router.post("/insert/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const liwuFields = new Liwu({
    suoshuren_id:req.body.suoshurenid,
    suoshuren:req.body.suoshuren,
    wupin_name:req.body.wupin,
    wupin_dengji:req.body.dengji,
    chouqu_time:req.body.time
    })

    liwuFields.save()
    .then(liwu=>res.json(liwu))
    .catch(err=>console.log(err));
    
})
*/
module.exports = router;