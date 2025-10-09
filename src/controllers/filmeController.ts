import { Request, Response } from "express";
import { Filme } from "../models/filme";
import fs from "fs";
import path from "path";
import { z } from "zod";

const filePath = path.join(__dirname, "../data/filmes.json");

const filmeSchema = z.object({
  titulo: z.string(),
  ano: z.number(),
  genero: z.string(),
  avaliacao: z.number().min(0).max(10),
});

function lerFilmes(): Filme[] {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function salvarFilmes(filmes: Filme[]) {
  fs.writeFileSync(filePath, JSON.stringify(filmes, null, 2));
}

export const getFilmes = (req: Request, res: Response) => {
  res.json(lerFilmes());
};

export const addFilme = (req: Request, res: Response) => {
  const result = filmeSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error);

  const filmes = lerFilmes();
  const novoFilme: Filme = { id: Date.now(), ...req.body };
  filmes.push(novoFilme);
  salvarFilmes(filmes);
  res.status(201).json(novoFilme);
};

export const updateFilme = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = filmeSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error);

  const filmes = lerFilmes();
  const index = filmes.findIndex(f => f.id === id);
  if (index === -1) return res.status(404).json({ erro: "Filme não encontrado" });

  filmes[index] = { id, ...req.body };
  salvarFilmes(filmes);
  res.json(filmes[index]);
};

export const deleteFilme = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const filmes = lerFilmes();
  const novosFilmes = filmes.filter(f => f.id !== id);
  salvarFilmes(novosFilmes);
  res.json({ mensagem: "Filme removido" });
};