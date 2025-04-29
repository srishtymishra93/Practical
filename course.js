const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true,
        immutable: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    courseStartDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Course", courseSchema);
