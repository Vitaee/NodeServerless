import { Model } from "sequelize";
import { Projects } from "../../../db/dbinstance";

export const updateProject = async (userid: string, projectid: string, newname: string): Promise<[affectedCount: number]>=> {
    return await  Projects.update({ name: newname }, { where: { ownerId: userid, id: projectid } } );
}