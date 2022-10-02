const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const aboutmesController = require("../controllers/aboutmes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/", ensureAuth, aboutmesController.getAboutme);

router.post("/createAboutme",upload.single("file"), aboutmesController.createAboutme);

//router.put("/likeRoom", companysController.likeRoom);

router.delete("/deleteAboutme", aboutmesController.deleteAboutme);

module.exports = router;
