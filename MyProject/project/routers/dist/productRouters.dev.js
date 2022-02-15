"use strict";

//产品页面
var express = require('express');

var productcen = require('../modules/product');

var product = require('../modules/productx');

var router = express.Router();

function getdata2(data) {
  var result = {
    pic1: "../public/images/procen.jpg",
    pic2: "../public/images/procen2.jpg"
  };

  for (var key in data) {
    if (data[key].fid == 1) {
      result.nav = [{
        site: "/pro/product_cen",
        dir: "产品中心"
      }, {
        site: "/pro/product_cen1",
        dir: "超薄热管"
      }];
    } else if (data[key].fid == 2) {
      result.nav = [{
        site: "/pro/product_cen",
        dir: "产品中心"
      }, {
        site: "/pro/product_cen2",
        dir: "常规热管"
      }];
    } else if (data[key].fid == 3) {
      result.nav = [{
        site: "/pro/product_cen",
        dir: "产品中心"
      }, {
        site: "/pro/product_cen3",
        dir: "均热管VC"
      }];
    } else if (data[key].fid == 4) {
      result.nav = [{
        site: "/pro/product_cen",
        dir: "产品中心"
      }, {
        site: "/pro/product_cen4",
        dir: "方形热管"
      }];
    } else {
      result.nav = [{
        site: "/pro/product_cen",
        dir: "产品中心"
      }, {
        site: "/pro/product_cen5",
        dir: "大管径热管"
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

router.get('/product_cen', function (req, res, next) {
  var result = {
    pic1: "../public/images/procen.jpg",
    pic2: "../public/images/procen2.jpg",
    nav: [{
      site: "/pro/product_cen",
      dir: "产品中心"
    }]
  };
  productcen.find(function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("product-center.html", {
      value: data,
      result: result
    });
  }).limit(9).sort({
    cid: 1
  });
});
router.get('/product_cen_2', function (req, res, next) {
  var result = {
    pic1: "../public/images/procen.jpg",
    pic2: "../public/images/procen2.jpg",
    nav: [{
      site: "/pro/product_cen",
      dir: "产品中心"
    }]
  };
  productcen.find(function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("product-center.html", {
      value: data,
      fen: 2,
      result: result
    });
  }).limit(9).skip(9).sort({
    cid: 1
  });
});
router.get('/product_cen1', function (req, res, next) {
  var result = {
    pic1: "../public/images/procen.jpg",
    pic2: "../public/images/procen2.jpg",
    nav: [{
      site: "/pro/product_cen",
      dir: "产品中心"
    }, {
      site: "/pro/product_cen1",
      dir: "超薄热管"
    }]
  };
  productcen.find({
    fid: 1
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("product-center1.html", {
      value: data,
      result: result
    });
  }).sort({
    cid: 1
  });
});
router.get('/product_cen2', function (req, res, next) {
  var result = {
    pic1: "../public/images/procen.jpg",
    pic2: "../public/images/procen2.jpg",
    nav: [{
      site: "/pro/product_cen",
      dir: "产品中心"
    }, {
      site: "/pro/product_cen2",
      dir: "常规热管"
    }]
  };
  productcen.find({
    fid: 2
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("product-center2.html", {
      value: data,
      result: result
    });
  }).sort({
    cid: 1
  });
});
router.get('/product_cen3', function (req, res, next) {
  var result = {
    pic1: "../public/images/procen.jpg",
    pic2: "../public/images/procen2.jpg",
    nav: [{
      site: "/pro/product_cen",
      dir: "产品中心"
    }, {
      site: "/pro/product_cen3",
      dir: "均热管VC"
    }]
  };
  productcen.find({
    fid: 3
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("product-center3.html", {
      value: data,
      result: result
    });
  }).sort({
    cid: 1
  });
});
router.get('/product_cen4', function (req, res, next) {
  var result = {
    pic1: "../public/images/procen.jpg",
    pic2: "../public/images/procen2.jpg",
    nav: [{
      site: "/pro/product_cen",
      dir: "产品中心"
    }, {
      site: "/pro/product_cen4",
      dir: "方形热管"
    }]
  };
  productcen.find({
    fid: 4
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("product-center4.html", {
      value: data,
      result: result
    });
  }).sort({
    cid: 1
  });
});
router.get('/product_cen5', function (req, res, next) {
  var result = {
    pic1: "../public/images/procen.jpg",
    pic2: "../public/images/procen2.jpg",
    nav: [{
      site: "/pro/product_cen",
      dir: "产品中心"
    }, {
      site: "/pro/product_cen5",
      dir: "大管径热管"
    }]
  };
  productcen.find({
    fid: 5
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    res.render("product-center5.html", {
      value: data,
      result: result
    });
  }).sort({
    cid: 1
  });
});
router.get('/product', function (req, res, next) {
  var result = {
    pic1: "../public/images/procen.jpg",
    pic2: "../public/images/procen2.jpg",
    nav: [{
      site: "/pro/product_cen",
      dir: "产品中心"
    }]
  };
  var id = req.query.id;
  product.find({
    cid: id
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }

    var cc = getdata2(data);
    productcen.find({
      fid: data[0].fid
    }, function (err, recommend) {
      if (err) {
        next(err);
        return;
      }

      cc.recommend = recommend;
      res.render("product.html", cc);
    }).limit(3).sort({
      cid: 1
    });
  });
}); //将路由句柄作为导出模块对象

module.exports = router;