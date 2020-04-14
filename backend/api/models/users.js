const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   username: { type: String, required: true },
   password: { type: String, required: true },
   balance: { type: Number, required: true }
});

// module.exports = User
module.exports = mongoose.model('User', userSchema);