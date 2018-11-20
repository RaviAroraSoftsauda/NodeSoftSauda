let mongoose = require('mongoose');

// Brand Schema
let dailyratesSchema = mongoose.Schema({
    st_name: {
        type: String,
    },
    item_name: {
        type: String,
        required: true
    },
    prod_spec: {
        type: String,
    },
    rate_min: {
        type: String,
        required: true
    },
    rate_max: {
        type: String,
        required: true
    },
    rate_condtion: {
        type: String,
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
let daily_rates = module.exports = mongoose.model('daily_rates', dailyratesSchema);