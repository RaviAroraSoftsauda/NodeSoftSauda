const express = require('express');
const router = express.Router();
let state_master = require('../models/state_schema');
let div_com = require('../models/company_schema');
let div_mast = require('../models/division_schema');
// Add Route    
router.get('/state_master', ensureAuthenticated, function(req, res){
    state_master.find({}, function (err, state_master) {
        if (err) {
            console.log(err);
        } else {
           res.render('state_master.hbs', {
                pageTitle: 'Add State',
                state_master: state_master              
            });
        }
    });
});


router.post('/state_add', function(req, res) {
    // console.log(req.body);
    req.checkBody('state_name', 'State Name is required').notEmpty();
    req.checkBody('state_code', 'State Code is required').notEmpty();
    req.checkBody('state_capital', 'State Capital is required').notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
    } else {
        let brand = new state_master();    
        brand.state_name = req.body.state_name;
        brand.state_code = req.body.state_code;
        brand.state_capital = req.body.state_capital;
        brand.co_code =  req.session.compid,
        brand.div_code =  req.session.divid,
        brand.usrnm =  req.session.user,
        brand.save(function (err) {
            if (err) {
                res.json({ 'success': false, 'message': 'Error in Saving Order', 'errors': err });
                return;
            } else {
                // res.json({ 'success': true, 'message': 'Order added succesfully' });
                res.redirect('/state_master/state_master');
            }
        });
    }
});
router.get('/:id', ensureAuthenticated, function(req, res){
    state_master.findById(req.params.id, function(err, state_master){
        console.log(state_master);
        if (err) {
            res.json({ 'success': false, 'message': 'error in fetching district details' });
        } else {
            res.json({ 'success': true, 'state_master': state_master });
        }
        
    });
});
router.post('/edit_state/:id', function(req, res) {
    req.checkBody('state_name', 'State Name is required').notEmpty();
    req.checkBody('state_code', 'State Code is required').notEmpty();
    req.checkBody('state_capital', 'State Capital is required').notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
    } else {
        let state = {};
        state.state_name = req.body.state_name;
        state.state_code = req.body.state_code;
        state.state_capital = req.body.state_capital;
        state.co_code =  req.session.compid;
        state.div_code =  req.session.divid;
        state.usrnm =  req.session.user;
        let query = {_id:req.params.id}
        state_master.update(query ,state ,function (err) {
            if (err) {
                res.json({ 'success': false, 'message': 'Error in Saving State', 'errors': err });
                return;
            } else {
                // res.json({ 'success': true, 'message': 'Order added succesfully' });
                res.redirect('/state_master/state_master');
            }
        });
    }
});
router.delete('/:id', function(req, res){
    if(!req.user._id){
        res.status(500).send();
      }
      let query = {_id:req.params.id}
      state_master.findById(req.params.id, function(err, state_master){
        state_master.remove(query, function(err){
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