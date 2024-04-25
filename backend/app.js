import express from "express";
import router from "./routes/user-routes.js";
import presRouter from "./routes/pres-routes.js";
import connectDataBase from "./Database/database.js";
import labRrouter from "./routes/labR-routes.js";
import HealthPRouter from "./routes/HealthP-router.js";
import cors from "cors";
import "dotenv/config";

// initiallizing instence of the app
const app = express();

// using middle wears
app.use(express.json());
app.use(cors());

// setting routes
app.use("/api/user", router);
app.use("/api/prescription", presRouter);
app.use("/api/labR", labRrouter);
app.use("/api/healthprofiles", HealthPRouter);

// connecting to Db
connectDataBase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running");
});

app.get("/", (req, res) => {
  res.send(`<h1>Hello you have hit me </h1>`);
});
