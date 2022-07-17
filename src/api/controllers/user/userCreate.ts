import { Attributes, CreateOptions, Model } from "sequelize";
import { Users } from "../../../db/dbinstance";


type UserCreate = {
    email: string
    password: string
}

export const createUser = async (data : UserCreate ): Promise< CreateOptions<Attributes<Model>> extends { returning: false } | { ignoreDuplicates: true } ? void : Model> => {
    return await Users.create(data,  {fields: ['email', 'password'] });
}