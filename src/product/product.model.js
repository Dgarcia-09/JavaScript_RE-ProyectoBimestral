import {Schema, model} from "mongoose";

const productSchema = Schema({
    name:{
        type:String,
        required: [true, "El nombre es obligatoriio"],
        maxLength: [30, "El nombre no puede exceder los 30 caracteres"]
    },
})