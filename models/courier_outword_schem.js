let mongoose = require('mongoose');

// Brand Schema
let courieroutwordSchema = mongoose.Schema({
    cou_date: {
        type: String,
        // required: true
    },
    party_sno: {
        type: String,
        // required: true
    },
    cou_nm: {
        type: String,
        // required: true
    },
    cou_lotno: {
        type: String,
        // required: true
    },
    cou_product: {
        type: String,
        // required: true
    },
    cou_brand: {
        type: String,
        // required: true
    },
    cou_rate: {
        type: String,
        // required: true
    },
    cou_contdition: {
        type: String,
        // required: true
    },
    cou_rcpt: {
        type: String,
        // required: true
    },
    cou_content: {
        type: String,
        // required: true
    },
    remarks: {
        type: String,
        // required: true
    },
    cou_crgs: {
        type: String,
        // required: true
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
let courier_outword = module.exports = mongoose.model('courier_outword', courieroutwordSchema);