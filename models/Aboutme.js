const mongoose = require("mongoose");

const AboutmeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
   
  },
  cloudinaryId: {
    type: String,
    
  },
  about: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  },
  skills: {
    type: String,
    required: true,
  },
//   companyAddress: {
//     type: String,
//     required: true,
//   },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Aboutme", AboutmeSchema);
//model/Post,schema,collection name with model/post gets post and capitalizes it Posts
