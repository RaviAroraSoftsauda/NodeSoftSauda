const express = require('express');
const router = express.Router(); 
const moment = require('moment-timezone');
let delveryentry1 = require('../models/contract_sauda_schema');
let delveryentry2 = require('../models/contract_sauda2');
let brand = require('../models/brand_schema');
let product_mast = require('../models/product_mast_schema');
let term = require('../models/term_schema');
let party = require('../models/party_schema');
let narration = require('../models/narration_schema');
let city = require('../models/city_schema');

// Add Route
router.get('/delivery_register', ensureAuthenticated ,function(req,res){
        delveryentry1.find({main_bk : "DLV",co_code:req.session.compid,div_code:req.session.divid,usrnm :req.session.user}, function (err,delveryentry1){
        brand.find({}, function (err, brand){
        term.find({}, function (err, term){
        party.find({}, function (err, party){
        narration.find({}, function (err, narration){
        city.find({}, function (err, city){
        product_mast.find({}, function (err, product_mast){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('delivery_register.hbs',{
                pageTitle:'delvery register',
                delveryentry1:delveryentry1,
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
}).populate('sauda2').populate('sl_code').populate('sb_code').populate('br_code').populate('bb_code');
});
router.post('/deleverydetail', function(req, res) {
    var sl_code = req.body.sl_code;
    var sb_code = req.body.sb_code;
    var br_code = req.body.br_code;
    var bb_code = req.body.bb_code;
    // ,sb_code:sb_code,br_code:br_code,bb_code:bb_code
    delveryentry1.find({main_bk:"DLV",sl_code:sl_code}, function (err, delveryentry1) {
         console.log(br_code);
        if (err) {
            console.log(err);
        } else {
            res.json({ 'success': true, 'delveryentry1': delveryentry1 });
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