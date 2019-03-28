const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const instructorSchema = new Schema({
    courses: [{ type: Schema.Types.ObjectId, ref: Course, required: true }],
    bio: { type: String, required: true },
    twitter: String,
    fb: String,
    insta: String,
    git: String,
    others: [String]
});
// ============================================================================
module.exports = mongoose.model('Instructor', instructorSchema);
