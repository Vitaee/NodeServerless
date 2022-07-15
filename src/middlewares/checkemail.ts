import { Request, Response, NextFunction } from "express";
import { Users } from "../db/dbinstance";

export const isMailExist = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email } = req.body
        const haveMail = await Users.findOne({ where: { email : email} });
        return haveMail ? res.status(409).send({ msg: "Duplicate Email, An account with this email address already exists"}) : next();
        

    } catch ( err: any){
        next();
    }
}