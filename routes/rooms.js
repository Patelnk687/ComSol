const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/rooms");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/", ensureAuth, postsController.getRooms);

router.post("/createRoom",upload.single("file"), postsController.createRoom);
router.put("/likeRoom", postsController.likeRoom);

router.delete("/deleteRoom", postsController.deleteRoom);

module.exports = router;
