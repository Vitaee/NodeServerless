import { Attributes, CreateOptions, Model } from "sequelize";
import { Projects } from "../../../db/dbinstance";


type ProjectCreate = {
    name: string
}

export const createProject = async (data : ProjectCreate ): Promise< CreateOptions<Attributes<Model>> extends { returning: false } | { ignoreDuplicates: true } ? void : Model> => {
    return await Projects.create(data,  { fields: ['name'] } );
}