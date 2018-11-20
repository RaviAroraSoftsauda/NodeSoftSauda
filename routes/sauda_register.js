const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const moment = require('moment-timezone');
let contract = require('../models/contract_sauda_schema');
let brand = require('../models/brand_schema');
let product_mast = require('../models/product_mast_schema');
let term = require('../models/term_schema');
let party = require('../models/party_schema');
let narration = require('../models/narration_schema');
let city = require('../models/city_schema');
let sauda = require('../models/contract_sauda2');

// Add Route
router.get('/sauda_register', ensureAuthenticated, function(req, res){
    contract.find({main_bk:"SD",co_code:req.session.compid,div_code:req.session.divid,usrnm :req.session.user}, function (err, contract){
        brand.find({}, function (err, brand){
          term.find({}, function (err, term){
             party.find({}, function (err, party){
                narration.find({}, function (err, narration){
                  city.find({}, function (err, city){
                     product_mast.find({}, function (err, product_mast){
            if (err) {
                console.log(err);
            } else {
                res.render('sauda_register.hbs', {
                    pageTitle:'Sauda Register',
                    contract: contract,
                    brand: brand,
                    term: term,
                    party: party,
                    narration: narration,
                    city: city,
                    product_mast: product_mast,
                });
            }
        })
    });
});
});
});
});
}).populate('sauda2').populate('sl_code');
});

router.post('/contractdetail', function(req, res) {
    
    var slcode = req.body.sl_code;
    var sbcode = req.body.sb_code;
    var brcode = req.body.br_code;
    var bbcode = req.body.bb_code;
    var startdate = req.body.filterstartdate;
    var enddate = req.body.filterenddate;
  
    //  console.log(startdate);

    if (slcode=="Select") slcode=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if (sbcode=="Select") sbcode=mongoose.Types.ObjectId('578df3efb618f5141202a196');   
    if (brcode=="Select") brcode=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if (bbcode=="Select") bbcode=mongoose.Types.ObjectId('578df3efb618f5141202a196');

    //  console.log(slcode);

    // const startmiliseconds = moment(startdate, "DD/MM/YYYY").tz("Asia/Kolkata").startOf('month').format('x');
    // const endmiliseconds = moment(enddate, "DD/MM/YYYY").tz("Asia/Kolkata").endOf('month').format('x');
   // contract.find({$and: [{ordermilisecond:{$gte:startmiliseconds}},{ordermilisecond:{$lte:endmiliseconds}}]}, function (err, contract) {
    contract.find({$and: [{main_bk:"SD"},{ $or: [{sl_code:slcode},{sb_code:sbcode},{br_code:brcode},{bb_code:bbcode}]},{sd_date:{$gte:startdate}},{sd_date:{$lte:enddate}}]}, function (err, contract) {

        // 
        //,
        //console.log(contract);
     if (err) {
            console.log(err);
        } else {
            res.json({ 'success': true, 'contract': contract});
        }
    }).populate('sauda2').populate('sl_code').populate('sb_code').populate('br_code').populate('bb_code');
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