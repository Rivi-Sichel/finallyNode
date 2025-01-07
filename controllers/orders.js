import { orderModel } from "../models/orders.js";
import { tripModel } from "../models/trip.js";
import mongoose from 'mongoose';

//פונקציה שמחזירה את כל ההזמנות
export async function gatAll(req, res) {
    try {
        let data = await orderModel.find();
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get all", message: err.message })
    }
}

//פונקציה שמחזירה הזמנה לפי אידי
export async function getById(req, res) {
    let id = req.params.id;
    try {
        let data = await orderModel.findById(id)
        if (!data)
            return res.status(404).json({ title: "id not find", message: "cannot find any order with such id" })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot get all", message: err.message })
    }
}

//פונקציה שמוסיפה טיול לאדם
export async function add(req, res) {
    let body = req.body;
    if (!body.orderUserId || !body.orderedTrip || body.orderedTrip.length === 0) {
        return res.status(404).json({
            title: "missing parameters",
            message: "orderUserId and orderedTrip are required"
        });
    }
    try {
        let totalPrice = 0;

        // חישוב המחיר הכולל של ההזמנה
        for (let trip of body.orderedTrip) {
            let tripId = new mongoose.Types(trip.tripId);

            let tripDetails = await tripModel.findById(tripId); 
            if (!tripDetails) {
                return res.status(404).json({
                    title: "trip not found",
                    message: `Trip with id ${trip.tripId} not found`
                });
            }
            totalPrice += tripDetails.price * trip.quantity;
        }
        body.totalPrice = totalPrice;
        let order = new orderModel(body);
        await order.save();

        res.json(order); 
    } catch (err) {
        console.log(err);
        res.status(400).json({
            title: "cannot add order",
            message: err.message
        });
    }
}

//פונקציה שמעדכנת את פרטי הטיול למשתמש
export async function update(req, res) {
    let id = req.params.id;
    try {
        let data = await orderModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!data)
            return res.status(404).json({ title: "cannot find by id", message: "user with such id not found" })
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update by id", message: err.message })
    }
}

//פונקציה שמקבלת אי די של טיול ללקוח ומוחקת
export async function deleteById(req, res) {
    let id = req.params.id;
    try {
        let data = await orderModel.findByIdAndDelete(id)
        if (!data)
            return res.status(404).json({ title: "id not found", message: "cannot find any trip by id" })
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update by id", message: err.message })

    }
}




