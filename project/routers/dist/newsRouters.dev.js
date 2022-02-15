"use strict";

//新闻页面和书本页面
var express = require("express");

var NewsStd = require("../modules/newsStd");

var Newsdetail = require("../modules/newsdetail");

var Client = require("../modules/client");

var Clientdetail = require("../modules/clientdetail");

var router = express.Router();

function getdata(data) {
  var result = {
    pic1: "../public/images/NewsStdban1.jpg",
    pic2: "../public/images/NewsStdban2.jpg"
  };

  for (var key in data) {
    if (data[key].fid == 1) {
      result.nav = [{
        site: "/news/newsStd",
        dir: "新闻资讯"
      }, {
        site: "/news/newsStd_1",
        dir: "公司新闻"
      }];
    } else if (data[key].fid == 2) {
      result.nav = [{
        site: "/news/newsStd",
        dir: "新闻资讯"
      }, {
        site: "/news/newsStd_2",
        dir: "行业资讯"
      }];
    } else {
      result.nav = [{
        site: "/news/newsStd",
        dir: "新闻资讯"
      }, {
        site: "/news/newsStd_3",
        dir: "媒体报道"
      }];
    }

    data[key].a = unescape(data[key].detail);
  }

  var b = {
    data: data,
    result: result
  };
  return b;
}

function getdata1(data) {
  var result = {
    pic1: "../public/images/clientsban.jpg",
    pic2: "../public/images/clientsban2.jpg"
  };

  for (var key in data) {
    if (data[key].fid == 1) {
      result.nav = [{
        site: "clients",
        dir: "微热管技术"
      }, {
        site: "clients1",
        dir: "相关论著"
      }];
    } else {
      result.nav = [{
        site: "clients",
        dir: "微热管技术"
      }, {
        site: "clients2",
        dir: "热管散热方案"
      }];
    }

    data[key].a = unescape(data[key].detail);
  }

  var b = {
    data: data,
    result: result
  };
  return b;
} //news


router.get("/newsStd", function (req, res, next) {
  var result = {
    pic1: "../public/images/NewsStdban1.jpg",
    pic2: "../public/images/NewsStdban2.jpg",
    nav: [{
      site: "/news/newsStd",
      dir: "新闻资讯"
    }]
  };
  NewsStd.find(function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("newsStd.html", {
      data: data,
      result: result
    });
  }).limit(4).sort({
    cid: 1
  });
});
router.get("/newsStdt2", function (req, res, next) {
  var result = {
    pic1: "../public/images/NewsStdban1.jpg",
    pic2: "../public/images/NewsStdban2.jpg",
    nav: [{
      site: "/news/newsStd",
      dir: "新闻资讯"
    }]
  };
  NewsStd.find(function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("newsStd.html", {
      data: data,
      result: result,
      fen: 2
    });
  }).limit(4).skip(4).sort({
    cid: 1
  });
});
router.get("/newsStdt3", function (req, res, next) {
  var result = {
    pic1: "../public/images/NewsStdban1.jpg",
    pic2: "../public/images/NewsStdban2.jpg",
    nav: [{
      site: "/news/newsStd",
      dir: "新闻资讯"
    }]
  };
  NewsStd.find(function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("newsStd.html", {
      data: data,
      result: result,
      fen: 3
    });
  }).limit(4).skip(8).sort({
    cid: 1
  });
});
router.get("/newsStd_1", function (req, res) {
  var result = {
    pic1: "../public/images/NewsStdban1.jpg",
    pic2: "../public/images/NewsStdban2.jpg",
    nav: [{
      site: "/news/newsStd",
      dir: "新闻资讯"
    }, {
      site: "/news/newsStd_1",
      dir: "公司新闻"
    }]
  };
  NewsStd.find({
    fid: 1
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("newsStd1.html", {
      data: data,
      result: result,
      fen: 1
    });
  }).limit(4);
});
router.get("/newsStd_1_2", function (req, res) {
  var result = {
    pic1: "../public/images/NewsStdban1.jpg",
    pic2: "../public/images/NewsStdban2.jpg",
    nav: [{
      site: "/news/newsStd",
      dir: "新闻资讯"
    }, {
      site: "/news/newsStd_1",
      dir: "公司新闻"
    }]
  };
  NewsStd.find({
    fid: 1
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("newsStd1.html", {
      data: data,
      result: result,
      fen: 2
    });
  }).limit(4).skip(4);
});
router.get("/newsStd_2", function (req, res) {
  var result = {
    pic1: "../public/images/NewsStdban1.jpg",
    pic2: "../public/images/NewsStdban2.jpg",
    nav: [{
      site: "/news/newsStd",
      dir: "新闻资讯"
    }, {
      site: "/news/newsStd_2",
      dir: "行业资讯"
    }]
  };
  NewsStd.find({
    fid: 2
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("newsStd2.html", {
      data: data,
      result: result,
      fen: 1
    });
  });
});
router.get("/newsStd_3", function (req, res) {
  var result = {
    pic1: "../public/images/NewsStdban1.jpg",
    pic2: "../public/images/NewsStdban2.jpg",
    nav: [{
      site: "/news/newsStd",
      dir: "新闻资讯"
    }, {
      site: "/news/newsStd_3",
      dir: "媒体报道"
    }]
  };
  NewsStd.find({
    fid: 3
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("newsStd3.html", {
      data: data,
      result: result,
      fen: 3
    });
  });
});
router.get("/newsdetail", function (req, res, next) {
  var id = req.query.id;
  var fid = req.query.fid;
  Newsdetail.find({
    cid: id
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    var ss = getdata(data);
    NewsStd.find({
      fid: fid
    }, function (err, intro) {
      ss.intro = intro;
      res.render('NewsStd_01.html', ss);
    }).sort({
      cid: 1
    });
  });
}); //clients

router.get("/clients", function (req, res) {
  var result = {
    pic1: "../public/images/clientsban.jpg",
    pic2: "../public/images/clientsban2.jpg",
    nav: [{
      site: "clients",
      dir: "微热管技术"
    }]
  };
  Client.find(function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("wrg-technology.html", {
      data: data,
      result: result
    });
  });
});
router.get("/clients1", function (req, res) {
  var result = {
    pic1: "../public/images/clientsban.jpg",
    pic2: "../public/images/clientsban2.jpg",
    nav: [{
      site: "clients",
      dir: "微热管技术"
    }, {
      site: "clients1",
      dir: "相关论著"
    }]
  };
  Client.find({
    fid: 1
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("wrg-technology1.html", {
      data: data,
      result: result
    });
  });
});
router.get("/clients2", function (req, res) {
  var result = {
    pic1: "../public/images/clientsban.jpg",
    pic2: "../public/images/clientsban2.jpg",
    nav: [{
      site: "clients",
      dir: "微热管技术"
    }, {
      site: "clients2",
      dir: "热管散热方案"
    }]
  };
  Client.find({
    fid: 2
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("wrg-technology2.html", {
      data: data,
      result: result
    });
  });
});
router.get("/clients_1", function (req, res) {
  var id = req.query.id;
  var fid = req.query.fid;
  Clientdetail.find({
    cid: id
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    var dat = getdata1(data);
    Client.find({
      fid: fid
    }, function (err, cli) {
      if (err) {
        next(err);
        return;
      }

      dat.cli = cli;
      res.render("clients_01.html", dat);
    });
  });
}); //将路由句柄作为导出模块对象

module.exports = router;