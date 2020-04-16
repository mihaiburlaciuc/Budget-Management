const mongoose = require("mongoose");

const conflictSchema = new mongoose.Schema({
    srcEntity: { type: String, required: true },
    dstEntity: { type: String, required: true },
    srcType: { type: String, required: true },
    dstType: { type: String, required: true },
    srcOwedAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Conflict', conflictSchema);