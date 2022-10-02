const cloudinary = require("../middleware/cloudinary");
const Aboutme = require("../models/Aboutme");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
module.exports = {
  // getCompany: async (req, res) => {
  //   try {
  //       const posts = await Company.find({ user: req.user.id });
  //       res.render("company.ejs", { posts: posts, user: req.user });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  getAboutme: async (req, res) => {
    try {
        const aboutmes = await Aboutme.find().sort({ createdAt: "desc" });
        res.render("aboutme.ejs", { aboutmes });
      } catch (err) {
        console.log(err);
      }
    },



    // getRooms: async (req, res) => {
    //   try {
    //     const rooms = await Room.find().sort({ createdAt: "desc" });
    //     res.render("room.ejs", { rooms });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  // getFeed: async (req, res) => {
  //   try {
  //     const posts = await Post.find().sort({ createdAt: "desc" }).lean();
  //     res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getPost: async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     res.render("post.ejs", { post: post, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  createAboutme: async (req, res) => {
    try {
      // Upload image to cloudinary

      if(req?.file?.path){
        const result = await cloudinary.uploader.upload(req.file.path);
        await Aboutme.create({
          name: req.body.name,
          about: req.body.about,
          contact: req.body.contact,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          skills: req.body.skills,
          user: req.user.id,
        });
      }
else{
  await Aboutme.create({
    name: req.body.name,
    about: req.body.about,
    skills: req.body.skills,
    user: req.user.id,
  });
}
      
      console.log("About me has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  deleteAboutme: async (req, res) => {
    try {
      // Find post by id
      let post = await Aboutme.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Aboutme.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};

