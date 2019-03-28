const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const courseSchema = new Schema({
    price: { type: Number, required: true },
    about: { type: String, required: true },
    instructors: [{ type: Schema.Types.ObjectId, ref: Instructor, required: true }],
    students: [{ type: Schema.Types.ObjectId, ref: Student, required: true }],
    lectures: [{ type: Schema.Types.ObjectId, ref: Lecture, required: true }],
    questions: [{ type: Schema.Types.ObjectId, ref: Question, required: true }],
});
// ============================================================================
module.exports = mongoose.model('Course', courseSchema);
