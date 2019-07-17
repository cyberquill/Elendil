require('dotenv').config();

module.exports = {
    mongoURI: process.env.URI,
    secretOrKey: process.env.KEY,
};
