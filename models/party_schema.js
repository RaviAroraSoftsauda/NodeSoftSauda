let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let partySchema = mongoose.Schema({
    p_type: {
        type: String,
        required: true
    },
    party_name: {
        type: String,
        // required: true
    },
    address1: {
        type: String,
        // required: true
    },
    address2: {
        type: String,
        // required: true
    },
    area_name: {
        type: String,
        // required: true
    },
    city_name: {
            type: Schema.Types.ObjectId, ref:'city_master',
            required: true
    },
    state_name: {
        type: Schema.Types.ObjectId, ref:'state_master',
    },
    pin_code: {
        type: Number,
        // required: true
    },
    credit_limit: {
        type: String,
        // required: true
    },
    pan_no: {
        type: String,
        // required: true
    },
    gstin: {
        type: String,
        // required: true
    },
    phone_ofc: {
        type: Number,
        // required: true
    },
    phone_resi: {
        type: Number,
        // required: true
    },
    fssai: {
        type: String,
        // required: true
    },
    fax: {
        type: String,
        // required: true
    },
    mob_no: {
        type: Number,
        // required: true
    },
    mob_num:
    {
        type: Number, 
    },
    proprietor_name: {
        type: String,
        // required: true
    },
    group_name: {
        type: String,
        // required: true
    },
    category: {
        type: String,
        // required: true
    },
    remark: {
        type: String,
        // required: true
    },
    working:{
        type: String,
        // required: true
    },
    envelope:{
        type: String,
        // required: true
    },
    party_bank:
    {
        type: Array
    },
    contact_group:
    {
        type: Array 
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
let party = module.exports = mongoose.model('party', partySchema);