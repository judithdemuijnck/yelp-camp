const express = require("express");
const router = express.Router();
const handleAsyncErrors = require("../utils/handleAsyncErrors");
const passport = require("passport");
const { isLoggedIn, checkReturnTo } = require("../middleware");
const users = require("../controllers/users");

router.route("/register")
    .get(users.renderRegisterForm)
    .post(handleAsyncErrors(users.register))

router.route("/login")
    .get(users.renderLoginForm)
    .post(checkReturnTo,
        passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
        users.login)

router.get("/logout", isLoggedIn, users.logout)

module.exports = router;