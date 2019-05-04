const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ============================================================================
const enrollSchema = new Schema({
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cid: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
});
// ============================================================================
module.exports = mongoose.model('Enroll', enrollSchema);
