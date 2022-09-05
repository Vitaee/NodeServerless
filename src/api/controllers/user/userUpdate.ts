import { Users } from "../../../db/dbinstance";

export const updateUser = async (newname: string, userid: string ): Promise<any> => {
    return await Users.update({ username: newname }, { where: {  id: userid } } );
}