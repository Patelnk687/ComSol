const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  rate: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  aboutme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aboutme",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy:{
    type: String,
    ref:"User"
    },
});

module.exports = mongoose.model("Post", PostSchema);
//model/Post,schema,collection name with model/post gets post and capitalizes it Posts
