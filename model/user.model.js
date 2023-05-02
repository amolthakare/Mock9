const mongoose = require("mongoose")
const { PostModel } = require("./post.model")

const userSchema = mongoose.Schema({
    name: {type: String, require:true},
    email: {type: String, require:true, unique: true},
    pass: {type: String, require:true},
    dob: {type: String, require:true},
    bio: {type: String, require:true},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: PostModel }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const UserModel = mongoose.model("User", userSchema)

module.exports = {UserModel}