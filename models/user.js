const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

//automatically adds username & password to userSchema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);