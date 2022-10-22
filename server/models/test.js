import mongoose from "mongoose";

const Test = new mongoose.Schema({
  status: {type: Boolean, required: true},
  questions: [{type: Object, required: true}]
})

export default mongoose.model('Test',Test)