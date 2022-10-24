import mongoose from "mongoose";

const Test = new mongoose.Schema({
  id: {type: String, required: true},
  status: {type: Boolean, required: true},
  name: {type: String, required: true},
  questions: [{type: Object, required: true}]
})

export default mongoose.model('Test',Test)