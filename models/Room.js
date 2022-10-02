const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  image: {
    type: String,
   
  },
  cloudinaryId: {
    type: String,
    
  },
  roomType: {
    type: String,
    required: true,
  },
  roomRate: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
//model/Post,schema,collection name with model/post gets post and capitalizes it Posts
