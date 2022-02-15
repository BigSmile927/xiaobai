const mongoose = require("mongoose");

var clientdetailScheme = mongoose.Schema({
    cid: Number,
    fid:Number,
    title: String,
    date: String,
    detail: String,
});

var clientdetail = mongoose.model("clientdetail", clientdetailScheme)

module.exports = clientdetail;
