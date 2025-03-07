import { Router } from "express";
import { createCart, getCart } from "./cart.controller.js";
import { createCartValidator, getCartValidator} from "../middlewares/cart-validator.js";

const router = Router();

router.post("/addProductCart", createCartValidator,createCart);

router.get("/", getCartValidator, getCart);

export default router;