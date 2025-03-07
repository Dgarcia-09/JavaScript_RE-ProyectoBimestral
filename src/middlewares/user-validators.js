import { body } from "express-validator";
import { emailExists, usernameExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import {validateJWT} from "./validar-jwt.js"
import { hasRoles } from "./validate-rol.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

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


export const addUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
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

export const updateUserAdminValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("surname").notEmpty().withMessage("El apellido es requerido"),
    validarCampos,
    handleErrors
]


export const modifyRoleValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]


export const deleteProfileValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    validarCampos,
    handleErrors
    
]
