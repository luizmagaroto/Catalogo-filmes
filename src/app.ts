import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import filmeRoutes from "./routes/filmeRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", filmeRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});