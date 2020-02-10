const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const app = express();

//引入users
const users = require("./routers/api/users");
//引入profile
const profiles = require("./routers/api/profile");
//引入liwu
const liwus = require("./routers/api/liwu");
//db config
const db = require("./config/keys").mongoURI;

//使用bodyparser中间件
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


//lianjie
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false })
        .then(()=>console.log("mangodb连接成功"))
        .catch(err=>console.log("mangodb连接失败"+err));

//passport初始化
app.use(passport.initialize());

require("./config/passport")(passport);

/*app.get("/",(req,res)=>{
    res.send("服务器！!");
})*/

app.use("/api/users",users);
app.use("/api/profile",profiles);
app.use("/api/liwu",liwus);

const port = process.env.port||5000;

app.listen(port,()=>{
    console.log('Server running on port '+port);
})
