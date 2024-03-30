import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoutes from "./routes/MyUserRoutes";
import {v2 as cloudinary} from "cloudinary";
import MyRestaurantRoutes from "./routes/MyRestaurantRoutes";
mongoose.connect(process.env.MONGODB_URI as string).then(() => {
    console.log("Connected to MongoDB");
});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const app = express();
app.use(express.json());
app.use(cors());
app.get("/health", (req: Request, res: Response) => {
    res.json({message: "Hello World"});
});
app.use("/api/my/user", MyUserRoutes);
app.use("/api/my/restaurant", MyRestaurantRoutes);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})
