import mongoose from "mongoose";


const menuSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Price: {type: Number, required: true},
})
const restaurantSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    RestaurantName: {type: String, required: true},
    City: {type: String, required: true},
    Country: {type: String, required: true},
    DeliveryTime: {type: Number, required: true},
    DeliveryPrice: {type: Number, required: true},
    Cuisine: [{type: String, required: true}],
    MenuItems: [menuSchema],
    ImageUrl: {type: String, required: true},
    LastUpdated: {type: Date, required: true}
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;