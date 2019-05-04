const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    gender: { type: String, required: true },
    profilePic: { type: String },
});

userSchema.virtual('questions', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'uid',
});

userSchema.virtual('answers', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'uid',
});
// ============================================================================
module.exports = mongoose.model('User', userSchema);
