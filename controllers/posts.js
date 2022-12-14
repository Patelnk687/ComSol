const cloudinary = require("../middleware/cloudinary");
const Aboutme = require("../models/Aboutme");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const userz = await Aboutme.findOne({user:req.user.id});
      const users = await User.find({post: req.params.id});
      console.log(userz)
      res.render("profile.ejs", { posts: posts, user: req.user, aboutme: userz , users: users});
      
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "asc" }).lean(); 
      const users = await User.find({post: req.params.id});     
      const userz = await Aboutme.findOne({user:req.user.id});
      res.render("post.ejs", { post: post, user: req.user ,aboutme: userz , comments: comments, users: users});
     
    } catch (err) {
      console.log(err);
    }
  },

  searchPost : async(req,res)=>{
    try {
      const post = await Post.find({
        area:{$regex:req.body.keyword,$options:"i"}
      });
      console.log(post);
      res.render("feed.ejs", { posts: post,});
     
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);
      if(req?.file?.path){
        const result = await cloudinary.uploader.upload(req.file.path);
        await Post.create({
        title: req.body.title,
        caption: req.body.caption,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        rate: req.body.rate,
        contact: req.body.contact,
        skill: req.body.skill,
        area: req.body.area,
        likes: 0,
        user: req.user.id,
        createdBy: req.user.email
      });
    }
    else{
      await Post.create({
        title: req.body.title,
        caption: req.body.caption,
        rate: req.body.rate,
        contact: req.body.contact,
        skill: req.body.skill,
        area: req.body.area,
        likes: 0,
        user: req.user.id,
      });
    }
    
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
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
  deletePost: async (req, res) => {
    try {
      // Find post by id
     
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
       await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
     }
    
    catch (err) {
      let post = await Post.findById({ _id: req.params.id });
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
      }
    
  },
};
