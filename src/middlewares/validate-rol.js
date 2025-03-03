export const hasRoles = (...roles) =>{
    return (req, res, next) =>{
        if(!req.usuario){
            return res.status(500).json({
                succes: false,
                message: "Se debe verificar el role del usuario antes de validar el token"
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                success: false,
                message: `El servicio requiere uno de estos roles: ${roles}`
            })
        }
        next()
    }
}