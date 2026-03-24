import express from "express";
import * as userController from "../controllers/userController.js";
import { checkUserExists } from "../middlewares/checkUserExists.js";
import { validateUserData } from "../middlewares/validateUserData.js";

const router = express.Router();

//middleware para executar em todos os routes
router.use(checkUserExists);

//Users routes
router.get("/", userController.getUsers);
router.get("/stats", userController.getStats);
router.post("/", validateUserData, userController.createUser);
router.put("/:id", validateUserData, userController.updateUser);
router.patch("/:id", userController.toggleUserActive);
router.delete("/:id", userController.deleteUser);

export default router;
