const mongoose =  require("mongoose");

const addressSchema = mongoose.Schema({
    street: String,
    city: String
})
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true,
    },
    createdAt: Date,
    updatedAt: Date,
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: addressSchema
});

module.exports = mongoose.model("User", userSchema);