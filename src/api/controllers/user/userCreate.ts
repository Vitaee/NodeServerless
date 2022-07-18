import { Attributes, CreateOptions, Model } from "sequelize";
import { Users } from "../../../db/dbinstance";
import { hashPass } from "../../../utils/userPassword";


type UserCreate = {
    email: string
    username: string
    password: string
}

export const createUser = async (data : UserCreate ): Promise< CreateOptions<Attributes<Model>> extends { returning: false } | { ignoreDuplicates: true } ? void : Model> => {
    const hashedPassword = await hashPass(data.password);
    data.password = hashedPassword;
    return await Users.create(data,  {fields: ['email', 'username','password'] });
}