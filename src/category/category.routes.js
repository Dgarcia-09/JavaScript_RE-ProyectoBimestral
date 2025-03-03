import {Router} from "express"
import { addCategoryValidator, updateCategoryValidator, deleteCategoryValidator} from "../middlewares/category-validator.js"
import { addCategory, updateCategory, deleteCategory } from "./category.controller.js"


const router = Router()

router.post("/addcategory", addCategoryValidator, addCategory)

router.patch("/updateCategory/:id", updateCategoryValidator, updateCategory)

router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory)

export default router