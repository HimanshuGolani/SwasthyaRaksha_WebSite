import express from "express";
import path from "path";
import router from "./routes/user-routes.js";
import presRouter from "./routes/pres-routes.js";
import connectDataBase from "./Database/database.js";
import labRrouter from "./routes/labR-routes.js";
import HealthPRouter from "./routes/HealthP-router.js";
import AppointmentsRouter from "./routes/Appoinments-router.js";
import cors from "cors";
import "dotenv/config";

const app = express();

// Using middleware
app.use(express.json());
app.use(cors());

// Setting routes
app.use("/api/user", router);
app.use("/api/prescription", presRouter);
app.use("/api/labR", labRrouter);
app.use("/api/healthprofiles", HealthPRouter);
app.use("/api/appointments", AppointmentsRouter);

// Serve static files from the React app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "build")));

// Connecting to DB
connectDataBase();

// The "catchall" handler: for any request that doesn't
// match one above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
