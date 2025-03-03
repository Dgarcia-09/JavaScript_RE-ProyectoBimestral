import {Router} from "express"
import { addUser, modifyRole, deleteUser, updateUser } from "./user.controller.js"
import { addUserValidator, modifyRoleValidator, deleteUserValidator, updateUserAdminValidator } from "../middlewares/user-validators.js"
import {uploadProfilePicture} from "../middlewares/multer-uploads.js"


const router = Router()

router.post("/addUser/", 
    uploadProfilePicture.single("profilePicture"),
    addUserValidator,
    addUser)

router.patch("/modifyRole/:id",
    modifyRoleValidator,
    modifyRole
)

router.delete("/deleteUser/:id",
    deleteUserValidator,
    deleteUser
)

router.put("/updateUser/:id",
    uploadProfilePicture.single("profilePicture"),
    updateUserAdminValidator,
    updateUser
)

export default router
