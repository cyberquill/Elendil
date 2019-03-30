const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const questionSchema = new Schema({
    sno: { type: Number, default: 0 },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cid: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    nAnswers: { type: Number, default: 0 },
});

questionSchema.virtual('answers', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'qid',
});
// ============================================================================
module.exports = mongoose.model('Question', questionSchema);
