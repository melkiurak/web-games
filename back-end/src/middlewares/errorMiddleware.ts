import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error(err.stack);
    
    if(process.env.NODE_ENV === 'production') {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
        return
    }
    res.status(500).json({
        success: 'false',
        message: 'Internal Server Error',
        devInfo: err.message,
    })
} 