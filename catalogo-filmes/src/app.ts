import express from "express";
import cors from "cors";
import filmesRoutes from "./routes/filmesRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(filmesRoutes);

export default app;