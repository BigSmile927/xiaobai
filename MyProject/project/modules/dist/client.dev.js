"use strict";

var mongoose = require("mongoose");

var clientScheme = mongoose.Schema({
  cid: Number,
  fid: Number,
  title: String,
  src: String
});
var client = mongoose.model("client", clientScheme);
module.exports = client;