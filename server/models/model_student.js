const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const studentSchema = new Schema({
    courses: [{
        course_id: { type: Date, required: true },
        progress: {type: Number, default: 0}
    }],
});
// ============================================================================
module.exports = mongoose.model('Student', studentSchema);
