import Cart from "../cart/cart.model.js";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import Buy from "../buy/buy.model.js"; 

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);




export const allowBuy = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.usuario._id }).populate("products.product");

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "El carrito esta vacio"
            });
        }

        let total = 0;
        const purchasedProducts = [];

        for (let item of cart.products) {
            if (item.product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Stock insuficiente para ${item.product.name}`
                });
            }
            total += item.product.price * item.quantity;
            item.product.stock -= item.quantity;
            item.product.sold += item.quantity;
            await item.product.save();

            purchasedProducts.push({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            });
        }

        const buy = new Buy({
            user: req.usuario._id,
            products: purchasedProducts,
            total
        });

        const facturasPath = path.join(process.cwd(), "public/uploads/bills");

        if (!fs.existsSync(facturasPath)) {
            fs.mkdirSync(facturasPath, { recursive: true });
        }

        const invoicePath = path.join(facturasPath, `factura-${req.usuario._id}_${Date.now()}.pdf`);
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(invoicePath));

        doc.fontSize(20).text("Factura de Compra", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`Cliente: ${req.usuario.name} ${req.usuario.surname}`);
        doc.moveDown();

        doc.fontSize(12).text("Detalles de la compra:");
        cart.products.forEach((item) => {
            doc.text(`${item.product.name} - Cantidad: ${item.quantity} - Precio: $${item.product.price}`);
        });
        doc.moveDown();

        doc.fontSize(14).text(`Total: $${total}`, { align: "right" });
        doc.end();

        buy.invoicePath = invoicePath;
        await buy.save();

        await Cart.findOneAndDelete({ user: req.usuario._id });

        return res.status(200).json({
            success: true,
            message: "Compra confirmada. Su factura ha sido generada.",
            buy
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al procesar la compra",
            error: err.message
        });
    }
};
