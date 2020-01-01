const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema({
    image: String,
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    producer: {
        type: String,
        required: true,
        maxlength: 50
    },
    genre: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    }
})

const Media = mongoose.model("Media", mediaSchema);

module.exports = { Media };