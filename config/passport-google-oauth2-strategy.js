const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

passport.use(new googleStrategy({
    clientID : "789438205664-mtiblj083h8uc6keq6qkqqqsl0f8srv9.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8000/users/auth/google/callback"
},async function (accessToken, refreshToken, profile, done) {
    try {
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            return done(null, user);
        } else {
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });

            return done(null, newUser);
        }
    } catch (error) {
        console.log('error in the google passport strategy', error);
        return done(error, null);
    }
}))

module.exports = passport;