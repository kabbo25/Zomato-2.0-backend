import {body,validationResult} from "express-validator"
import {Request, Response, NextFunction} from "express";


const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();

}
export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("AddressLine1").isString().notEmpty().withMessage("Address Line 1 is required"),
    body("City").isString().notEmpty().withMessage("City is required"),
    body("Country").isString().notEmpty().withMessage("Country is required"),
    handleValidationErrors
]

export const validateMyRestantRequest = [
    body("RestaurantName").isString().notEmpty().withMessage("Name is required"),
    body("City").isString().notEmpty().withMessage("City is required"),
    body("Country").isString().notEmpty().withMessage("Country is required"),
    body("DeliveryTime").isInt({min: 0}).withMessage("Delivery Time is required"),
    body("DeliverPrice").isFloat({min: 0}).withMessage("Delivery Fee is required"),
    body("Cuisine").isArray().withMessage("Cuisine should be array").notEmpty().withMessage("Cuisine is required"),
    body("MenuItems").isArray().withMessage("MenuItems should be array"),
    body("MenuItems.*Name").notEmpty().withMessage("MenuItems Name is required"),
    body("MenuItems.*Price").isFloat({min: 0}).withMessage("MenuItems Price is required"),
    handleValidationErrors
]