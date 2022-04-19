import express from "express";
const router = express.Router();
import { getAllPatients } from "../controllers/patientController.js";

router.route("/").get(getAllPatients);

export default router;
