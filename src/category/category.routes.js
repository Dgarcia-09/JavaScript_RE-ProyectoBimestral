import {Router} from "express"
import { addCategoryValidator, updateCategoryValidator, deleteCategoryValidator} from "../middlewares/category-validator.js"
import { addCategory, updateCategory, deleteCategory, getCategory} from "./category.controller.js"

const router = Router()

/**
 * @swagger
 * /addcategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "Electronics"
 *     responses:
 *       200:
 *         description: Categoria agregada exitosamente
 *       500:
 *         description: Error al agregar la categoría
 */
router.post("/addcategory", addCategoryValidator, addCategory)

/**
 * @swagger
 * /updateCategory/{id}:
 *   patch:
 *     summary: Update an existing category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the category
 *                 example: "Home Appliances"
 *     responses:
 *       200:
 *         description: La categoria ha sido actualizada
 *       500:
 *         description: Error al actualizar la categoria
 */
router.patch("/updateCategory/:id", updateCategoryValidator, updateCategory)

/**
 * @swagger
 * /deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       404:
 *         description: La categoría no fue encontrada
 *       500:
 *         description: Error al eliminar la categoría
 */
router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of categories to return
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *           default: 0
 *         description: The number of categories to skip
 *     responses:
 *       200:
 *         description: A list of categories
 *       500:
 *         description: Error al obtneer las categorias
 */
router.get("/", getCategory)

export default router