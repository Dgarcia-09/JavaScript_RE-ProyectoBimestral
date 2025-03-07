import {Router} from "express"
import { addUser, modifyRole, deleteUser, updateUser, updatePassword, updateProfilePicture, deleteProfile } from "./user.controller.js"
import { addUserValidator, modifyRoleValidator, deleteUserValidator, updateUserAdminValidator, updatePasswordValidator, updateProfilePictureValidator, deleteProfileValidator } from "../middlewares/user-validators.js"
import {uploadProfilePicture} from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * /addUser/:
 *   post:
 *     summary: Add a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE]
 */
router.post("/addUser/", uploadProfilePicture.single("profilePicture"), addUserValidator, addUser)

/**
 * @swagger
 * /modifyRole/{id}:
 *   patch:
 *     summary: Modify user role
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE]
 */
router.patch("/modifyRole/:id", modifyRoleValidator, modifyRole)

/**
 * @swagger
 * /deleteUser/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE]
 */
router.delete("/deleteUser/:id", deleteUserValidator, deleteUser)

/**
 * @swagger
 * /updateUser/{id}:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE]
 */
router.put("/updateUser/:id", uploadProfilePicture.single("profilePicture"), updateUserAdminValidator, updateUser)

/**
 * @swagger
 * /updatePassword/{id}:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE, CLIENT_ROLE]
 */
router.patch("/updatePassword/:id", updatePasswordValidator, updatePassword)

/**
 * @swagger
 * /updatePFP/{id}:
 *   patch:
 *     summary: Update profile picture
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE, CLIENT_ROLE]
 */
router.patch("/updatePFP/:id", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)

/**
 * @swagger
 * /deleteProfile/{id}:
 *   delete:
 *     summary: Delete user profile
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       400:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE, CLIENT_ROLE]
 */
router.delete("/deleteProfile/:id", deleteProfileValidator, deleteProfile)

export default router
