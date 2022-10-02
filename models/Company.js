const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
   
  // },
  // cloudinaryId: {
  //   type: String,
    
  //},
  phoneNumber: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
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

module.exports = mongoose.model("Company", CompanySchema);
//model/Post,schema,collection name with model/post gets post and capitalizes it Posts
