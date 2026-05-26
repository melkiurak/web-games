import { NextFunction, Request, Response } from "express";

export const validatePage = ( req:Request, res:Response, next:NextFunction ) => {
    const page = Math.floor(Number(req.query.page))
    
    if(isNaN(page) || page < 1 ) {
        res.status(400).json({
            success: false,
            message: 'Invalid page parameter',
        })
        return
    }
    next();

}