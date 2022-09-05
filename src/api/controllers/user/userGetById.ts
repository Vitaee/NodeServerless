import { Model } from "sequelize";
import { Users } from "../../../db/dbinstance";

export const getUserById = async (userid: string ): Promise<Model<any, any>> => {
    return await Users.findByPk(userid, {
        include: [Users.associations.projects],
        rejectOnEmpty: false
    });
}