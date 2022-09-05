import { Model } from "sequelize";
import { Projects } from "../../../db/dbinstance";

export const getProjectById = async (userid: string, projectid: string ): Promise<Model<any, any>> => {
    return await Projects.findOne( {where: {ownerId: userid, id: projectid}} );
}