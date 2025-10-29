import express from "express";
import "dotenv/config";
import routes from "./routes/index.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "./utils/db.js";
const app = express();

// Middlewares base
app.use(express.json());

// Rutas
app.use("/api", routes);

// Health simple
app.get("/", (_req, res) => res.json({ ok: true }));

// 404 y errores
app.use(notFound);
app.use(errorHandler);

export default app;