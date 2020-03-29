const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   username: String,
   password: String 
})

// module.exports = User
module.exports = mongoose.model('User', userSchema);