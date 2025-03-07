import { body, param } from "express-validator"
import { handleErrors } from "./handle-errors.js"
import { validarCampos } from "./validate-fields.js"
import { validateJWT } from "./validar-jwt.js"
import { hasRoles } from "./validate-rol.js"
import { productExists } from "../helpers/db-validator.js"


export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Ingrese un nombre para el producto"),
    body("name").custom(productExists),
    body("price").notEmpty().withMessage("Ingrese un precio para el producto"),
    body("category").notEmpty().withMessage("Ingrese una categoria para el producto"),
    body("stock").notEmpty().withMessage("Ingrese la cantidad en stock"),
    validarCampos,
    handleErrors
]

export const searchByNameValidator = [
    body("name").custom(productExists),
    validarCampos,
    handleErrors
]

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un id valido"),
    body("name").notEmpty().withMessage("Ingrese un nombre para el producto"),
    body("name").optional().custom(productExists),
    body("price").notEmpty().withMessage("Ingrese un precio para el producto"),
    body("descryption").notEmpty().withMessage("Ingrese una descripcion para el producto"),
    body("stock").notEmpty().withMessage("Ingrese la cantidad en stock"),
    body("sold").notEmpty().withMessage("Ingrese la cantidad vendida"),
    validarCampos,
    handleErrors
]


export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un id valido"),
    validarCampos,
    handleErrors
]

