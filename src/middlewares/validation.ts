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