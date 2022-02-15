const mongoose = require("mongoose");

var productScheme = mongoose.Schema({
    cid: Number,
    fid:Number,
    name: String,
    canshu: String,
    fanwei: String,
    prc1: String,
    prc2: Array,
});

var product = mongoose.model("product", productScheme)

module.exports = product;
