import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import {validateMyRestantRequest} from "../middlewares/validation";

const router=express.Router();

const storage=multer.memoryStorage();
const upload=multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024 //5MB
    }
});

router.post("/", upload.single("ImageUrl"),validateMyRestantRequest,MyRestaurantController.createMyRestaurant);

export default router;