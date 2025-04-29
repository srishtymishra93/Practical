const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const User = require("./models/user");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2/courseApp");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;
    next();
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.password !== password) {
            return res.status(400).send("Incorrect password");
        }

        req.session.user = user;

        res.redirect("/courses");
    } catch (err) {
        res.status(500).send("Error logging in");
    }
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.redirect("/login");
    });
});

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const newUser = new User({
            username: username,
            password: password
        });

        await newUser.save();
        res.redirect("/login");
    } catch (err) {
        res.status(500).send("Error registering user");
    }
});

app.use("/", authRoutes);
app.use("/courses", courseRoutes);

app.listen(3000, () => console.log("Server started on http://localhost:3000"));
