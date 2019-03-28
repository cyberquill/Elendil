const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const lectureSchema = new Schema({
    link: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
    resources: [String],
});
// ============================================================================
module.exports = mongoose.model('Lecture', lectureSchema);
