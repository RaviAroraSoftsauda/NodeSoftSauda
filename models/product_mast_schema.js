let mongoose = require('mongoose');

// Brand Schema
let productmastSchema = mongoose.Schema({
    p_code: {
        type: String,
    },
    product_name: {
        type: String,
        required: true
    },
    short_name: {
        type: String,
    },
    hsn_code: {
        type: String,
    },
    item_name: {
        type: String,
    },
    item_unit: {
        type: String,
    },
    product_mast_group: {
        type: Array
    },
    brandprice: {
        type: Object,
    },
    timestamp:
    {
        type:Date,
        default:Date.now
    },
    co_code:{
        type:String,
    },
    div_code:{
        type:String,
    },
    usrnm:{
        type:String,
    }
});
let product_mast = module.exports = mongoose.model('product_mast', productmastSchema);