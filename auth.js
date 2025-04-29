const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/register", (req, res) => {
    res.render("auth/register");
});

router.post("/register", async (req, res) => {
    const { username, password, gender, number } = req.body;
    const user = new User({ username, gender, number });
    await User.register(user, password);
    res.redirect("/login");
});

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login"
}), (req, res) => {
    res.redirect("/courses");
});

router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/login");
    });
});

module.exports = router;
