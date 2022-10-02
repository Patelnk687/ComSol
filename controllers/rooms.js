const cloudinary = require("../middleware/cloudinary");
const Company = require("../models/Company");
const Post = require("../models/Post");
const Room = require("../models/Room");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Room.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getRooms: async (req, res) => {
    try {
      const rooms = await Room.find().sort({ createdAt: "desc" });
      res.render("room.ejs", { rooms });
    } catch (err) {
      console.log(err);
    }
  },
  getRoom: async (req, res) => {
    try {
      const post = await Room.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createRoom: async (req, res) => {
    try {
      // Upload image to cloudinary 
      //if(req.file){
        //router.post("/createPost", postsController.createPost);
        //const result = await cloudinary.uploader.upload(req.file.path);
      //}
    console.log(req.body);

      await Room.create({
        roomNumber: req.body.roomNumber,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        roomType: req.body.roomType,
        roomRate: req.body.roomRate,
        user: req.user.id,
      });
      console.log("Room has been added!");
      res.redirect("/room");
    } catch (err) {
      console.log(err);
    }
  },
  likeRoom: async (req, res) => {
    try {
      await Room.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteRoom: async (req, res) => {
    try {
      // Find post by id
      let post = await Room.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Room.remove({ _id: req.params.id });
      console.log("Deleted Room");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
