import {auth} from "express-oauth2-jwt-bearer";
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import User from "../model/user";
declare global {
    namespace Express {
        interface Request {
            auth0Id: string;
            userId: string;
        }

    }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE, issuerBaseURL: process.env.AUTH0_ISSUE_BASE_URL, tokenSigningAlg: 'RS256'
});
export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).send("token is required");
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    try{
        const auth0Id = decoded.sub;
        const user=await User.findOne({auth0Id});
        if(!user){
            return res.status(404).send("User not found");
        }
        req.auth0Id=auth0Id as string;
        req.userId=user._id.toString();
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).send("Invalid token");
    }
}