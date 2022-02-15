const mongoose = require("mongoose");

var newsdetailScheme = mongoose.Schema({
    cid: Number,
    fid:Number,
    title: String,
    date: String,
    detail: String,
});

var Newsdetail = mongoose.model("newsdetail", newsdetailScheme)

module.exports = Newsdetail;
