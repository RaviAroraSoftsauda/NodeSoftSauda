const express = require('express');
const router = express.Router(); 
let product_mast = require('../models/product_mast_schema');
let product = require('../models/product_schema');
var query;

// Add Route
router.get('/product_mast', ensureAuthenticated, function(req, res){
    product.find({}, function (err, product){
        product_mast.find({}, function (err, product_mast){
            if (err) {
                console.log(err);
            } else {
                res.render('product_mast.hbs', {
                    pageTitle:'Add product',
                    product_mast: product_mast,
                    product: product,
                });
            }
        });
    });
});
    router.post('/product_mast_add',function(req, res){
        console.log(req.body);
        req.checkBody('product_name','product name is required').notEmpty();
        let product_mast_group = req.body.product_mast_group;
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let prdt = new product_mast();
            prdt.p_code = req.body.p_code;
            prdt.product_name = req.body.product_name;
            prdt.short_name = req.body.short_name;
            prdt.hsn_code = req.body.hsn_code;
            prdt.item_name = req.body.item_name;
            prdt.item_unit = req.body.item_unit;
            prdt.timestamp = new Date();
            prdt.product_mast_group = product_mast_group;
            prdt.co_code =  req.session.compid;
            prdt.div_code =  req.session.divid;
            prdt.usrnm =  req.session.user;
            prdt.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving party','errors':err});
                    return;
                }
                else
                {
                    // res.json({ 'success': true, 'message': 'Order added succesfully' });
                    res.redirect('/product_mast/product_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        product_mast.findById(req.params.id, function(err, product_mast){
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching product_mast details' });
            } else {
                res.json({ 'success': true, 'product_mast': product_mast });
            }
            
        });
    });
//     router.get('/party_list', ensureAuthenticated ,function(req,res){
//         party.find({}, function (err,party){
//             if(err)
//             {
//                 console.log(err);
//             }
//             else
//             {
//                 res.render('party_list.hbs',{
//                     pageTitle:'party List',
//                     party:party
//                 });
//             }
//         });   
//        });
//        router.get('/edit_product_mast/:id', ensureAuthenticated, function(req, res){
//         party.findById(req.params.id, function(err, party){
//             proprietor.find({}, function (err, proprietor){
//                 group.find({}, function (err, group){
//                     city.find({}, function (err, city){
//                         state.find({}, function (err, state){
//                             bank.find({}, function (err, bank){
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     res.render('party_list_update.hbs', {
//                         pageTitle:'Update Party',
//                         party: party,
//                         proprietor: proprietor,
//                         group: group,
//                         city: city,
//                         state: state,
//                         bank: bank,
//                     });
//                 }
//             }).sort({state_name: 'asc'});
//          });
//       });
//     });
//   });
//  });
// });
        router.post('/edit_product_mast/:id', function(req, res) {
            // console.log(req,body);
            req.checkBody('product_name','product name is required').notEmpty();
            let errors = req.validationErrors();
            let product_mast_group = req.body.product_mast_group;
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let prdt = {};
                prdt.p_code = req.body.p_code;
                prdt.product_name = req.body.product_name;
                prdt.short_name = req.body.short_name;
                prdt.hsn_code = req.body.hsn_code;
                prdt.item_name = req.body.item_name;
                prdt.item_unit = req.body.item_unit;
                prdt.product_mast_group = product_mast_group;
                prdt.co_code =  req.session.compid;
                prdt.div_code =  req.session.divid;
                prdt.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                product_mast.update(query ,prdt ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving State', 'errors': err });
                        return;
                    } else {
                        // res.json({ 'success': true, 'message': 'Order added succesfully' });
                        res.redirect('/product_mast/product_mast');
                    }
                });
            }
        });
router.delete('/:id', function(req, res){
    if(!req.user._id){
        res.status(500).send();
      }
      let query = {_id:req.params.id}
      product_mast.findById(req.params.id, function(err, product_mast){
        product_mast.remove(query, function(err){
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