import ModelNotFound from "../../exception/ModelNotFound.ts";
import ValidationException from "../../exception/ValidationException.ts";
import BcryptHelper from "../../helpers/BcryptHelper.ts";
import JsonWebTokenHelper from "../../helpers/JsonWebTokenHelper.ts";
import MailHelper from "../../helpers/MailHelper.ts";
import PasswordGenerator from "../../helpers/PasswordGenerator.ts";
import User from "../models/User.ts";

interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}

interface AuthUserResponse {
    id: number;
    username: string;
    email: string;
    token: string;
}

interface AuthUserRequest {
    email: string;
    password: string;
}

interface UserResponse {
    id: number;
    username: string;
    email: string;
}

export async function createUserService(request: CreateUserRequest): Promise<AuthUserResponse> {
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
        username: user.dataValues.username,
        email: user.dataValues.email
    });

    return {
        id: user.dataValues.id,
        username: request.username,
        email: request.email,
        token: token
    };
}


export async function authUserService(request: AuthUserRequest): Promise<AuthUserResponse> {
    const user = await User.findOne({
        where: {
            email: request.email
        }
    });

    if (!user) {
        throw new ModelNotFound("User not found");
    }

    const isPasswordValid = await BcryptHelper.comparePassword(request.password, user.dataValues.password);

    if (!isPasswordValid) {
        throw new ValidationException("Invalid password");
    }

    const token = await JsonWebTokenHelper.generateToken({
        id: user.dataValues.id,
        username: user.dataValues.username,
        email: user.dataValues.email
    });

    return {
        id: user.dataValues.id,
        username: user.dataValues.username,
        email: user.dataValues.email,
        token: token
    };
}

export async function getProfileService(token: string): Promise<UserResponse> {
    const payload = await JsonWebTokenHelper.verifyToken(token);
    console.log(payload);
    return {
        id: payload.id,
        username: payload.username,
        email: payload.email
    };
}

export async function sendRecoveryPasswordService(mail: string): Promise<void> {

    const user = await User.findOne({
        where: {
            email: mail
        }
    });

    if (!user) {
        throw new ModelNotFound("User not found");
    }

    const password = PasswordGenerator.generatePassword();

    await user.update({
        password: await BcryptHelper.hashPassword(password)
    });

    MailHelper.sendRecoveryPasswordMail({
        receiverEmail: user.dataValues.email,
        receiverUsername: user.dataValues.username,
        password: password
    });
}
