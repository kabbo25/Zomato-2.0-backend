import {Request, Response} from "express";
import User from "../model/user";

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById( {_id:req.userId});
        if (!user) {
            res.status(404).send({message: "User not found"});
            return;
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error fetching user"});
    }
}
const createCurrentUser = async (req: Request, res: Response) => {
    // 1. check if the user already exists
    // 2. create a new user if you don't exist
    // 3 return the user
    try {
       const {auth0Id} = req.body;
       const existingUser = await User.findOne({auth0Id});
         if (existingUser) {
              res.status(200).send({user: existingUser});
              return;
         }
         else{
                const newUser = new User(req.body);
                const savedUser = await newUser.save();
                res.status(201).json(savedUser.toObject());

         }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error creating user"});
    }
}

const updateCurrentUser = async (req: Request, res: Response) => {
    try{
        const {name,AddressLine1,Country,City}=req.body;
        const user= await User.findById(req.userId);
        if(!user){
            return res.status(404).send({message:"User not found"});
        }
        user.name=name;
        user.AddressLine1=AddressLine1;
        user.Country=Country;
        user.City=City;
        const updatedUser=await user.save();
        res.status(200).send(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: "Error updating user"});
    }
}
export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser
};