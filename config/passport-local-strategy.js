const passport = require('passport');
const User = require('../models/user');


const LocalStrategy = require('passport-local').Strategy;

// authenticate using passport.js
passport.use(new LocalStrategy({usernameField:'email'},
    function(email,password,done){
        // find a user and establish identity
        User.findOne({email :email})
            .then(user => {
                if(!user || user.password !== password){
                    console.log('invalid username/password');

                    return done(null,false);
                }
                else  {
                    console.log('user found in the passport.js');
                    return done(null,user);
                }
            })
            .catch(error => {
                console.log('error in the passport in find the user');
                return done(error);
            })

    }
    ))

// serialize the user to decide which key is to kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// deserialize the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(user => {
            console.log('Deserialized user:', user);
            return done(null, user);
        })
        .catch(error => {
            console.log('Error in deserializing user:', error);
            return done(error);
        });
});


// user is authenticated or not 
passport.checkAuthentication = function(request, response, next) {
    if (request.isAuthenticated()) {
        console.log('user is authenticated');
        next();
    } else {
        console.log('user is not authenticated');
        response.redirect('/users/sign-in');
    }
};


// user is authenticated to see data or not 
passport.setAuthenticatedUser = function(request,response,next){
    if(request.isAuthenticated()){
        response.locals.user= request.user;
    }


    next();
}

module.exports = passport;
