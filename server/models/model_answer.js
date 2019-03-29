const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const answerSchema = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    qid: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
});
// ============================================================================
module.exports = mongoose.model('Answer', answerSchema);
