import { Router } from "express";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { createProduct, getProducts} from "./product.controller.js";

const router = Router();

router.post("/addProduct",
    uploadProfilePicture.single("image"),
    createProduct);

router.get("/", getProducts);



export default router;