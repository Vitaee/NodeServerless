import { NextFunction, Request, Response } from "express";
import { sequelize } from "../db/dbinstance";

export const initDatabase = async (req:Request, res:Response, next:NextFunction) => {
    await sequelize.sync();
    next();
}