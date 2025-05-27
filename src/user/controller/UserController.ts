import express from "express";
import ValidationException from "../../exception/ValidationException.ts";
import createUserService from "../services/UserService.ts";

// Definimos una función adaptadora para manejar la solicitud y respuesta de Express
export function createUser(req, res) {
    handleCreateUser({ request: req, response: res });
}

// Función interna que maneja la lógica
async function handleCreateUser(params: { request: any; response: any }) {
    try {
        const { username, email, password } = params.request.body;
        
        const user = await createUserService({
            username,
            email,
            password
        });
        
        params.response.status(201).json({
            message: "Usuario creado exitosamente",
            user
        });
    } catch(e: unknown) {
        if (e instanceof ValidationException) {
            params.response.status(400).json({
                message: e.message
            });
        } else {
            // Manejar otros tipos de errores
            console.error(e);
            params.response.status(500).json({
                message: 'Error interno del servidor'
            });
        }
    }
}