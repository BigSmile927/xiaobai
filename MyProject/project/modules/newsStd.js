const mongoose = require("mongoose");

var newsStdScheme = mongoose.Schema({
    cid:Number,
    fid:Number,
    year:String,
    date:String,
    title:String,
    introduce:String,
    src:String,
});

var NewsStd = mongoose.model("newsstd", newsStdScheme)

module.exports = NewsStd;
