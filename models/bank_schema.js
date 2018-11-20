let mongoose = require('mongoose');

// Brand Schema
let bankSchema = mongoose.Schema({
    bank_name: {
        type: String,
        required: true
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
let bank = module.exports = mongoose.model('bank', bankSchema);