const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const hbs = require('hbs');
const moment = require('moment');
const div_com = require('./models/company_schema');
let userright = require('./models/user_right_schema');

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://ravisoftsolution:ravi123@ds243212.mlab.com:43212/suda');
let db = mongoose.connection;
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function (err) {
    console.log(err);
});

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use('*/css', express.static('public/css'));
app.use('*/js', express.static('public/js'));
app.use('*/images', express.static('public/images'));
app.use('*/fonts', express.static('public/fonts'));
app.use('*/uploads', express.static('public/uploads'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('equal', function (lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if (lvalue != rvalue) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});
hbs.registerHelper('dateformat', function (datetime, format) {
    return moment(datetime).tz("Asia/Kolkata").format(format);
});
hbs.registerHelper('maxno', function (context) {
   var maxsno = parseInt(context[0].vouc_code)+1;
   return maxsno;
});
hbs.registerHelper("contains", function( value, strval ){
    var xx ="Y";
    if (strval.search(value) > -1) xx = "checked";
    else xx = "Y";
    return xx;
});
hbs.registerHelper('chkchecked', function(vlu,cvlu) {

    // console.log(vlu);
    var ret = "";
    if (vlu == cvlu) ret = "checked";
    else ret = "";
    return ret;
});
hbs.registerHelper("compare", function( value, strval ){
    // fallback...
    // array = ( array instanceof Array ) ? array : [array];
    // console.log(value);
    var xx ="Y";
    if (value == strval) xx = "selected";
    else xx = "";
    return xx;
});

hbs.registerHelper('notequal', function (lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if (lvalue == rvalue) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

hbs.registerHelper('subtract', function (lvalue, rvalue, options) {
    if (arguments.length < 3) {
        throw new Error("Handlebars Helper equal needs 2 parameters");
    }
    var newvalue = lvalue - rvalue;
    return newvalue;
});

hbs.registerHelper('sum', function (lvalue, rvalue, options) {
    if (arguments.length < 3) {
        throw new Error("Handlebars Helper equal needs 2 parameters");
    }
    var newvalue = lvalue + rvalue;
    return newvalue;
});
hbs.registerHelper('listbsrt', function(context, BSRT, rvalue,listid, options ) {
    var ret = "<select class='form-control add_btn' name='"+rvalue+"' id='"+listid+"'><option>Select</option>";
    for(var i=0, j=context.length; i<j; i++) {
        
            if ((context[i].p_type).search(BSRT)>=0) 
            {
                ret = ret + "<option value='"+context[i]._id+"' data-party_id='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
            }
    }
    return ret + "</select>";
    
});
hbs.registerHelper('list', function(context , BSRT, lvalue, rvalue, options) {
    
    var ret = "<select class='form-control' name='"+rvalue+"' id='offerproductname'><option>Select</option>";
    for(var i=0, j=context.length; i<j; i++) {
        if ((context[i]._id).toString().trim() == lvalue.toString().trim()) {
            ret = ret + "<option value='"+context[i]._id+"' selected='' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
        } else {
            if ((context[i].p_type).search(BSRT)>=0) 
            {
            ret = ret + "<option value='"+context[i]._id+"' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
            }
        }
    }
    return ret + "</select>";
});
hbs.registerHelper('listrt', function(context , lvalue, rvalue, options) {
    var ret = "<select class='form-control' name='"+rvalue+"' id='offerproductname'><option>Select</option>";
    for(var i=0, j=context.length; i<j; i++) {
        if ((context[i]._id).toString().trim() == lvalue.toString().trim()) {
            ret = ret + "<option value='"+context[i]._id+"' selected='' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
        } else {
            ret = ret + "<option value='"+context[i]._id+"' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
          
        }
    }
    return ret + "</select>";
});
hbs.registerHelper('dateformat', function (datetime, format) {
    return moment(datetime).format(format);
});
app.use(session({
    key: 'user_sid',
    secret: 'keyboard sesskey',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');        
//     }
//     next();
// });


// // middleware function to check for logged-in users
// var sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/dashboard');
//     } else {
//         next();
//     }    
// };


// // route for Home-Page
// app.get('/', sessionChecker, (req, res) => {
//     res.redirect('/login');
// });



app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

// var sess;
// app.get('/',function(req,res) {
//     sess=req.session;
//     sess.usernm;
//     sess.sdate ;
// });

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/userright/login');
    }
}
// Home Route
app.get('/', loggedIn, function (req, res,err) {
    userright.findOne({usrnm: req.session.user}, function(err,userright){
    req.session.co_code =userright['co_code'];
    req.session.div_code =userright['div_code'];
    div_com.find({},function (err, div_com){
        if (err) {
            console.log(err);
        } else {           
            
            res.render('company.hbs', {
                div_com: div_com,
                pageTitle: 'Company Selection',
            }); 
        }
    }); 
}); 
});
// Route Files
// let users = require('./routes/users');
let state_master = require('./routes/state_master');
let add_city = require('./routes/add_city');
let add_district = require('./routes/add_district');
let product = require('./routes/product');
let expense = require('./routes/expense');
let proprietor = require('./routes/proprietor');
let group = require('./routes/group');
let bank = require('./routes/bank');
let brand = require('./routes/brand');
let courier = require('./routes/courier');
let transport = require('./routes/transport');
let term = require('./routes/term');
let narration = require('./routes/narration');
let party = require('./routes/party');
let courier_inword = require('./routes/courier_inword');
let courier_outword = require('./routes/courier_outword');
let daily_rates = require('./routes/daily_rates');
let product_mast = require('./routes/product_mast');
let contract_sauda = require('./routes/contract_sauda');
let delivery_entry = require('./routes/delivery_entry');
let direct_delivery_entry = require('./routes/direct_delivery_entry');
let users = require('./routes/userright');
let security_right = require('./routes/security_right');
let sauda_register = require('./routes/sauda_register');
let delivery_register = require('./routes/delivery_register');


// app.use('/users', users);
app.use('/state_master', state_master);
app.use('/add_city', add_city);
app.use('/add_district', add_district);
app.use('/product', product);
app.use('/expense', expense);
app.use('/proprietor', proprietor);
app.use('/group', group);
app.use('/bank', bank);
app.use('/brand', brand);
app.use('/courier', courier);
app.use('/transport', transport);
app.use('/term', term);
app.use('/narration', narration);
app.use('/party', party);
app.use('/courier_inword', courier_inword);
app.use('/courier_outword', courier_outword);
app.use('/daily_rates', daily_rates);
app.use('/product_mast', product_mast);
app.use('/contract_sauda', contract_sauda);
app.use('/delivery_entry', delivery_entry);
app.use('/direct_delivery_entry', direct_delivery_entry);
app.use('/userright', users);
app.use('/security_right', security_right);
app.use('/sauda_register', sauda_register);
app.use('/delivery_register', delivery_register);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


