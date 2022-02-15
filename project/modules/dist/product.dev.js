"use strict";

var mongoose = require("mongoose");

var productcenScheme = mongoose.Schema({
  cid: Number,
  fid: Number,
  title: String,
  des: String,
  src: String
});
var productcen = mongoose.model("productcen", productcenScheme);
module.exports = productcen;