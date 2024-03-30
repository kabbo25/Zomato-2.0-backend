import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoutes from "./routes/MyUserRoutes";

mongoose.connect(process.env.MONGODB_URI as string).then(() => {
    console.log("Connected to MongoDB");
});
const app = express();
app.use(express.json());
app.use(cors());
app.get("/health", (req: Request, res: Response) => {
    res.json({message: "Hello World"});
});
app.use("/api/my/user", MyUserRoutes);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})
