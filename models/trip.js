import { Schema, model } from "mongoose";
const tripSchema = Schema({
    name: String,
    city: String,
    price: Number,
    type: [String],
    img: String,
    count: Number,
    prodDate: { type: Date, default: new Date() }

})

export const tripModel = model("trip", tripSchema);
