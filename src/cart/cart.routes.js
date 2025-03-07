import { Router } from "express";
import { createCart, getCart } from "./cart.controller.js";
import { createCartValidator, getCartValidator} from "../middlewares/cart-validator.js";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = Router();

/**
 * @swagger
 * /addProductCart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
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
 *                 description: The name of the product
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product
 *     responses:
 *       200:
 *         description: The product has been added to the cart
 *       400:
 *         description: The product does not exist
 *       500:
 *         description: Error creating the cart
 *     roles:
 *       - ADMIN_ROLE
 *       - CLIENT_ROLE
 */
router.post("/addProductCart", createCartValidator,createCart);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get the cart of the user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The cart of the user
 *       400:
 *         description: The cart was not found
 *       500:
 *         description: Error retrieving the cart
 *     roles:
 *       - ADMIN_ROLE
 *       - CLIENT_ROLE
 */
router.get("/", getCartValidator, getCart);

export default router;