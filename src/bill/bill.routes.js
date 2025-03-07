import {Router} from "express"
import { allowBuy, editBill, getHistory } from "./bill.controller.js"
import { generateBillValidator } from "../middlewares/bill-validator.js"


const router = Router()


router.post("/generateBill", generateBillValidator, allowBuy)

router.get("/getHistory", generateBillValidator, getHistory)

router.put("/editBill/:id", generateBillValidator, editBill)



export default router