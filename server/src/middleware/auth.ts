import {NextFunction, Request, Response} from "express";
import 'dotenv/config'

export const verifyAuthHeader = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization'];
    if (!token || token !== process.env.AUTH_TOKEN) {
        res.status(403).json({error: 'Unauthorized'});
        return;
    }
    next();
};