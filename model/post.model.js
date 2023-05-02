const mongoose = require("mongoose")
// const { UserModel } = require("./user.model")

const postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: Date
    }]
})

const PostModel = mongoose.model("post", postSchema)

module.exports = {PostModel}