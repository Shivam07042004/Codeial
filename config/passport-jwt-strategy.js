const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codieal'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    

    User.findById(jwtPayLoad._id)
    .then((user) => {
        if(user){
            return done(null,user);
        }
        else  {
            return done(null,false);
        }
    })
    .catch((error) => {
        console.log('error in the finding the user from jwt ',error);
        return;
    })
}))

module.exports = passport;