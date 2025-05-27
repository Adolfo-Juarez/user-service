import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface UserTokenPayload {
    id: number;
    username: string;
    email: string;
    role: string;
}

export default class JsonWebTokenHelper {

    static async generateToken(payload: UserTokenPayload): Promise<string> {
        return jwt.sign(payload, process.env.JWT_SECRET ?? "default-super-secret");
    }

    static async verifyToken(token: string): Promise<UserTokenPayload> {
        const payload = jwt.verify(token, process.env.JWT_SECRET ?? "default-super-secret");
        return payload as UserTokenPayload;
    }
}
