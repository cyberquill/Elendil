const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const studentSchema = new Schema({
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    nCourses: { type: Number, default: 0 },
});

studentSchema.virtual('courses', {
    ref: 'Enrolled',
    localField: 'uid',
    foreignField: 'uid',
});
// ============================================================================
module.exports = mongoose.model('Student', studentSchema);
