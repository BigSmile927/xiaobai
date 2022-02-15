const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express();

//自定义路由模块
var commonRouters=require('./routers/commmonRouters.js');
var productRouters=require('./routers/productRouters.js');
var newsRouters=require('./routers/newsRouters.js');
//静态资源访问
app.use('/public/',express.static('public'));
//注册模板引擎
app.engine('html',require('express-art-template'));
app.set("views", __dirname + "/views");
//post中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/igeek");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("连接成功");
});


//注册路由
app.use('/',commonRouters);
app.use('/pro/',productRouters);
app.use('/news/',newsRouters);

app.listen(9999,function(){
    console.log('express-server is listening 9999.....');
});
