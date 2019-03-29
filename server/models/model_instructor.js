const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const instructorSchema = new Schema({
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String, required: true },
    twitter: String,
    fb: String,
    insta: String,
    git: String,
    others: [String],
});

instructorSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'iid'
});
// ============================================================================
module.exports = mongoose.model('Instructor', instructorSchema);
