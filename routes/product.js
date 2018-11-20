const express = require('express');
const router = express.Router(); 
let product = require('../models/product_schema');
var query;

// Add Route
router.get('/product', ensureAuthenticated, function(req, res){
    product.find({}, function (err,product){
            if (err) {
                console.log(err);
            } else {
                res.render('product.hbs', {
                    pageTitle:'Add Product',
                    product: product,
                });
            }
        }).sort({item_name: 'asc'});
    });
    router.post('/product_add',function(req, res){
        // console.log(req.body);
        req.checkBody('item_name','Item Name is required').notEmpty();
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let prodt = new product();
            prodt.item_name = req.body.item_name;
            prodt.co_code =  req.session.compid;
            prodt.div_code =  req.session.divid;
            prodt.usrnm =  req.session.user;
            prodt.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving city','errors':err});
                    return;
                }
                else
                {
                    // res.json({ 'success': true, 'message': 'Order added succesfully' });
                    res.redirect('/product/product');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        product.findById(req.params.id, function(err, product){
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching brnad details' });
            } else {
                res.json({ 'success': true, 'product': product });
            }
            
        });
    });
        router.post('/edit_product/:id', function(req, res) {
            // console.log(req,body);
            req.checkBody('item_name', 'Item Name is required').notEmpty();
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let prodt = {};
                prodt.item_name = req.body.item_name;
                prodt.co_code =  req.session.compid;
                prodt.div_code =  req.session.divid;
                prodt.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                product.update(query ,prodt ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving State', 'errors': err });
                        return;
                    } else {
                        // res.json({ 'success': true, 'message': 'Order added succesfully' });
                        res.redirect('/product/product');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              product.findById(req.params.id, function(err, product){
                product.remove(query, function(err){
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