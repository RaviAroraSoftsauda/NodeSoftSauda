let mongoose = require('mongoose');
var Schema = mongoose.Schema;
let contractSchema = mongoose.Schema({
    contract_sauda: {
        type: Schema.Types.ObjectId, ref:'contract_sauda',
    },
    pcode: {
        type: Schema.Types.ObjectId, ref:'party_schema',
        required: true
        // type: String,
    },
    vouc_code: {
        type: Number,
    },
    typ: {
        type: String,
    },
    srno: {
        type: Number,
    },
    sd_date: {
        type: Date,
        default: Date.now
    },
    contract_sauda_group:
    {
        type: Array ,
    },
    sauda1:
    {
        type: Schema.Types.ObjectId, 
        ref:'sauda1',
        required:true
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

let sauda = module.exports = mongoose.model('sauda2', contractSchema);