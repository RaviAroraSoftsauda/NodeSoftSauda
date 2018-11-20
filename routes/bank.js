const express = require('express');
const router = express.Router(); 
let bank = require('../models/bank_schema');
var query;

// Add Route
router.get('/bank', ensureAuthenticated, function(req, res){
    bank.find({}, function (err, bank){
            if (err) {
                console.log(err);
            } else {
                res.render('bank.hbs', {
                    pageTitle:'Add bank',
                    bank: bank,
                });
            }
        })
    });
    router.post('/bank_add',function(req, res){
        // console.log(req.body);
        req.checkBody('bank_name','proprietor Name is required').notEmpty();
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let bnk = new bank();
            bnk.bank_name = req.body.bank_name;
            bnk.co_code =  req.session.compid;
            bnk.div_code =  req.session.divid;
            bnk.usrnm =  req.session.user;
            bnk.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving city','errors':err});
                    return;
                }
                else
                {
                    // res.json({ 'success': true, 'message': 'Order added succesfully' });
                    res.redirect('/bank/bank');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        bank.findById(req.params.id, function(err, bank){
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching bank details' });
            } else {
                res.json({ 'success': true, 'bank': bank });
            }
            
        });
    });
        router.post('/edit_bank/:id', function(req, res) {
            // console.log(req,body);
           req.checkBody('bank_name','bank Name is required').notEmpty();
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let bnk = {}; 
                bnk.bank_name = req.body.bank_name;
                bnk.co_code =  req.session.compid;
                bnk.div_code =  req.session.divid;
                bnk.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                bank.update(query ,bnk ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving State', 'errors': err });
                        return;
                    } else {
                        // res.json({ 'success': true, 'message': 'Order added succesfully' });
                        res.redirect('/bank/bank');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              bank.findById(req.params.id, function(err, bank){
                bank.remove(query, function(err){
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