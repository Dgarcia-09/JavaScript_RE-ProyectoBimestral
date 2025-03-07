import {Router} from "express"
import { addUser, modifyRole, deleteUser, updateUser, updatePassword, updateProfilePicture, deleteProfile } from "./user.controller.js"
import { addUserValidator, modifyRoleValidator, deleteUserValidator, updateUserAdminValidator, updatePasswordValidator, updateProfilePictureValidator, deleteProfileValidator } from "../middlewares/user-validators.js"
import {uploadProfilePicture} from "../middlewares/multer-uploads.js"


const router = Router()

router.post("/addUser/", uploadProfilePicture.single("profilePicture"),addUserValidator,addUser)

router.patch("/modifyRole/:id",modifyRoleValidator,modifyRole
)

router.delete("/deleteUser/:id",deleteUserValidator,deleteUser
)

router.put("/updateUser/:id",uploadProfilePicture.single("profilePicture"),updateUserAdminValidator,updateUser
)

router.patch("/updatePassword/:id", updatePasswordValidator, updatePassword )

router.patch("/updatePFP/:id", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)

router.delete("/deleteProfile/:id", deleteProfileValidator, deleteProfile)

export default router
