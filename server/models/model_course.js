const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const courseSchema = new Schema({
    price: { type: Number, required: true },
    about: { type: String, required: true },
    logo: { type: String, required: true },
    cover: { type: String, required: true },
    iid: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
});

courseSchema.virtual('students', {
    ref: 'Student',
    localField: '_id',
    foreignField: 'cid'
});

courseSchema.virtual('lectures', {
    ref: 'Lecture',
    localField: '_id',
    foreignField: 'cid'
});

courseSchema.virtual('questions', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'cid'
});
// ============================================================================
module.exports = mongoose.model('Course', courseSchema);
