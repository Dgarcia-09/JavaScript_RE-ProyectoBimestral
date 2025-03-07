`use strict`
import { hash , verify} from "argon2";
import User from "./user.model.js"
import fs from "fs/promises"
import {join, dirname} from "path"
import { fileURLToPath } from "url";
import { register } from "../auth/auth.controller.js"

const __dirname = dirname(fileURLToPath(import.meta.url))


export const addUser = async (req, res) =>{
    try{
        register(req, res)

    }catch(err){
        res.status(500).json({
            success: false,
            message: `Error al agregar el usuario`,
            err
        })
    }

}


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, username, role, ...data } = req.body
        let newProfilePicture = req.file ? req.file.filename : null


        if (password || username || role ) {
            return res.status(400).json({
                success: false,
                message: "Los administradores no pueden actualizar la contraseña, nombre de usuario y rol "
            });
        }

        if (newProfilePicture) {
            const user = await User.findById(id);
            if (user.profilePicture) {
                const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
                await fs.unlink(oldProfilePicture);
            }
            data.profilePicture = newProfilePicture;
        }

        const user = await User.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Usuario actualizado",
            user
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error al actualizar los datos del usuario",
            err
        })
    }
}


export const modifyRole = async (req, res) => {
    try {
        const { id } = req.params
        const { role } = req.body

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }
        if (user.role === role) {
            return res.status(400).json({
                success: false,
                message: "El nuevo rol no puede ser el mismo que el rol actual"
            })
        }
        await User.findByIdAndUpdate(id, { role }, { new: true })

        return res.status(200).json({
            success: true,
            message: "El rol ha sido actualizado"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al modificar el rol",
            err
        })
    }
}


export const deleteUser = async (req, res) =>{
    try{
        const { id } = req.params

        const user = await User.findByIdAndUpdate(id, {status: false}, {new: true})

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            err
        })
    }

}

export const editProfile = async (req, res) =>{
    try{
        

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Erro al editar el perfil",
            err
        })
    }
}


export const updatePassword = async (req, res) => {
    try{
        const { id } = req.params
        const { newPassword } = req.body

        const user = await User.findById(id)

        const matchOldAndNewPassword = await verify(user.password, newPassword)

        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(id, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}

export const updateProfilePicture = async(req, res) =>{
    try{
        const {id} = req.params
        let newProfilePicture = req.file ? req.file.filename : null

        if(!newProfilePicture){
            return res.status(500).json({
                success: false,
                message: "No se proporciono ningun archivo"
            })
        }

        const user =  await User.findById(id)

        if(user.newProfilePicture){
            const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture)
            await fs.unlink(oldProfilePicture)

        }

        user.profilePicture = newProfilePicture

        await user.save()

        return res.status(200).json({
            success: true,
            message: "Foto actualizada",
            user
        })



    }catch(err){
        return res.status(500).json({
            success:false,
            message: "Error al actualizar la foto",
            error:err.message
        })

    }
}

export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const passwordMatch = await verify(user.password, password);
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: "La contraseña es incorrecta"
            });
        }

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado permanentemente"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        });
    }
};

