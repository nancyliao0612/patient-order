import express from "express";
const router = express.Router();
import {
  getSinglePatientOrder,
  createPatientOrder,
  updatePatientOrder,
} from "../controllers/orderController.js";

router
  .route("/:id")
  .get(getSinglePatientOrder)
  .post(createPatientOrder)
  .patch(updatePatientOrder);

export default router;
