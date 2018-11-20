const express = require('express');
const router = express.Router(); 
let daily_rates = require('../models/daily_rates_schema');
let product = require('../models/product_schema');
var query;

// Add Route
router.get('/daily_rates', ensureAuthenticated, function(req, res){
    daily_rates.find({}, function (err, daily_rates){
        product.find({}, function (err, product){
            if (err) {
                console.log(err);
            } else {
                res.render('daily_rates.hbs', {
                    pageTitle:'Add daily rates',
                    daily_rates: daily_rates,
                    product: product,
                });
            }
        })
    });
 });
    router.post('/daily_rates_add',function(req, res){
        // console.log(req.body);
        // // req.checkBody('st_name','station  Name is required').notEmpty();
        // req.checkBody('item_name','product Name is required').notEmpty();
        // // req.checkBody('prod_spec','Product Specifications is required').notEmpty();
        // req.checkBody('rate_min','rate minimum is required').notEmpty();
        // req.checkBody('rate_max','rate maximum is required').notEmpty();
        // req.checkBody('rate_condtion','rate condition is required').notEmpty();
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let dailyrates = new daily_rates();
            dailyrates.st_name = req.body.st_name;
            dailyrates.item_name = req.body.item_name;
            dailyrates.prod_spec = req.body.prod_spec;
            dailyrates.rate_min = req.body.rate_min;
            dailyrates.rate_max = req.body.rate_max;
            dailyrates.rate_condtion = req.body.rate_condtion;
            dailyrates.co_code =  req.session.compid;
            dailyrates.div_code =  req.session.divid;
            dailyrates.usrnm =  req.session.user;
            dailyrates.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving daily_rates','errors':err});
                    return;
                }
                else
                {
                    // res.json({ 'success': true, 'message': 'Order added succesfully' });
                    res.redirect('/daily_rates/daily_rates');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        daily_rates.findById(req.params.id, function(err, daily_rates){
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching daily rates details' });
            } else {
                res.json({ 'success': true, 'daily_rates': daily_rates });
            }
            
        });
    });
        router.post('/edit_daily_rates/:id', function(req, res) {
            // req.checkBody('item_name','product Name is required').notEmpty();
            // req.checkBody('rate_min','rate minimum is required').notEmpty();
            // req.checkBody('rate_max','rate maximum is required').notEmpty();
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let dailyrates = {}; 
                    dailyrates.st_name = req.body.st_name;
                    dailyrates.item_name = req.body.item_name;
                    dailyrates.prod_spec = req.body.prod_spec;
                    dailyrates.rate_min = req.body.rate_min;
                    dailyrates.rate_max = req.body.rate_max;
                    dailyrates.rate_condtion = req.body.rate_condtion;
                    dailyrates.co_code =  req.session.compid;
                    dailyrates.div_code =  req.session.divid;
                    dailyrates.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                daily_rates.update(query ,dailyrates ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving daily rates', 'errors': err });
                        return;
                    } else {
                        // res.json({ 'success': true, 'message': 'Order added succesfully' });
                        res.redirect('/daily_rates/daily_rates');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              daily_rates.findById(req.params.id, function(err, daily_rates){
                daily_rates.remove(query, function(err){
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