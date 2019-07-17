
const 
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    mongoose = require('mongoose'),
    { User } = require('../models'),
    { secretOrKey } = require('./keys');

let opts= {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await User.findById(jwt_payload.id);
        if(!user)
            return done(null, false);

        return done(null, user);
    }));
};