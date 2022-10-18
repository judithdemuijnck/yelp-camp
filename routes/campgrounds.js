const express = require("express");
const router = express.Router();
const handleAsyncErrors = require("../utils/handleAsyncErrors");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.route("/")
    .get(handleAsyncErrors(campgrounds.index))
    .post(isLoggedIn, upload.array("image"), validateCampground, handleAsyncErrors(campgrounds.createCampground))


router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    .get(handleAsyncErrors(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, handleAsyncErrors(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, handleAsyncErrors(campgrounds.deleteCampground))

router.get("/:id/edit", isLoggedIn, isAuthor, handleAsyncErrors(campgrounds.renderEditForm))

module.exports = router;