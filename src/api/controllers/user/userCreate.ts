import { Attributes, CreateOptions, Model } from "sequelize";
import { Users } from "../../../db/dbinstance";
import { hashPass } from "../../../utils/userPassword";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from "../../../middlewares/checkJwt";

type UserCreate = {
    email: string
    username: string
    password: string
}

export const createUser = async (data : UserCreate ): Promise<string>=> {
    const hashedPassword = await hashPass(data.password);
    data.password = hashedPassword;
    const newUser = await Users.create(data,  {fields: ['email', 'username','password'] });

    const token  = jwt.sign( { email: newUser.getDataValue('email')}, SECRET_KEY, { expiresIn: '2 days'  });
    return token;
}