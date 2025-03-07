import { Schema, model } from "mongoose";

const buySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    invoicePath: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

export default model("Buy", buySchema);