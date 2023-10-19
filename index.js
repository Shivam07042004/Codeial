const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for the session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');

const sassMiddleware = require('sass-middleware');
app.use(express.json());
// connect flash
const flash = require('connect-flash');
const customMware = require('./config/middleware');


console.log('before sassmiddleware configuration');

app.use(
    sassMiddleware({
        src:'./assets/scss',
        dest:'./assets/css',
        indentedSyntax:false,
        debug:true,
        outputStyle:'expanded',
        prefix:'/css'
}));



console.log('After middleware configuration');

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'/assets')));


console.log('Static files middleware configured');

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'Codieal',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codieal_db2',
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function (err) {
        if (err) {
            console.log(err);
        }
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// use connect flash
app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'));

app.get('/css/layout.css',function(request,response){
    console.log('getting css');
    response.sendFile(path.join(__dirname,'assets','css','layout.css'));
})

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
