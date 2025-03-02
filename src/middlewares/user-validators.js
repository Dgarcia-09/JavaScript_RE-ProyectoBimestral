import { body } from "express-validator";
import { emailExists, usernameExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0
    }),
    validarCampos,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0
    }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]