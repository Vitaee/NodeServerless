import * as bcrypt from "bcryptjs";


export const hashPass =  async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

export const matchPass = async ( reqPass : string , hashedPass : string ): Promise<boolean> => {
    const match = await bcrypt.compare(reqPass, hashedPass);
    return match
}