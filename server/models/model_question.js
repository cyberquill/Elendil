const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const questionSchema = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cid: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
});

questionSchema.virtual('answers', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'qid',
});
// ============================================================================
module.exports = mongoose.model('Question', questionSchema);
