const express = require('express');
const router = express.Router();
let city_master = require('../models/city_schema');
let district_master = require('../models/district_schema');
let state_master = require('../models/state_schema');
var query;
router.get('/getdistrictbyid', function (req, res) {
    if( req.query.id ) {
        state_master.findById(req.query.id, 'state_name', function(err, state_master){
            res.json({ 'success': true, 'state_name': state_master });
        });
    }
});

// Add Route
router.get('/add_city', ensureAuthenticated, function(req, res){
    district_master.find({}, function (err, district_master){
        state_master.find({}, function (err, state_master) {
            city_master.find({}, function (err,city_master){
            if (err) {
                console.log(err);
            } else {
                res.render('add_city.hbs', {
                    pageTitle:'Edit City',
                    state_master: state_master,
                    district_master: district_master,
                    city_master: city_master
                });
            }
        }).populate('state_name').populate('dis_name');
    });
});
});
router.post('/city_add',function(req, res){
    console.log(req.body);
    // req.checkBody('statename','State Name is required').notEmpty();
    // req.checkBody('city_name','City Name is required').notEmpty();
    // req.checkBody('dis_name','District Name is required').notEmpty();
    let errors = req.validationErrors();
    if(errors)
    {
        console.log(errors);
    }
    else
    {
        let city = new city_master();
        city.state_name = req.body.state_name;
        city.city_name = req.body.city_name;
        city.dis_name = req.body.dis_name;
        city.city_code = req.body.city_code;
        city.city_std_code = req.body.city_std_code;
        city.co_code =  req.session.compid;
        city.div_code =  req.session.divid;
        city.usrnm =  req.session.user;
        city.save(function (err){
            if(err)
            {
                res.json({'success':false,'message':'error in saving city','errors':err});
                return;
            }
            else
            {
                // res.json({ 'success': true, 'message': 'Order added succesfully' });
                res.redirect('/add_city/add_city');
            }
        });
    }
});
router.get('/:id', ensureAuthenticated, function(req, res){
    city_master.findById(req.params.id, function(err, city_master){
        if (err) {
            res.json({ 'success': false, 'message': 'error in fetching brnad details' });
        } else {
            res.json({ 'success': true, 'city_master': city_master });
        }
        
    });
});

router.get('/all_city', ensureAuthenticated ,function(req,res){
 city_master.find({}, function (err,city_master){
     if(err)
     {
         console.log(err);
     }
     else
     {
         res.render('all_city.hbs',{
             pageTitle:'All City',
             city_master:city_master
         });
     }
 });   
});
router.post('/edit_city/:id',function(req, res){
    console.log(req.body);
    // req.checkBody('statename','State Name is required').notEmpty();
    // req.checkBody('city_name','City Name is required').notEmpty();
    // req.checkBody('dis_name','District Name is required').notEmpty();
    let errors = req.validationErrors();
    if(errors)
    {
        console.log(errors);
    }
    else
    {
        let city = {};
        city.state_name = req.body.state_name;
        city.city_name = req.body.city_name;
        city.dis_name = req.body.dis_name;
        city.city_code = req.body.city_code;
        city.city_std_code = req.body.city_std_code;
        city.co_code =  req.session.compid;
        city.div_code =  req.session.divid;
        city.usrnm =  req.session.user;
         let query = {_id:req.params.id}
            city_master.update(query, city, function(err){
            if(err){
                res.json({ 'success': false, 'message': 'Error in Updating City', errors: err });
            } else {
                res.redirect('/add_city/add_city');
            }
        });
    }
});
router.delete('/:id', function(req, res){
    if(!req.user._id){
        res.status(500).send();
      }
      let query = {_id:req.params.id}
      city_master.findById(req.params.id, function(err, city_master){
        city_master.remove(query, function(err){
            if(err){
              console.log(err);
            }
            res.send('Success');
          });
      });
  });
router.get('/getdisid', function (req, res) {
    console.log(req.query.id );
    if( req.query.id ) {
        city_master.findById(req.query._id, '_id', function(err, city_master){
            res.json({ 'success': true, 'product': city_master });
        });
    }
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