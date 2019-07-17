const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const instructorSchema = new Schema({
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bio: String,
    twitter: String,
    fb: String,
    insta: String,
    git: String,
    others: [String],
    salary: { type: Number, default: 0 },
    nCourses: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
});

instructorSchema.virtual('courses', {
    ref: 'Course',
    localField: 'uid',
    foreignField: 'iid',
});
// ============================================================================
module.exports = mongoose.model('Instructor', instructorSchema);
