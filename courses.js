const express = require("express");
const Course = require("../models/course");
const router = express.Router();

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

router.get("/", isLoggedIn, async (req, res) => {
    const courses = await Course.find({});
    res.render("courses/index", { courses, user: req.user });
});

router.get("/new", isLoggedIn, (req, res) => {
    res.render("courses/new");
});

router.post("/new", isLoggedIn, async (req, res) => {
    const { courseName, price, image, duration, courseStartDate } = req.body;
    await Course.create({ courseName, price, image, duration, courseStartDate });
    res.redirect("/courses");
});

router.get("/:id", isLoggedIn, async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render("courses/show", { course });
});

router.get("/:id/edit", isLoggedIn, async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render("courses/edit", { course });
});

router.post("/:id/edit", isLoggedIn, async (req, res) => {
    const { price, image, duration, courseStartDate } = req.body;
    await Course.findByIdAndUpdate(req.params.id, {
        price, image, duration, courseStartDate
    });
    res.redirect(`/courses/${req.params.id}`);
});

router.post("/:id/delete", isLoggedIn, async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect("/courses");
});

module.exports = router;
