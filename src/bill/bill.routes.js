import {Router} from "express"
import { allowBuy } from "./bill.controller.js"
import { generateBillValidator } from "../middlewares/bill-validator.js"


const router = Router()


router.post("/generateBill", generateBillValidator, allowBuy)

export default router