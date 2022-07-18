import { Users } from "../../../db/dbinstance";
import { matchPass } from "../../../utils/userPassword";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from "../../../middlewares/checkJwt";

type UserLogin = {
    email: string
    password: string
}



export const loginUser = async (data: UserLogin) : Promise<string | Error>  => {
    const user = await Users.findOne({ where: { email : data.email} });
    const matched = await matchPass(data.password, user.getDataValue('password'));

    if (matched){
        const token = jwt.sign( { email: user.getDataValue('email')}, SECRET_KEY, { expiresIn: '2 days' })
        
        return token
    }

    
    throw new Error('Password is not correct'); 
}