import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js';

const User = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, validate: [ isEmail, 'invalid email' ], unique: true, required: true},
  password: {type: String, required: true},
  roles: [{type: String, ref: 'Role'}],
  testsData: [{type: Object}]
})

export default mongoose.model('User',User)