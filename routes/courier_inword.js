const express = require('express');
const router = express.Router(); 
let courier_inword = require('../models/courier_inword_schema');
let party = require('../models/party_schema');
let product = require('../models/product_schema');
let brand = require('../models/brand_schema');
let courier = require('../models/courier_schema');
var query;

// Add Route
router.get('/courier_inword', ensureAuthenticated, function(req, res){
    courier_inword.find({}, function (err,courier_inword){
    courier.find({}, function (err, courier){
        party.find({}, function (err, party){
            product.find({}, function (err, product){
                brand.find({}, function (err, brand){
            if (err) {
                console.log(err);
            } else {
                res.render('courier_inword.hbs', {
                    pageTitle:'Add courier',
                    courier_inword: courier_inword,
                    courier: courier,
                    party: party,
                    product: product,
                    brand: brand,
                });
            }
        })
    });
});
});
});
});
    router.post('/courier_inword_add',function(req, res){
        // console.log(req.body);
        // req.checkBody('courier_name','courier Name is required').notEmpty();
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let courer = new courier_inword();
            courer.cou_date = req.body.cou_date;
            courer.party_sno = req.body.party_sno;
            courer.cou_nm = req.body.cou_nm;
            courer.cou_lotno = req.body.cou_lotno;
            courer.cou_product = req.body.cou_product;
            courer.cou_brand = req.body.cou_brand;
            courer.cou_rate = req.body.cou_rate;
            courer.cou_contdition = req.body.cou_contdition;
            courer.cou_rcpt = req.body.cou_rcpt;
            courer.cou_content = req.body.cou_content;
            courer.remarks = req.body.remarks;
            courer.cou_crgs = req.body.cou_crgs;
            courer.co_code =  req.session.compid;
            courer.div_code =  req.session.divid;
            courer.usrnm =  req.session.user;
            courer.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving city','errors':err});
                    return;
                }
                else
                {
                    // res.json({ 'success': true, 'message': 'Order added succesfully' });
                    res.redirect('/courier_inword/courier_inword');
                }
            });
        }
    });
       router.get('/:id', ensureAuthenticated, function(req, res){
        courier_inword.findById(req.params.id, function(err, courier_inword){
        if (err) {
            res.json({ 'success': false, 'message': 'error in fetching courier inword details' });
        } else {
            res.json({ 'success': true, 'courier_inword': courier_inword });
        }
        
    });
});
    
        router.post('/edit_courier_inword/:id', function(req, res) {
            // console.log(req,body);
        //    req.checkBody('courier_name','courier Name is required').notEmpty();
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let courer = {}; 
                courer.cou_date = req.body.cou_date;
                courer.party_sno = req.body.party_sno;
                courer.cou_nm = req.body.cou_nm;
                courer.cou_lotno = req.body.cou_lotno;
                courer.cou_product = req.body.cou_product;
                courer.cou_brand = req.body.cou_brand;
                courer.cou_rate = req.body.cou_rate;
                courer.cou_contdition = req.body.cou_contdition;
                courer.cou_rcpt = req.body.cou_rcpt;
                courer.cou_content = req.body.cou_content;
                courer.remarks = req.body.remarks;
                courer.cou_crgs = req.body.cou_crgs;
                courer.co_code =  req.session.compid;
                courer.div_code =  req.session.divid;
                courer.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                courier_inword.update(query ,courer ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving State', 'errors': err });
                        return;
                    } else {
                        // res.json({ 'success': true, 'message': 'Order added succesfully' });
                        res.redirect('/courier_inword/courier_inword');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              courier_inword.findById(req.params.id, function(err, courier_inword){
                courier_inword.remove(query, function(err){
                    if(err){
                      console.log(err);
                    }
                    res.send('Success');
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