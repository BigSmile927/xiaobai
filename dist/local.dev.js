"use strict";

var express = require("express");

var app = express();

var request = require('request');

var a;
request('http://api.tianapi.com/ncov/index?key=71f4dffee71eb99d4b8b1e2e6f9295ef', function (error, response, data) {
  //如果请求成功则打印数据 否则显示错误信息
  if (!error && response.statusCode == 200) {
    a = data;
  } else {
    console.log(error);
    console.log(response.statusCode);
  }
});
app.get("/", function (req, res) {
  res.send(a);
});
app.listen(9999, function () {
  console.log('express-server is listening 9999.....');
});