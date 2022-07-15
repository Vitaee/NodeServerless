import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

export const isMailExist = async (req: Request, res: Response, next: NextFunction) => {
    const haveMail = await User.findOne({ where: { email : req.body.email} });

    if (haveMail) {
        return res.status(409).send({ msg: "Duplicate Email, An account with this email address already exists"})
    }
}