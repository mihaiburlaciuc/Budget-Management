const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
   name: { type: String, required: true },
   amountToReceive: { type: Number, required: true }
});

module.exports = mongoose.model('Vendor', vendorSchema);