import Cart from "./cart.model.js";
import Product from "../product/product.model.js";

export const createCart = async (req, res) => {

    try{
        const { name, quantity } = req.body;

        const product = await Product.findOne({ name: name });

        if(!product){
            return res.status(400).json({
                success: false,
                message: `El producto ${name} no existe`
            })
        }

        let cart = await Cart.findOne({ user: req.usuario._id });


        if(!cart){
            cart = new Cart({ user: req.usuario._id, products: [] });
        }

        const exists = cart.products.find(p => p.product.toString() === product._id.toString());

        if(exists){
            exists.quantity += quantity; 
        }else{
            cart.products.push({ product: product._id, quantity });
        }

        const carrito = await cart.save();


        return res.status(200).json({
            message: "El producto ha sido anadido al carrito",
            carrito
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al crear el carrito",
            error: err.message
        })
    }
}


export const getCart = async (req, res) => {
    try{
        const carrito = await Cart.findOne({ user: req.usuario._id }).populate("products.product", "name price");

        if(!carrito){
            return res.status(400).json({
                success: false,
                message: "El carrito no fue encontrado"
            })
        }

        return res.status(200).json({
            carrito
        }) 

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtemer el carrito",
            error: err.message
        })
    }
}

