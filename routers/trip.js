import { Router } from "express";
import { gatAll, getById, add, update, deleteById } from "../controllers/trip.js"

const router = Router();

router.get("/", gatAll);
router.get("/:id", getById);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", deleteById)

export default router;
