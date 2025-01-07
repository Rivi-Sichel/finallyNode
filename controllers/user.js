import { userModel } from "../models/user.js";

//פונקציה שמציגה את כל המשתמשים באתר (בלי הסיסמא)
export async function getAllUsers(req, res) {
    try {
        let data = await userModel.find().select('-userPassword');
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot find all users", message: err.message });
    }
}

//פונקציה שמציגה משתמש לפי האידי
//כמובן בלי הסיסמא שלו
export async function getUserById(req, res) {
    let { id } = req.params;
    try {
        let data = await userModel.findById(id).select('-userPassword');
        if (!data)
            return res.status(404).json({ title: "cannot find user with this id", message: "user with this id not found" });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get user by id", message: err.message });
    }
}

//פונקציה שמוסיפה משתמש לאחסון
export async function addUser_signUp(req, res) {
    if (!req.body.userName || !req.body.userEmail ||
        !req.body.userRole || !req.body.userPhone)
        return res.status(400).json({ title: "missing details", message: "name, id, email, role, phone and register date are missing" });
    try {
        let newUser = new userModel(req.body);
        await newUser.save();
        res.json(newUser);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot add user", message: err.message })
    }
}
//פונקציה שמעדכנת פרטי משתמש (חוץ מסיסמא)
export async function updateUserDetails(req, res) {
    let { id } = req.params;
    const { userPassword, ...updateData } = req.body;
    try {
        let data = await userModel.findByIdAndUpdate(id, updateData, { new: true }).select('-userPassword');
        if (!data)
            return res.status(404).json({ title: "cannot find by id", message: "user with such id not found" });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ title: "cannot find by id", message: "user with such id not found" });
    }
}

//פונקציה שמעדכנת סיסמא ע"פ משתמש
export async function updateUserPassword(req, res) {
    let { id } = req.params;
    const { userPassword } = req.body;
    if (!userPassword) {
        return res.status(400).json({ title: "missing password", message: "Password is required" });
    }
    try {
        let data = await userModel.findByIdAndUpdate(id, { userPassword }, { new: true }).select('-userPassword');
        if (!data) {
            return res.status(404).json({ title: "cannot find by id", message: "user with such id not found" });
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update password", message: err.message });
    }
}

//פונקציה שמחזירה משתמש ע"פ השם משתמש והסיסמא
export async function getUserByUsernamePassword_Login(req, res) {
    try {
        let data = await userModel.findOne({ userPassword: req.body.userPassword, userName: req.body.userName }).select('-userPassword');
        if (!data)
            return res.status(404).json({ title: "cannot find user with such details", message: "wrong username or password" });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot log in user", message: err.message });
    }
}


