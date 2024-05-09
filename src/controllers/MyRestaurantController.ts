import {Request, Response} from 'express';
import Restaurant from "../model/Restaurant";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";


const getCurrentRestaurant = async (req: Request, res: Response) => {
    try {
        const curRestaurant = await Restaurant.findOne({User: req.userId});
        if (!curRestaurant) {
            res.status(404).send({message: "Restaurant not found"});
            return;
        }
        res.json(curRestaurant);
    } catch {
        res.status(500).send({message: "Error fetching Restaurant data"});
    }
}
const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        const currentRestaurant = await Restaurant.findOne({user: req.userId});
        if (currentRestaurant) {
            return res.status(409).send('restaurant already exists');
        }
        const imageFile = req.file as Express.Multer.File;
        const base64Image = Buffer.from(imageFile.buffer).toString('base64');
        const dataURI = `data:${imageFile.mimetype};base64,${base64Image}`;
        const imageResponse = await cloudinary.v2.uploader.upload(dataURI);
        const newRestaurant = new Restaurant(req.body);
        newRestaurant.ImageUrl = imageResponse.url;
        newRestaurant.User = new mongoose.Types.ObjectId(req.userId);
        newRestaurant.LastUpdated = new Date();
        await newRestaurant.save();
        res.send(newRestaurant);
    } catch (error) {
        console.log(error);
        res.status(500).send('failed to create restaurant');
    }
}
export default {
    getCurrentRestaurant,
    createMyRestaurant
};