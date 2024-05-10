import { Request, Response } from "express";
import Restaurant from "../model/Restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const getCurrentRestaurant = async (req: Request, res: Response) => {
  try {
    const curRestaurant = await Restaurant.findOne({ User: req.userId });
    console.log(req.userId);
    console.log(curRestaurant);
    if (!curRestaurant) {
      res.status(404).send({ message: "Restaurant not found" });
      return;
    }
    res.json(curRestaurant);
  } catch {
    res.status(500).send({ message: "Error fetching Restaurant data" });
  }
};
const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const currentRestaurant = await Restaurant.findOne({ User: req.userId });
    if (currentRestaurant) {
      return res.status(409).send("restaurant already exists");
    }
    const ImageUrl = await uploadImage(req.file as Express.Multer.File);
    const newRestaurant = new Restaurant(req.body);
    newRestaurant.ImageUrl = ImageUrl;
    newRestaurant.User = new mongoose.Types.ObjectId(req.userId);
    newRestaurant.LastUpdated = new Date();
    await newRestaurant.save();
    res.send(newRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).send("failed to create restaurant");
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const currentRestaurant = await Restaurant.findOne({ User: req.userId });
    console.log(req.userId);
    console.log(currentRestaurant);
    if (!currentRestaurant) {
      return res.status(404).send("restaurant not found");
    }
    const ImageUrl = await uploadImage(req.file as Express.Multer.File);
    currentRestaurant.RestaurantName = req.body.RestaurantName;
    currentRestaurant.City = req.body.City;
    currentRestaurant.Country = req.body.Country;
    currentRestaurant.DeliveryTime = req.body.DeliveryTime;
    currentRestaurant.DeliveryPrice = req.body.DeliveryPrice;
    currentRestaurant.Cuisine = req.body.Cuisine;
    currentRestaurant.MenuItems = req.body.MenuItems;
    currentRestaurant.ImageUrl = ImageUrl;
    currentRestaurant.LastUpdated = new Date();
    await currentRestaurant.save();
    res.status(201).json(currentRestaurant);
  } catch {
    res.status(500).send({ message: "Error updating Restaurant data" });
  }
};

const uploadImage = async (File: Express.Multer.File) => {
  const base64Image = Buffer.from(File.buffer).toString("base64");
  const dataURI = `data:${File.mimetype};base64,${base64Image}`;
  const imageResponse = await cloudinary.v2.uploader.upload(dataURI);
  return imageResponse.url;
};
export default {
  getCurrentRestaurant,
  createMyRestaurant,
  updateMyRestaurant,
};
