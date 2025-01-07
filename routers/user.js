import {Router} from "express"
import { getAllUsers, getUserById, addUser_signUp, updateUserDetails,getUserByUsernamePassword_Login,updateUserPassword } from "../controllers/user.js"

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser_signUp);
router.post("/login", getUserByUsernamePassword_Login)
router.put("/:id", updateUserDetails);
router.put("/:id/password", updateUserPassword);


export default router;
