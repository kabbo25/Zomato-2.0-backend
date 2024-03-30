import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    AddressLine1: {
        type: String,
    },
    City: {
        type: String,
    },
    Country: {
        type: String,
    },
});

const User = mongoose.model("FoodUser", userSchema);

export default User;