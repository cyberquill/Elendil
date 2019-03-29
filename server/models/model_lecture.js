const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const lectureSchema = new Schema({
    sno: { type: Number, required: true },
    link: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
    resources: [String],
    cid: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
});
// ============================================================================
module.exports = mongoose.model('Lecture', lectureSchema);
