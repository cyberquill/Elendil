const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const lectureSchema = new Schema({
    cid: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    name: { type: String, required: true },
    linkID: { type: String, required: true },
    description: { type: String, required: true },
    resources: [String],
    sno: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
});
// ============================================================================
module.exports = mongoose.model('Lecture', lectureSchema);
