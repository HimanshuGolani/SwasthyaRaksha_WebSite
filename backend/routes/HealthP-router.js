import express from "express";
import {
  getHealthProfile,
  createHealthProfile,
} from "../controllers/HealthProfile-controller.js";

const HealthPRouter = express.Router();

HealthPRouter.get("/:id", getHealthProfile);
HealthPRouter.post("/create", createHealthProfile);

export default HealthPRouter;
