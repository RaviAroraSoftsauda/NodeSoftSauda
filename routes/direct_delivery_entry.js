const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
let delveryentry1 = require('../models/contract_sauda_schema');
let delveryentry2 = require('../models/contract_sauda2');
let brand = require('../models/brand_schema');
let product_mast = require('../models/product_mast_schema');
let term = require('../models/term_schema');
let party = require('../models/party_schema');
let narration = require('../models/narration_schema');
let city = require('../models/city_schema');
 let transport = require('../models/transport_schema');
 const moment = require('moment-timezone');
var query;
// router.get('/packname', function (req, res) {
//     if( req.query.id ) {
//         product_mast.find({sno: req.query.id}, 'product_mast_group', function(err, product_mast){
//             console.log(product_mast);
//             res.json({ 'success': true, 'sno': product_mast});
//         });
//     }
// });
router.get('/kindname', function (req, res) {
    if( req.query.id ) {
        party.findById(req.query.id, function(err, party){
            console.log(party);
            res.json({ 'success': true, 'party': party });
        });
    }
});
// Add Route
router.get('/direct_delivery_entry', ensureAuthenticated, function(req, res){
    delveryentry1.find({}, function (err, delveryentry1){
    brand.find({}, function (err, brand){
      term.find({}, function (err, term){
         party.find({}, function (err, party){
            narration.find({}, function (err, narration){
              city.find({}, function (err, city){
                 product_mast.find({}, function (err, product_mast){
                    transport.find({}, function (err, transport){
            if (err) {
                console.log(err);
            } else {
                res.render('direct_delivery_entry.hbs', {
                    pageTitle:'Add delivery',
                    delveryentry1: delveryentry1,
                    brand: brand,
                    term: term,
                    party: party,
                    narration: narration,
                    city: city,
                    product_mast: product_mast,
                    transport: transport,
                });
            }
           });
          });
        });
      });
    }).populate('city_name');
   });
  });
}).sort('-vouch_code');
});
    router.post('/add',function(req, res){
        //console.log(req.body);
        if(req.body.sb_code=="Select") req.body.sb_code=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.bb_code=="Select") req.body.bb_code=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.sl_code=="Select") req.body.sl_code=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.br_code=="Select") req.body.br_code=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        var sd_date = req.body.sd_date;
        var sdDateObject =  moment(sd_date, "DD/MM/YYYY hh:mm a").tz("Asia/Kolkata");
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let delveryentry = new delveryentry1();
            delveryentry.brok_yn = req.body.brok_yn;
            delveryentry.main_bk ='DDLV';
            delveryentry.c_j_s_p = req.body.c_j_s_p;
            delveryentry.vouc_code = req.body.vouc_code;
            delveryentry.sd_date = sdDateObject;
            delveryentry.sl_brok = req.body.sl_brok;
            delveryentry.sl_code = req.body.sl_code;
            delveryentry.sl_cont = req.body.sl_cont;
            delveryentry.sb_brok = req.body.sb_brok;
            delveryentry.sb_code = req.body.sb_code;
            delveryentry.sb_cont = req.body.sb_cont;
            delveryentry.br_brok = req.body.br_brok;
            delveryentry.br_code = req.body.br_code;
            delveryentry.br_cont = req.body.br_cont;
            delveryentry.bb_brok = req.body.bb_brok;
            delveryentry.bb_code = req.body.bb_code;
            delveryentry.bb_cont = req.body.bb_cont;
            delveryentry.term = req.body.term;
            delveryentry.paycond = req.body.paycond;
            delveryentry.paydiscrt = req.body.paydiscrt;
            delveryentry.paycond = req.body.paycond;
            delveryentry.cre_days = req.body.cre_days;
            delveryentry.paydet = req.body.paydet;
            delveryentry.party_terms = req.body.party_terms;
            delveryentry.party_remarks = req.body.party_remarks;
            delveryentry.tot_bags = req.body.tot_bags;
            delveryentry.tot_wght = req.body.tot_wght;
            delveryentry.tot_ammount = req.body.tot_ammount;
            delveryentry.c_j_s_p = req.body.c_j_s_p;
            delveryentry.bno = req.body.bno;
            delveryentry.bdt = req.body.bdt;
            delveryentry.mot_no = req.body.mot_no;
            delveryentry.tptcode = req.body.tptcode;
            delveryentry.tpt_col = req.body.tpt_col;
            delveryentry.frght = req.body.frght;
            delveryentry.frght_rt = req.body.frght_rt;
            delveryentry.frght_adv = req.body.frght_adv;
            delveryentry.cre_days = req.body.cre_days;
            delveryentry.add1_rmk = req.body.add1_rmk;
            delveryentry.add1_amt = req.body.add1_amt;
            delveryentry.less1_rmk = req.body.less1_rmk;
            delveryentry.less1_amt = req.body.less1_amt;
            delveryentry.add2_rmk = req.body.add2_rmk;
            delveryentry.add2_amt = req.body.add2_amt;
            delveryentry.less2_rmk = req.body.less2_rmk;
            delveryentry.less2_amt = req.body.less2_amt;
            delveryentry.add3_rmk = req.body.add3_rmk;
            delveryentry.add3_amt = req.body.add3_amt;
            delveryentry.less3_rmk = req.body.less3_rmk;
            delveryentry.less3_amt = req.body.less3_amt;
            delveryentry.barg_amt = req.body.barg_amt;
            delveryentry.bill_amt = req.body.bill_amt;
            delveryentry.co_code =  req.session.compid;
            delveryentry.div_code =  req.session.divid;
            delveryentry.usrnm =  req.session.user;
            let delvery = new delveryentry2();
            delvery.sauda1 =delveryentry._id;
            delvery.typ = "SL";
            delvery.srno = 1;
            delvery.sd_date = sdDateObject;
            delvery.vouc_code = req.body.vouc_code;
            delvery.contract_sauda_group = req.body.contract_sauda_group;
            delvery.pcode = req.body.sl_code;
            delvery.sauda_number = req.body.sauda_number;
            delvery.co_code =  req.session.compid;
            delvery.div_code =  req.session.divid;
            delvery.usrnm =  req.session.user;
            delvery.save();
            
            let delvery2 = new delveryentry2();
            delvery2.sauda1 =delveryentry._id;
            delvery2.typ = "BR";
            delvery2.srno = 1;
            delvery2.sd_date = sdDateObject;
            delvery2.vouc_code = req.body.vouc_code;
            delvery2.contract_sauda_group = req.body.contract_sauda_group;
            delvery2.pcode = req.body.br_code;
            delvery2.co_code =  req.session.compid;
            delvery2.div_code =  req.session.divid;
            delvery2.usrnm =  req.session.user;
            delvery2.save();
            delveryentry.sauda2 = delvery._id;
            delveryentry.save(function (err){
            if(err)
            {
                res.json({'success':false,'message':'error in saving delvery entry','errors':err});
                return;
            }
            else
            {
                res.redirect('/direct_delivery_entry/direct_delivery_entry_list');
            }
            });
        }               
    });
    router.get('/direct_delivery_entry_list', ensureAuthenticated ,function(req,res){
        delveryentry1.find({main_bk : "DDLV",co_code:req.session.compid,div_code:req.session.divid,usrnm :req.session.user}, function (err,delveryentry1){
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.render('direct_delivery_entry_list.hbs',{
                    pageTitle:'delvery entry List',
                    delveryentry1:delveryentry1
                });
            }
        }).populate('party_terms');   
       });
       router.get('/direct_entry_list_update/:id', ensureAuthenticated, function(req, res){
        delveryentry1.findById(req.params.id, function(err, delveryentry1){
          brand.find({}, function (err, brand){
            term.find({}, function (err, term){
              party.find({}, function (err, party){
                narration.find({}, function (err, narration){
                  city.find({}, function (err, city){
                    product_mast.find({}, function (err, product_mast){
                        transport.find({}, function (err, transport){
                if (err) {
                    console.log(err);
                } else {
                    res.render('direct_delivery_entry_list_update.hbs',{
                        pageTitle:'Update delvery entry',
                        delveryentry1: delveryentry1,
                        brand: brand,
                        term: term,
                        party: party,
                        narration: narration,
                        city: city,
                        product_mast: product_mast,
                        transport: transport,
                    });
                }
            });
         });
      });
    });
}).populate('city_name');
});
});
}).populate('sauda2')
});
        router.post('/direct_entry_list_update/:id', function(req, res) {
            if(req.body.sb_code=="Select") req.body.sb_code=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            if(req.body.bb_code=="Select") req.body.bb_code=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            if(req.body.sl_code=="Select") req.body.sl_code=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            if(req.body.br_code=="Select") req.body.br_code=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            let errors = req.validationErrors();
            var sd_date = req.body.sd_date;
            var sdDateObject =  moment(sd_date, "DD/MM/YYYY hh:mm a").tz("Asia/Kolkata");
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let delveryentry = {};
                delveryentry.brok_yn = req.body.brok_yn;
                delveryentry.main_bk ='DDLV';
                delveryentry.c_j_s_p = req.body.c_j_s_p;
                delveryentry.vouc_code = req.body.vouc_code;
                delveryentry.sd_date = sdDateObject;
                delveryentry.sl_brok = req.body.sl_brok;
                delveryentry.sl_code = req.body.sl_code;
                delveryentry.sl_cont = req.body.sl_cont;
                delveryentry.sb_brok = req.body.sb_brok;
                delveryentry.sb_code = req.body.sb_code;
                delveryentry.sb_cont = req.body.sb_cont;
                delveryentry.br_brok = req.body.br_brok;
                delveryentry.br_code = req.body.br_code;
                delveryentry.br_cont = req.body.br_cont;
                delveryentry.bb_brok = req.body.bb_brok;
                delveryentry.bb_code = req.body.bb_code;
                delveryentry.bb_cont = req.body.bb_cont;
                delveryentry.term = req.body.term;
                delveryentry.paycond = req.body.paycond;
                delveryentry.paydiscrt = req.body.paydiscrt;
                delveryentry.paycond = req.body.paycond;
                delveryentry.cre_days = req.body.cre_days;
                delveryentry.paydet = req.body.paydet;
                delveryentry.party_terms = req.body.party_terms;
                delveryentry.party_remarks = req.body.party_remarks;
                delveryentry.tot_bags = req.body.tot_bags;
                delveryentry.tot_wght = req.body.tot_wght;
                delveryentry.tot_ammount = req.body.tot_ammount;
                delveryentry.c_j_s_p = req.body.c_j_s_p;
                delveryentry.bno = req.body.bno;
                delveryentry.bdt = req.body.bdt;
                delveryentry.mot_no = req.body.mot_no;
                delveryentry.tptcode = req.body.tptcode;
                delveryentry.tpt_col = req.body.tpt_col;
                delveryentry.frght = req.body.frght;
                delveryentry.frght_rt = req.body.frght_rt;
                delveryentry.frght_adv = req.body.frght_adv;
                delveryentry.cre_days = req.body.cre_days;
                delveryentry.add1_rmk = req.body.add1_rmk;
                delveryentry.add1_amt = req.body.add1_amt;
                delveryentry.less1_rmk = req.body.less1_rmk;
                delveryentry.less1_amt = req.body.less1_amt;
                delveryentry.add2_rmk = req.body.add2_rmk;
                delveryentry.add2_amt = req.body.add2_amt;
                delveryentry.less2_rmk = req.body.less2_rmk;
                delveryentry.less2_amt = req.body.less2_amt;
                delveryentry.add3_rmk = req.body.add3_rmk;
                delveryentry.add3_amt = req.body.add3_amt;
                delveryentry.less3_rmk = req.body.less3_rmk;
                delveryentry.less3_amt = req.body.less3_amt;
                delveryentry.barg_amt = req.body.barg_amt;
                delveryentry.bill_amt = req.body.bill_amt;
                delveryentry.co_code =  req.session.compid;
                delveryentry.div_code =  req.session.divid;
                delveryentry.usrnm =  req.session.user;
                let delvery = {};
                delvery.sauda1 =delveryentry.id;
                delvery.sd_date = sdDateObject;
                delvery.contract_sauda_group = req.body.contract_sauda_group;
                delvery.pcode = req.body.sl_code;
                delvery.sauda_number = req.body.sauda_number;
                delvery.co_code =  req.session.compid;
                delvery.div_code =  req.session.divid;
                delvery.usrnm =  req.session.user;
               let query = {srno:1,vouc_code:req.body.vouc_code,typ:"SL"};
             
                    // sauda2.update
                    delveryentry2.update(query ,delvery ,function (err) {
                        if (err) {
                            res.json({ 'success': false, 'message': 'Error in Saving delveryentry2', 'errors': err });
                            return;
                        } 
                    });
                    
                    // Delibery.update
                    let quer = {_id:req.params.id}
                    delveryentry1.update(quer ,delveryentry ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving delveryentry', 'errors': err });
                        return;
                    } else {
                        // res.json({ 'success': true, 'message': 'Order added succesfully' });
                        res.redirect('/direct_delivery_entry/direct_delivery_entry_list');
                    }
                });
            }
        });
        router.get('/delete_direct_delivery_entry/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            delveryentry1.findById(req.params.id, function(err, delveryentry1){
                delveryentry1.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/direct_delivery_entry/direct_delivery_entry_list');
                });
            });
        });
// Access Control 
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/userright/login');
    }
}

module.exports = router;