import Product from './product.model.js';
import Category from '../category/category.model.js';

export const createProduct = async (req, res) => {
    try {
        let image = req.file ? req.file.filename : null;
        const data = req.body

        data.image= image

        const category = await Category.findById(data.category)

        if(!category){
            return res.status(401).json({
                succes: false,
                message: "No existe la categoria"
            })
        }

        const product = await Product.create(data)

        return res.status(200).json({
            succes: true,
            message: "Producto creado",
            product: product
        }) 

    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al crear los productos"
        })
    }
}


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: true }).populate("category", "name");

        res.status(200).json({
            success: true,
            products
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        });
    }
};

export const searchByName = async (req, res) => {
    try{
        const {name} = req.params
        const product = await Product.findOne({name: name}).populate("category", "name")

        if(!product){         
            return res.status(400).json({
                success: false,
                message: "El producto no existe"
            })
        }
        res.status(200).json({
            success: true,
            product
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al buscar el producto",
            error: err.message
        })
    }
}

export const productByCategory = async (req, res) =>{
    try{
        const {id} = req.params

        const category = await Category.findById(id)

        if(!category){
            return res.status(400).json({
                success: false,
                message: "La categoria no existe"
            })
        }

        const product = await Product.find({category: id})

        res.status(200).json({
            success: true,
            product
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al buscar los productos por categoria",
            error: err.message
        })

    }
}


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (data.image || data.category) {
            return res.status(400).json({
                success: false,
                message: "No se permite actualizar la imagen o la categoria del producto"
            })
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "El producto no existe"
            })
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })

        res.status(200).json({
            success: true,
            message: "Producto actualizado correctamente",
            product: updatedProduct
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
            error: err.message
        })
    }
}


export const deleteProduct = async (req, res) =>{
    try{
        const {id} = req.params

        const product = await Product.findByIdAndDelete(id)

        if(!product){
            return res.status(400).json({
                success: false,
                message: "El producto no existe"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Producto eliminado"
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: err.message
        })
    }
}


export const soldOutProducts = async (req, res) => {
    try {
        const soldOut = await Product.find({ stock: 0 });

        return res.status(200).json({
            success: true,
            count: soldOut.length,
            products: soldOut
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error al mostrar los productos agotados",
            error: error.message
        })
    }
}


export const mostSold = async (req, res) => {
    try{
        const mostSold = await Product.find().sort({sold: -1}).limit(10);

        return res.status(200).json({
            success: true,
            message: "Se encontraron los productos mas vendidos exitosamente",
            total: mostSold.length,
            mostSold
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos mas vendidos",
            error: error.message
        })
    }
}


export const lessSold = async (req, res) => {
    try{
        const lessSold = await Product.find().sort({sold: 1}).limit(10);

        return res.status(200).json({
            success: true,
            message: "Se encontraron los productos menos vendidos exitosamente",
            total: lessSold.length,
            lessSold
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos menos vendidos",
            error: error.message
        })
    }
}
