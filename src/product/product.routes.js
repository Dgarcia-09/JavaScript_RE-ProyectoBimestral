import { Router } from "express";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { createProductValidator, searchByNameValidator, updateProductValidator, deleteProductValidator } from "../middlewares/product-validator.js";
import { createProduct, getProducts, searchByName,productByCategory, updateProduct, deleteProduct, soldOutProducts, mostSold, lessSold } from "./product.controller.js";

const router = Router()

router.post("/addProduct",uploadProfilePicture.single("image"), createProductValidator, createProduct)

router.get("/", getProducts)

router.get("/searchProduct/:name", searchByNameValidator, searchByName)

router.get("/searchProduct/category/:id", productByCategory)

router.put("/updateProduct/:id", updateProductValidator, updateProduct)

router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct)

router.get("/soldOut", soldOutProducts)

router.get("/mostSold", mostSold)

router.get("/lessSold", lessSold )

export default router;