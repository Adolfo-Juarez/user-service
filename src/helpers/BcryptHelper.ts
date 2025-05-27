import bcrypt from "bcrypt";


export default class BcryptHelper {

    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 5);
    }

    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
