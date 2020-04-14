const mongoose = require("mongoose");

// TODO:
const transactionSchema = new mongoose.Schema({
});

// module.exports = User
module.exports = mongoose.model('Transaction', transactionSchema);