import express from "express";
import {
  createAppointments,
  getAppointments,
  sendMail,
} from "../controllers/AppoinmentsController.js";

const AppointmentsRouter = express.Router();

AppointmentsRouter.get("/:id", getAppointments);
AppointmentsRouter.post("/create", createAppointments);
AppointmentsRouter.post("/setReminderMail", sendMail);

export default AppointmentsRouter;
