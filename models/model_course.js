const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const courseSchema = new Schema({
    iid: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
    price: { type: Number, required: true },
    title: { type: String, required: true },
    about: { type: String, required: true },
    logo: { type: String, required: true },
    cover: { type: String, required: true },
    suggestions: [String],
    date: { type: Date, default: Date.now },
    nStudents: { type: Number, default: 0 },
    nLectures: { type: Number, default: 0 },
    nQuestions: { type: Number, default: 0 },
});

courseSchema.virtual('students', {
    ref: 'Enroll',
    localField: '_id',
    foreignField: 'cid',
});

courseSchema.virtual('lectures', {
    ref: 'Lecture',
    localField: '_id',
    foreignField: 'cid',
});

courseSchema.virtual('questions', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'cid',
});
// ============================================================================
module.exports = mongoose.model('Course', courseSchema);
