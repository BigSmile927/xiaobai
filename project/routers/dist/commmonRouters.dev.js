"use strict";

//普通页面
var express = require('express');

var productcen = require('../modules/product');

var NewsStd = require("../modules/newsStd");

var router = express.Router();
router.get('/', function (req, res, next) {
  productcen.find(function (err, data) {
    if (err) {
      next(err);
      return;
    }

    NewsStd.find(function (err, result) {
      if (err) {
        next(err);
        return;
      }

      res.render('index.html', {
        data: data,
        result: result
      });
    }).limit(4).sort({
      cid: 1
    });
  });
});
router.get('/sitemap', function (req, res) {
  var result = {
    pic1: "../public/images/about.jpg",
    pic2: "../public/images/about2.jpg",
    nav: [{
      site: "/news/newsStd",
      dir: "新闻资讯"
    }]
  };
  res.render('sitemap.html', {
    result: result
  });
});
router.get('/about_1', function (req, res) {
  var result = {
    pic1: "../public/images/about.jpg",
    pic2: "../public/images/about2.jpg",
    nav: [{
      site: "../about_1",
      dir: "关于我们"
    }]
  };
  res.render('about1.html', {
    result: result
  });
});
router.get('/about_2', function (req, res) {
  var result = {
    pic1: "../public/images/about.jpg",
    pic2: "../public/images/about2.jpg",
    nav: [{
      site: "../about_1",
      dir: "关于我们"
    }, {
      site: "../about_2",
      dir: "公司简介"
    }]
  };
  res.render('about2.html', {
    result: result
  });
});
router.get('/about_3', function (req, res) {
  var result = {
    pic1: "../public/images/about.jpg",
    pic2: "../public/images/about2.jpg",
    nav: [{
      site: "../about_1",
      dir: "关于我们"
    }, {
      site: "../about_3",
      dir: "企业文化"
    }]
  };
  res.render('about3.html', {
    result: result
  });
});
router.get('/about_4', function (req, res) {
  var result = {
    pic1: "../public/images/about.jpg",
    pic2: "../public/images/about2.jpg",
    nav: [{
      site: "../about_1",
      dir: "关于我们"
    }, {
      site: "../about_4",
      dir: "技术团队"
    }]
  };
  res.render('about4.html', {
    result: result
  });
});
router.get('/about_5', function (req, res) {
  var result = {
    pic1: "../public/images/about.jpg",
    pic2: "../public/images/about2.jpg",
    nav: [{
      site: "../about_1",
      dir: "关于我们"
    }, {
      site: "../about_5",
      dir: "资质荣誉"
    }]
  };
  res.render('about5.html', {
    result: result
  });
});
router.get('/contactus1', function (req, res) {
  var result = {
    pic1: "../public/images/cont1.jpg",
    pic2: "../public/images/cont2.jpg",
    nav: [{
      site: "/contactus1",
      dir: "联系我们"
    }]
  };
  res.render('contactUs.html', {
    result: result
  });
});
router.get('/contactus2', function (req, res) {
  var result = {
    pic1: "../public/images/cont1.jpg",
    pic2: "../public/images/cont2.jpg",
    nav: [{
      site: "/contactus1",
      dir: "联系我们"
    }, {
      site: "/contactus2",
      dir: "联系我们"
    }]
  };
  res.render('contactUs2.html', {
    result: result
  });
});
router.get('/contactSt', function (req, res) {
  var result = {
    pic1: "../public/images/cont1.jpg",
    pic2: "../public/images/cont2.jpg",
    nav: [{
      site: "/contactus1",
      dir: "联系我们"
    }, {
      site: "/contactSt",
      dir: "职业招聘"
    }]
  };
  res.render('contactSt.html', {
    result: result
  });
}); //将路由句柄作为导出模块对象

module.exports = router;