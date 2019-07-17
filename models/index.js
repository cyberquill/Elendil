
const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');
mongoose.connect(mongoURI,{ useNewUrlParser: true })
    .then(() => console.log('--------------- Database Online ---------------'))
    .catch(err => console.log(err));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// When the connection is disconnected:
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection: 
process.on('SIGINT', function () {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
}); 
// ============================================================================

module.exports.User = require('./model_user');
module.exports.Course = require('./model_course');
module.exports.Lecture = require('./model_lecture');
module.exports.Enroll = require('./model_enroll');
module.exports.Instructor = require('./model_instructor');
module.exports.Question = require('./model_question');
module.exports.Answer = require('./model_answer');
module.exports.Student = require('./model_student');
