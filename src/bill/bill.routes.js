import {Router} from "express"
import { allowBuy, editBill, getHistory } from "./bill.controller.js"
import { generateBillValidator } from "../middlewares/bill-validator.js"

const router = Router()

/**
 * @swagger
 * /generateBill:
 *   post:
 *     summary: Generar una factura
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Compra confirmada. Su factura ha sido generada.
 *       400:
 *         description: Error en la solicitud, carrito vacío o stock insuficiente.
 *       500:
 *         description: Error al procesar la compra.
 *     roles:
 *       - ADMIN_ROLE
 *       - CLIENT_ROLE
 */
router.post("/generateBill", generateBillValidator, allowBuy)

/**
 * @swagger
 * /getHistory:
 *   get:
 *     summary: Obtener el historial de compras
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial de compras obtenido exitosamente.
 *       500:
 *         description: Error al obtener el historial de compras.
 *     roles:
 *       - ADMIN_ROLE
 *       - CLIENT_ROLE
 */
router.get("/getHistory", generateBillValidator, getHistory)

/**
 * @swagger
 * /editBill/{id}:
 *   put:
 *     summary: Editar una factura
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *               quantity:
 *                 type: number
 *                 description: Cantidad del producto
 *     responses:
 *       200:
 *         description: Factura editada correctamente.
 *       400:
 *         description: Error en la solicitud, producto no existe o stock insuficiente.
 *       404:
 *         description: Factura no encontrada.
 *       500:
 *         description: Error al editar la factura.
 *     roles:
 *       - ADMIN_ROLE
 *       - CLIENT_ROLE
 */
router.put("/editBill/:id", generateBillValidator, editBill)

export default router