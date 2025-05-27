import ValidationException from "../../exception/ValidationException.ts";
import BcryptHelper from "../../helpers/BcryptHelper.ts";
import JsonWebTokenHelper from "../../helpers/JsonWebTokenHelper.ts";
import User from "../models/User.ts";

interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}

interface CreateUserResponse {
    id: number;
    username: string;
    email: string;
    token: string;
}

export default async function createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    if (request.username.length < 3) {
        throw new ValidationException("Username must be at least 3 characters long");
    }

    if (request.password.length < 8) {
        throw new ValidationException("Password must be at least 8 characters long");
    }

    if (!request.email.includes("@")) {
        throw new ValidationException("Email is not valid");
    }

    const existingUser = await User.findOne({
        where: {
            email: request.email
        }
    });

    if (existingUser) {
        throw new ValidationException("Email already exists");
    }

    const user = await User.create({
        username: request.username,
        email: request.email,
        password: await BcryptHelper.hashPassword(request.password)

    });

    const token = await JsonWebTokenHelper.generateToken({
        id: user.id,
        username: user.username,
        email: user.email
    });

    return {
        id: user.id,
        username: request.username,
        email: request.email,
        token: token
    };
}
