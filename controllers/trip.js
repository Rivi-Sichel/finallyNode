import { tripModel } from "../models/trip.js";

//פונקציה שמחזירה את כל הטיולים
export async function gatAll(req, res) {
    try {
        let data = await tripModel.find();
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get all", message: err.message })
    }
}
//פונקציה שמחזירה טיול לפי אידי
export async function getById(req, res) {
    let id = req.params.id;
    try {
        let data = await tripModel.findById(id)
        if (!data)
            return res.status(404).json({ title: "id not find", message: "cannot find any trip with such id" })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot get all", message: err.message })
    }
}
//פונקציה שמוסיפה טיול
export async function add(req, res) {
    let body = req.body;
    if (!body.price || !body.name)
        return res.status(404).json({ title: "missing parameters", message: "price and name are missing" })
    try {
        let d = new tripModel(body)
        await d.save()
        res.json(d)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot add", message: err.message })
    }

}

//פונקציה שמעדכנת טיול לפי האידי
export async function update(req, res) {
    let id = req.params.id;
    try {
        let data = await tripModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!data)
            return res.status(404).json({ title: "cannot find by id", message: "user with such id not found" })
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update by id", message: err.message })
    }
}


//פונקציה שמוחקת טיול ע"י האידי
export async function deleteById(req, res) {
    let id = req.params.id;
    try {
        let data = await tripModel.findByIdAndDelete(id)
        if (!data)
            return res.status(404).json({ title: "id not found", message: "cannot find any trip by id" })
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update by id", message: err.message })

    }
}




