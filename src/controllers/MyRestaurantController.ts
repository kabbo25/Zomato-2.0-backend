import {Request, Response} from 'express';
import Restaurant from "../model/Restaurant";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";

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
        newRestaurant.user = new mongoose.Types.ObjectId(req.userId);
        newRestaurant.LastUpdated = new Date();
        await newRestaurant.save();
    } catch (error) {
        console.log(error);
        res.status(500).send('failed to create restaurant');
    }
}
export default {createMyRestaurant};