const express = require("express");
const router = express.Router();
//const upload = require("../middleware/multer");
const companysController = require("../controllers/companys");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/", ensureAuth, companysController.getCompany);

router.post("/createCompany", companysController.createCompany);

//router.put("/likeRoom", companysController.likeRoom);

router.delete("/deleteRoom", companysController.deleteCompany);

module.exports = router;
