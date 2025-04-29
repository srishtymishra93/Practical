const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    coursesEnrolled: [
        {
            courseName: String
        }
    ],
    username: String,
    password: String
});

module.exports = mongoose.model("User", userSchema);
