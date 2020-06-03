const express = require("express");
const router = express.Router();
const dam1 = require("../../models/dam1");
const dam2 = require("../../models/dam2");
const dam3 = require("../../models/dam3");
const dam4 = require("../../models/dam4");
const dam5 = require("../../models/dam5");
const dam6 = require("../../models/dam6");
const passport = require("passport");

//POST 编辑

//POST 删除

//POST/GET 获取
router.get("/huoqushanghai/:day",passport.authenticate("jwt",{session:false}),(req,res)=>{
    var day = req.params.day;
    var ddam = dam1;
    switch(day) { 
        case "第一天": { 
            ddam = dam1;
            break; 
        }
        case "第二天": { 
            ddam = dam2;
            break; 
        }
        case "第三天": { 
            ddam = dam3;
            break;    
        }
        case "第四天": { 
            ddam = dam4;
            break; 
        }
        case "第五天": { 
            ddam = dam5;
            break; 
        }
        case "第六天": { 
            ddam = dam6;
            break; 
        }
        default: { 
           break;              
        } 
    }
    ddam.find()
    .then(dam => {
        if(!dam){
            return res.status(404).json("没有任何内容");
        }
        res.json(dam);
    }).catch((err) => {
        return res.status(404).json(err);
    });
})




module.exports = router;