import express from "express";
import { getFilmes, addFilme, updateFilme, deleteFilme } from "../controllers/filmeController";

const router = express.Router();

router.get("/filmes", getFilmes);
router.post("/filmes", addFilme);
router.put("/filmes/:id", updateFilme);
router.delete("/filmes/:id", deleteFilme);

export default router;