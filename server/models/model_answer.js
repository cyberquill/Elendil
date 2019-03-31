const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const answerSchema = new Schema({
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    qid: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    text: { type: String, required: true },
    sno: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
});
// ============================================================================
module.exports = mongoose.model('Answer', answerSchema);
