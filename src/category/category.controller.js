`use strict`

import Category from "./category.model.js"
import Product from "../product/product.model.js"


export const defaultCategory = async (req, res) =>{
    try{
        const category = await Category.findOne({name: "Sin categoria"})
        if(!category){
            await Category.create({
                name: "Sin categoria",
            })
        }

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al crear la categoria por default"
        })
    }
}


export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        const category = new Category({ name });

        await category.save();

        res.status(200).json({
            success: true,
            message: "Categoria agregada exitosamente",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al agregar la categoría",
            error: err.message 
        });
    }
};


export const updateCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body; 
  
        const categoryUpdate = await Category.findByIdAndUpdate(id, { name }, { new: true });
    
        res.status(200).json({
          success: true,
          message: "La categoria ha sido actualizada",
          category: categoryUpdate
        });
    
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Error al actualizar la categoria",
          error: error.message
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);


        if (!category) {
            return res.status(404).json({
                success: false,
                message: "La categoría no fue encontrada"
            });
        }

        await Category.findByIdAndUpdate(id, { status: false }, { new: true });

  
        const categoryDefault = await Category.findOne({ name: "Sin categoria" });

        if (!categoryDefault) {
            return res.status(400).json({
                success: false,
                message: "No existe la categoria 'Sin categoria'. No se pueden reasignar los productos."
            });
        }

        await Product.updateMany({ category: id }, { category: categoryDefault._id });


        return res.status(200).json({
            success: true,
            message: "Categoría eliminada correctamente"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la categoría",
            error: err.message 
        });
    }
};




export const getCategory = async (req, res) => {
    try{
        const { limite = 10, desde = 0 } = req.query
        const query = {status: true}

        const [total, categories ] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            categories
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error al obtneer las categorias",
            error: error.message
        })
    }
}
