const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const questionSchema = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    uid: { type: Schema.Types.ObjectId, ref: User, required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: Answer }],
});
// ============================================================================
module.exports = mongoose.model('Question', questionSchema);
