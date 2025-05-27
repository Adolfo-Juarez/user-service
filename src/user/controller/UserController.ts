import ValidationException from "../../exception/ValidationException.ts";
import { createUserService, authUserService, getProfileService } from "../services/UserService.ts";

import ModelNotFound from "../../exception/ModelNotFound.ts";

// Función interna que maneja la lógica
export async function createUserController(request: any, response: any) {
    try {
        const { username, email, password } = request.body;

        const user = await createUserService({
            username,
            email,
            password
        });

        response.status(201).json({
            message: "Usuario creado exitosamente",
            user
        });
    } catch (e: unknown) {
        if (e instanceof ValidationException) {
            response.status(400).json({
                message: e.message
            });
        } else {
            // Manejar otros tipos de errores
            console.error(e);
            response.status(500).json({
                message: 'Error interno del servidor'
            });
        }
    }
}

export async function authUserController(request: any, response: any) {
    try {
        const { email, password } = request.body;

        const user = await authUserService({
            email,
            password
        });

        response.status(200).json({
            message: "Usuario autenticado exitosamente",
            user
        });
    } catch (e: unknown) {
        if (e instanceof ValidationException) {
            response.status(400).json({
                message: e.message
            });
        }

        if (e instanceof ModelNotFound) {
            response.status(404).json({
                message: e.message
            });
        }

        console.error(e);
        response.status(500).json({
            message: 'Error interno del servidor'
        });

    }
}

export async function getProfileController(request: any, response: any) {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const user = await getProfileService(token);
        response.status(200).json({
            message: "Perfil obtenido exitosamente",
            user
        });
    } catch (e: unknown) {
        if (e instanceof ValidationException) {
            response.status(400).json({
                message: e.message
            });
        }
        if (e instanceof ModelNotFound) {
            response.status(404).json({
                message: e.message
            });
        }
        console.error(e);
        response.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}
