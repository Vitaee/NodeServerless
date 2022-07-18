import { Attributes, CreateOptions, Model } from "sequelize";
import { Projects } from "../../../db/dbinstance";


type ProjectCreate = {
    name: string
    ownerId: string
}

export const createProject = async (userid: string , data : ProjectCreate ): Promise< CreateOptions<Attributes<Model>> extends { returning: false } | { ignoreDuplicates: true } ? void : Model> => {
    data.ownerId = userid
    return await Projects.create(data,  { fields: ['name', 'ownerId'] } );
}