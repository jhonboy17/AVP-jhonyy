import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import { getProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.get("/perfil", authMiddleware, getProfile);
router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
	return res.status(200).json({
		message: "Área administrativa acessada com sucesso",
		user: req.user
	});
});

export default router;
