const cloudinary = require("../middleware/cloudinary");
const Company = require("../models/Company");
const Post = require("../models/Post");
const Room = require("../models/Room");

module.exports = {
  // getCompany: async (req, res) => {
  //   try {
  //       const posts = await Company.find({ user: req.user.id });
  //       res.render("company.ejs", { posts: posts, user: req.user });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  getCompany: async (req, res) => {
    try {
        const companys = await Company.find().sort({ createdAt: "desc" });
        res.render("company.ejs", { companys });
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
  createCompany: async (req, res) => {
    try {
      // Upload image to cloudinary
      //const result = await cloudinary.uploader.upload(req.file.path);

      await Company.create({
        hotelName: req.body.hotelName,
        //image: result.secure_url,
        //cloudinaryId: result.public_id,
        phoneNumber: req.body.phoneNumber,
        companyEmail: req.body.companyEmail,
        companyAddress: req.body.companyAddress,
        user: req.user.id,
      });
      console.log("Company has been added!");
      res.redirect("/company");
    } catch (err) {
      console.log(err.toString());
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
  deleteCompany: async (req, res) => {
    try {
      // Find post by id
      let post = await Company.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Company.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};

