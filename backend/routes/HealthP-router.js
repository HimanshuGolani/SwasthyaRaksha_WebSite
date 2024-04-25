import express from "express";
import {
  getHealthprofile,
  createHealthProfile,
} from "../controllers/HealthProfile-controller.js";

const HealthPRouter = express.Router();

HealthPRouter.get("/:id", getHealthprofile);
HealthPRouter.post("/create", createHealthProfile);

export default HealthPRouter;
