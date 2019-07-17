const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const questionSchema = new Schema({
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cid: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    text: { type: String, required: true },
    sno: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    nAnswers: { type: Number, default: 0 },
});

questionSchema.virtual('answers', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'qid',
});
// ============================================================================
module.exports = mongoose.model('Question', questionSchema);
