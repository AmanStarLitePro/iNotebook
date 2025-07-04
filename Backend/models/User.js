const mongoose = require('mongoose');
const { Schema } = mongoose;

// Defining Schema (Structure) of the UserSchema Database
const UserSchema = new Schema({
  name: {
    type:String,
    required: true
  },
  email: {
    type:String,
    required: true,
    unique: true
  },
  password: {
    type:String,
    required: true
  },
  date: {
    type:Date,
    default: Date.now
  },
});

// Exporting User to make it available everywhere
const User = mongoose.model('user', UserSchema);
module.exports = User;