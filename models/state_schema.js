let mongoose = require('mongoose');

// Brand Schema
let stateSchema = mongoose.Schema({
    state_name: {
        type: String,
        required: true
    },
    state_code: {
        type: Number,
        required: true
    },
    state_capital: {
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
let state_master = module.exports = mongoose.model('state_master', stateSchema);