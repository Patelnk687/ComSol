//const cloudinary = require("../middleware/cloudinary");
const Aboutme = require("../models/Aboutme");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const user = await Aboutme.findOne({user:req.user.id});
      res.render("profile.ejs", { posts: posts, user: req.user,aboutme:user });
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
      res.render("post.ejs", { post: post, user: req.user ,comments: comments});
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
     
      //const commentUser= await User.findById(req.user.id)

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        user: req.user.id,
        post: req.params.id,    
        createdBy:req.user.userName,
        createdById:req.user.id ,
        // grabs id from url and creates post
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
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
  deleteComment: async (req, res) => {
    try {
      
      await Comment.deleteOne({_id:req.params.commentid })
      res.redirect("/post/"+req.params.postid);
      console.log(req.params)
    } catch (err) {
      console.log(err);
    }
  },
};
