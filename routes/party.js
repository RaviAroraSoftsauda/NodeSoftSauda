const express = require('express');
const router = express.Router(); 
let party = require('../models/party_schema');
let proprietor = require('../models/proprietor_schema');
let group = require('../models/group_schema');
let city = require('../models/city_schema');
let state = require('../models/state_schema');
let bank = require('../models/bank_schema');
var query;
router.get('/getcitybyid', function (req, res) {
    if( req.query.id ) {
        city.findById(req.query.id, 'state_name', function(err, city){
            res.json({ 'success': true, 'state_name': city });
        }).populate('state_name');
    }
});

// Add Route
router.get('/party_add', ensureAuthenticated, function(req, res){
    proprietor.find({}, function (err, proprietor){
        group.find({}, function (err, group){
            city.find({}, function (err, city){
                state.find({}, function (err, state){
                    bank.find({}, function (err, bank){
            if (err) {
                console.log(err);
            } else {
                res.render('party.hbs', {
                    pageTitle:'Add party',
                    proprietor: proprietor,
                    group: group,
                    city: city,
                    state: state,
                    bank: bank,
                });
            }
        });
    });
});
});
});
});
    router.post('/party_add',function(req, res){
        console.log(req.body);
        req.checkBody('party_name','Party Name is required').notEmpty();
        // req.checkBody('city_name','City Name is required').notEmpty();
        let party_bank = req.body.party_bank;
        let contact_group = req.body.contact_group;
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let prty = new party();
            prty.p_type = req.body.p_type;
            prty.party_name = req.body.party_name;
            prty.address1 = req.body.address1;
            prty.address2 = req.body.address2;
            prty.area_name = req.body.area_name;
            prty.city_name = req.body.city_name;
            prty.state_name = req.body.state_name;
            prty.pin_code = req.body.pin_code;
            prty.credit_limit = req.body.credit_limit;
            prty.pan_no = req.body.pan_no;
            prty.gstin = req.body.gstin;
            prty.phone_ofc = req.body.phone_ofc;
            prty.phone_resi = req.body.phone_resi;
            prty.fssai = req.body.fssai;
            prty.fax = req.body.fax;
            prty.mob_num = req.body.mob_num;
            prty.mob_no = req.body.mob_no;
            prty.proprietor_name = req.body.proprietor_name;
            prty.group_name = req.body.group_name;
            prty.category = req.body.category;
            prty.remark = req.body.remark;
            prty.working = req.body.working;
            prty.envelope = req.body.envelope;
            prty.party_bank = party_bank;
            prty.contact_group = contact_group;
            prty.co_code =  req.session.compid;
            prty.div_code =  req.session.divid;
            prty.usrnm =  req.session.user;
            prty.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving party','errors':err});
                    return;
                }
                else
                {
                    // res.json({ 'success': true, 'message': 'Order added succesfully' });
                    res.redirect('/party/party_list');
                }
            });
        }
    });
    router.get('/party_list', ensureAuthenticated ,function(req,res){
        party.find({}, function (err,party){
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.render('party_list.hbs',{
                    pageTitle:'party List',
                    party:party
                });
            }
        }).populate('state_name').populate('city_name');   
       });
       router.get('/party_list_update/:id', ensureAuthenticated, function(req, res){
        // var p_type = req.body.p_type;
        party.findById(req.params.id, function(err, party){
            proprietor.find({}, function (err, proprietor){
                group.find({}, function (err, group){
                    city.find({}, function (err, city){
                        state.find({}, function (err, state){
                            bank.find({}, function (err, bank){
                if (err) {
                    console.log(err);
                } else {
                    res.render('party_list_update.hbs', {
                        pageTitle:'Update Party',
                        party: party,
                        proprietor: proprietor,
                        group: group,
                        city: city,
                        state: state,
                        bank: bank//,
                        // p_type: p_type 
                    });
                }
            }).sort({state_name: 'asc'});
         });
      });
    });
  });
 });
});
        router.post('/party_update_submit/:id', function(req, res) {
            // console.log(req,body);
            // req.checkBody('party_name','Party Name is required').notEmpty();
            // req.checkBody('city_name','City Name is required').notEmpty();
            let party_bank = req.body.party_bank;
            let contact_group = req.body.contact_group;
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let prty = {}; 
                prty.p_type = req.body.p_type;
                prty.party_name = req.body.party_name;
                prty.address1 = req.body.address1;
                prty.address2 = req.body.address2;
                prty.area_name = req.body.area_name;
                prty.city_name = req.body.city_name;
                prty.state_name = req.body.state_name;
                prty.pin_code = req.body.pin_code;
                prty.credit_limit = req.body.credit_limit;
                prty.pan_no = req.body.pan_no;
                prty.gstin = req.body.gstin;
                prty.phone_ofc = req.body.phone_ofc;
                prty.phone_resi = req.body.phone_resi;
                prty.fssai = req.body.fssai;
                prty.fax = req.body.fax;
                prty.mob_no = req.body.mob_no;
                prty.proprietor_name = req.body.proprietor_name;
                prty.group_name = req.body.group_name;
                prty.category = req.body.category;
                prty.remark = req.body.remark;
                prty.working = req.body.working;
                prty.envelope = req.body.envelope;
                prty.party_bank = party_bank;
                prty.contact_group = contact_group;
                prty.co_code =  req.session.compid;
                prty.div_code =  req.session.divid;
                prty.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                party.update(query ,prty ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving State', 'errors': err });
                        return;
                    } else {
                        // res.json({ 'success': true, 'message': 'Order added succesfully' });
                        res.redirect('/party/party_list');
                    }
                });
            }
        });
        router.get('/delete_party/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            party.findById(req.params.id, function(err, party){
                party.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    // res.send('Success');
                    res.redirect('/party/party_list');
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