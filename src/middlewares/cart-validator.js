import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validar-jwt.js";
import { hasRoles } from "./validate-rol.js";
import { handleErrors } from "./handle-errors.js";

export const createCartValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE","CLIENT_ROLE"),
    validarCampos,
    handleErrors
];

export const getCartValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    validarCampos,
    handleErrors
];

