const express = require('express');
const router = express.Router(); 
const session = require('express-session');
const moment = require('moment-timezone');
const mongoose = require('mongoose');
let contract = require('../models/contract_sauda_schema');
let brand = require('../models/brand_schema');
let product_mast = require('../models/product_mast_schema');
let term = require('../models/term_schema');
let party = require('../models/party_schema');
let narration = require('../models/narration_schema');
let city = require('../models/city_schema');
let sauda = require('../models/contract_sauda2');
// let bank = require('../models/bank_schema');
var query;
router.get('/packname', function (req, res) {
    if( req.query.id ) {
        product_mast.find({sno: req.query.id}, 'product_mast_group', function(err, product_mast){
            // console.log(product_mast);
            res.json({ 'success': true, 'sno': product_mast});
        });
    }
});
router.get('/kindname', function (req, res) {
    if( req.query.id ) {
        party.findById(req.query.id, function(err, party){
            // console.log(party);
            res.json({ 'success': true, 'party': party });
        }).populate('city_name');
    }
});
router.get('/productname', function (req, res) {
        product_mast.find({}, function(err, product_mast){
            brand.find({}, function(err, brand){

            // console.log(party);
            res.json({ 'success': true, 'product_mast': product_mast,'brand': brand });
        });
});
});
// Add Route
router.get('/contract_sauda', ensureAuthenticated, function(req, res){
  contract.find({}, function (err, contract){
    brand.find({}, function (err, brand){
      term.find({}, function (err, term){
         party.find({}, function (err, party){
            narration.find({}, function (err, narration){
              city.find({}, function (err, city){
                 product_mast.find({}, function (err, product_mast){
            if (err) {
                console.log(err);
            } else {
                  res.render('contract_sauda.hbs', {
                    pageTitle:'Add contract',
                    contract: contract,
                    brand: brand,
                    term: term,
                    party: party,
                    narration: narration,
                    city: city,
                    product_mast: product_mast,
                    usrnm: req.session.user,
                    compid: req.session.compid
                });
            }
           });
          });
        });
      }).populate('city_name');
    });
   });
  }).populate('sl_code').sort('-vouc_code');
});
    router.post('/add',function(req, res){
        // console.log(req.body);
        req.checkBody('vouc_code','Sauda No is required').notEmpty();
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
            let contrct = new contract();
            contrct.brok_yn = req.body.brok_yn;
            contrct.main_bk ='SD';
            contrct.c_j_s_p = req.body.c_j_s_p;
            contrct.vouc_code = req.body.vouc_code;
            contrct.sd_date = sdDateObject;
            contrct.sl_brok = req.body.sl_brok;
            contrct.sl_code = req.body.sl_code;
            contrct.sl_cont = req.body.sl_cont;
            contrct.sb_brok = req.body.sb_brok;
            contrct.sb_code = req.body.sb_code;
            contrct.sb_cont = req.body.sb_cont;
            contrct.br_brok = req.body.br_brok;
            contrct.br_code = req.body.br_code;
            contrct.br_cont = req.body.br_cont;
            contrct.bb_brok = req.body.bb_brok;
            contrct.bb_code = req.body.bb_code;
            contrct.bb_cont = req.body.bb_cont;
            contrct.pono = req.body.pono;
            contrct.podt = req.body.podt;
            contrct.buy_whouse = req.body.buy_whouse;
            contrct.rmks = req.body.rmks;
            contrct.delv_load = req.body.delv_load;
            contrct.delv_fr = req.body.delv_fr;
            contrct.delv_to = req.body.delv_to;
            contrct.term = req.body.term;
            contrct.delvdt = req.body.delvdt;
            contrct.from_ct = req.body.from_ct;
            contrct.to_ct = req.body.to_ct;
            contrct.paycond = req.body.paycond;
            contrct.paydiscrt = req.body.paydiscrt;
            contrct.paycond = req.body.paycond;
            contrct.cre_days = req.body.cre_days;
            contrct.paydet = req.body.paydet;
            contrct.party_terms = req.body.party_terms;
            contrct.party_remarks = req.body.party_remarks;
            contrct.tot_bags = req.body.tot_bags;
            contrct.tot_wght = req.body.tot_wght;
            contrct.tot_ammount = req.body.tot_ammount;
            contrct.co_code =  req.session.compid;
            contrct.div_code =  req.session.divid;
            contrct.usrnm =  req.session.user;
            let saud = new sauda();
            saud.sauda1 =contrct._id;
            saud.typ = "SL";
            saud.srno = 1;
            saud.sd_date = sdDateObject;
            saud.vouc_code = req.body.vouc_code;
            saud.contract_sauda_group = req.body.contract_sauda_group;
            saud.pcode = req.body.sl_code;
            saud.sauda_number = req.body.sauda_number;
            saud.co_code =  req.session.compid;
            saud.div_code =  req.session.divid;
            saud.usrnm =  req.session.user;
            saud.save();
            
            let saud1 = new sauda();
            saud1.sauda1 =contrct._id;
            saud1.typ = "BR";
            saud1.srno = 1;
            saud1.sd_date =sdDateObject;
            saud1.vouc_code = req.body.vouc_code;
            saud1.contract_sauda_group = req.body.contract_sauda_group;
            saud1.pcode = req.body.br_code;
            saud1.sauda_number = req.body.sauda_number;
            saud1.co_code =  req.session.compid;
            saud1.div_code =  req.session.divid;
            saud1.usrnm =  req.session.user;
            saud1.save();
        
        // saud.sauda1 =contrct._id;
        // saud.typ = "BR";
        // saud.srno = 1;
        // saud.contract_sauda_group = req.body.contract_sauda_group;
        // saud.pcode = req.body.br_code;
        // saud.sauda_number = req.body.sauda_number;
        // saud.save();
        
        // saud.sauda1 =contrct._id;
        // saud.typ = "BB";
        // saud.srno = 1;
        // saud.contract_sauda_group = req.body.contract_sauda_group;
        // saud.pcode = req.body.bb_code;
        // saud.sauda_number = req.body.sauda_number;
        // saud.save();

        // console.log (saud._id);
        // console.log ('sauda2'+contrct._id);
        // contrct.sauda2.push(saud._id);
        contrct.sauda2 = saud._id;
         contrct.save(function (err){
            if(err)
            {
                res.json({'success':false,'message':'error in saving contrct','errors':err});
                return;
            }
            else
            {
                // res.json({ 'success': true, 'message': 'Order added succesfully' });
                res.redirect('/contract_sauda/contract_sauda_list');
            }
            });
        }               
    });
    router.get('/contract_sauda_list', ensureAuthenticated ,function(req,res){
        contract.find({main_bk:"SD",co_code:req.session.compid,div_code:req.session.divid,usrnm :req.session.user}, function (err,contract){
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.render('contract_sauda_list.hbs',{
                    pageTitle:'contract List',
                    contract:contract
                });
            }
        }).populate('sl_code').populate('br_code');   
       });
       
       router.get('/contract_sauda_list_update/:id', ensureAuthenticated, function(req, res){
            contract.findById(req.params.id, function(err, contract){
            sauda.findById(req.params.id, function(err, sauda){
          brand.find({}, function (err, brand){
            term.find({}, function (err, term){
              party.find({}, function (err, party){
                narration.find({}, function (err, narration){
                  city.find({}, function (err, city){
                    product_mast.find({}, function (err, product_mast){
                if (err) {
                    console.log(err);
                } else {
                    //  console.log(contract.br_code);
                    res.render('contract_sauda_list_update.hbs', {
                        pageTitle:'Update Party',
                        contract: contract,
                        sauda: sauda,
                        brand: brand,
                        term: term,
                        party: party,
                        narration: narration,
                        city: city,
                        product_mast: product_mast,
                    });
                }
            }).sort({state_name: 'asc'});
         });
      });
    }).populate('city_name');
});
});
});
}).populate('sauda2')});

        router.post('/update/:id', function(req, res) {
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
                let contrct = {};
                contrct.brok_yn = req.body.brok_yn;
                contrct.main_bk ='SD';
                contrct.c_j_s_p = req.body.c_j_s_p;
                contrct.vouc_code = req.body.vouc_code;
                contrct.sd_date = sdDateObject;
                contrct.sl_brok = req.body.sl_brok;
                contrct.sl_code = req.body.sl_code;
                contrct.sl_cont = req.body.sl_cont;
                contrct.sb_brok = req.body.sb_brok;
                contrct.sb_code = req.body.sb_code;
                contrct.sb_cont = req.body.sb_cont;
                contrct.br_brok = req.body.br_brok;
                contrct.br_code = req.body.br_code;
                contrct.br_cont = req.body.br_cont;
                contrct.bb_brok = req.body.bb_brok;
                contrct.bb_code = req.body.bb_code;
                contrct.bb_cont = req.body.bb_cont;
                contrct.pono = req.body.pono;
                contrct.podt = req.body.podt;
                contrct.buy_whouse = req.body.buy_whouse;
                contrct.rmks = req.body.rmks;
                contrct.delv_load = req.body.delv_load;
                contrct.delv_fr = req.body.delv_fr;
                contrct.delv_to = req.body.delv_to;
                contrct.term = req.body.term;
                contrct.delvdt = req.body.delvdt;
                contrct.from_ct = req.body.from_ct;
                contrct.to_ct = req.body.to_ct;
                contrct.paycond = req.body.paycond;
                contrct.paydiscrt = req.body.paydiscrt;
                contrct.paycond = req.body.paycond;
                contrct.cre_days = req.body.cre_days;
                contrct.paydet = req.body.paydet;
                contrct.party_terms = req.body.party_terms;
                contrct.party_remarks = req.body.party_remarks;
                contrct.tot_bags = req.body.tot_bags;
                contrct.tot_wght = req.body.tot_wght;
                contrct.tot_ammount = req.body.tot_ammount;
                contrct.co_code =  req.session.compid;
                contrct.div_code =  req.session.divid;
                contrct.usrnm =  req.session.user;
                // contrct.sauda2 = contrct._id
                let saud = {};
                // saud.sauda1 =contrct.id;
                saud.sd_date = sdDateObject;
                saud.contract_sauda_group = req.body.contract_sauda_group;
                saud.pcode = req.body.sl_code;
                saud.sauda_number = req.body.sauda_number;
                saud.co_code =  req.session.compid;
                saud.div_code =  req.session.divid;
                saud.usrnm =  req.session.user;

               let query = {srno:1,vouc_code:req.body.vouc_code,typ:"SL"};
             
                    // sauda2.update
                    sauda.update(query ,saud ,function (err) {
                        if (err) {
                            res.json({ 'success': false, 'message': 'Error in Saving contract', 'errors': err });
                            return;
                        } 
                    });
                    
                    // contract.update
                    let quer = {_id:req.params.id}
                    contract.update(quer ,contrct ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving contract', 'errors': err });
                        return;
                    } else {
                        // res.json({ 'success': true, 'message': 'Order added succesfully' });
                        res.redirect('/contract_sauda/contract_sauda_list');
                    }
                });
            }
        });
        router.get('/delete_contract_sauda/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            contract.findById(req.params.id, function(err, contract){
                contract.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    // res.send('Success');
                    res.redirect('/contract_sauda/contract_sauda_list');
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