import express from "express";
import { login } from "../controllers/auth.js";

// Allows express to identify the routes that need to be configured
const router = express.Router();

// "/auth" from index.js will be prefixed onto login
router.post("/login", login);

export default router;