import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import {validateMyRestantRequest} from "../middlewares/validation";
import {jwtCheck, jwtParse} from "../middlewares/auth";

const router=express.Router();

const storage=multer.memoryStorage();
const upload=multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024 //5MB
    }
});

router.get("/",jwtCheck,jwtParse,MyRestaurantController.getCurrentRestaurant);
router.post("/", upload.single("ImageFile"),validateMyRestantRequest,jwtCheck, jwtParse,MyRestaurantController.createMyRestaurant);

export default router;