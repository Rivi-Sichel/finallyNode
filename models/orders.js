import { Schema, model, Types } from "mongoose";

const orderSchema = Schema({
    orderDate: { type: Date, default: new Date() },
    orderUserId: {
        type: Types.ObjectId,
        ref: "user"
    },
    orderedTrip: [
        {
            tripId: {
                type: Types.ObjectId,
                ref: "trip"
            },
            quantity: { type: Number, required: true }  // כמות הכרטיסים שנרכשה לכל טיול
        }
    ],
    totalPrice: { type: Number, default: 0 },
    isPayed: { type: Boolean, default: false }
});

export const orderModel = model("order", orderSchema);
