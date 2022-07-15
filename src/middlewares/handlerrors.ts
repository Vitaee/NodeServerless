import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not the route you want: '+ req.originalUrl);

    res.status(404);
    next(error);
};

export const errorHandler = (error, req:Request, res:Response, next:NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode);
    res.json({
        message: error.message,
    });
};
