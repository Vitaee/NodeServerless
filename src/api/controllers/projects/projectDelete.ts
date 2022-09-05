import { Projects } from "../../../db/dbinstance";

export const deleteProject = async (userid: string , projectid : string ): Promise< number > => {
    return await Projects.destroy( { where: {ownerId: userid, id: projectid} } );
}