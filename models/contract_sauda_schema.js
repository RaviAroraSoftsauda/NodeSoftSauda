let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let contractSchema = mongoose.Schema({
    brok_yn: {
        type: String,
    },
    main_bk: {
        type: String,
    },
    vouc_code: {
        type: String,
    },
    sd_date: {
        type: Date,
        // default: Date.now
    },
    wght:
    {
        type: String, 
    },
    sl_brok: {
        type: String,
    },
    sl_code: {
        type: Schema.Types.ObjectId, ref: 'party',
    },
    sl_cont: {
        type: String,
    },
    sb_brok: {
        type: String,
    },
    sb_code: {
        type: Schema.Types.ObjectId, 
        ref:'party',
    },
    sb_cont: {
        type: String,
    },
    br_brok: {
        type: String,
    },
    br_code: {
        type: Schema.Types.ObjectId, 
        ref:'party',
    },
    br_cont: {
        type: String,
    },
    bb_brok: {
        type: String,
    },
    bb_code: {
        type: Schema.Types.ObjectId, 
        ref:'party',
    },
    bb_cont: {
        type: String,
    },
    pono: {
        type: String,
    },
    podt: {
        type: String,
    },
    buy_whouse: {
        type: String,
    },
    rmks: {
        type: String,
    },
    delv_load: {
        type: String,
    },
    delv_fr: {
        type: String,
    },
    delv_to: {
        type: String,
    },
    term: {
        type: Schema.Types.ObjectId, 
        ref:'term'
    },
    delvdt: {
        type: String,
    },
    from_ct: {
        type: String,
        // type: Schema.Types.ObjectId, 
        // ref:'city_master',
    },
    to_ct: {
        type: Schema.Types.ObjectId, 
        ref:'city_master',
    },
    paycond: {
        type: String,
    },
    paydiscrt: {
        type: String,
    },
    paycond: {
        type: String,
    },
    cre_days: {
        type: String,
    },
    paydet: {
        type: String,
    },
    party_terms: {
        type: Schema.Types.ObjectId, 
        ref:'narration',
    },
    party_remarks: {
        type: String,
    },

    tot_bags: {
        type: String,
    },
    tot_wght: {
        type: String,
    },
    tot_ammount: {
        type: String,
    },
    sauda2:
    {
        type: Schema.Types.ObjectId, 
        ref:'sauda2',
    },
    c_j_s_p: {
        type: String,
    },
    bno: {
        type: String,
    },
    bdt: {
        type: String,
    },
    mot_no: {
        type: String,
    },
    tptcode: {
        type: String,
    },
    tpt_col: {
        type: String,
    },
    frght: {
        type: String,
    },
    frght_rt: {
        type: String,
    },
    frght_adv: {
        type: String,
    },
    cre_days: {
        type: String,
    },
    add1_rmk: {
        type: String,
    },
    add1_amt: {
        type: String,
    },
    less1_rmk: {
        type: String,
    },
    less1_amt: {
        type: String,
    },
    add2_rmk: {
        type: String,
    },
    add2_amt: {
        type: String,
    },
    less2_rmk: {
        type: String,
    },
    less2_amt: {
        type: String,
    },
    add3_rmk: {
        type: String,
    },
    add3_amt: {
        type: String,
    },
    less3_rmk: {
        type: String,
    },
    less3_amt: {
        type: String,
    },
    barg_amt: {
        type: String,
    },
    bill_amt: {
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
// let sauda = module.exports = mongoose.model('sauda', contractSchema);
let contract_sauda = module.exports = mongoose.model('sauda1', contractSchema);