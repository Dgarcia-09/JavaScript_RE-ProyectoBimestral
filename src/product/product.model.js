import {Schema, model} from "mongoose";

const productSchema = Schema({
    name:{
        type:String,
        required: [true, "El nombre es obligatoriio"],
        maxLength: [30, "El nombre no puede exceder los 30 caracteres"]
    },
    price:{
        type:Number,
        required: [true, "El precio es obligatorio"],
        default: 0.0
    },
    descryption:{
       type:String,
         required: [true, "La descripcion es obligatoria"]
    },
    stock:{
        type: Number,
        required: [true, "La cantidad en stock es obligatoria"],
    },
    sold:{
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    image:{
        type: String
    }
},{
    versionKey: false
});

export default model('Product', productSchema);