const express = require("express");
const router = express.Router({ mergeParams: true });
const handleAsyncErrors = require("../utils/handleAsyncErrors");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");
const reviews = require("../controllers/reviews");

router.post("/",
    isLoggedIn,
    validateReview,
    handleAsyncErrors(reviews.createReview))

router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    handleAsyncErrors(reviews.deleteReview))

module.exports = router;