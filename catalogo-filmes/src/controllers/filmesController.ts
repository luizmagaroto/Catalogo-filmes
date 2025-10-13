import { Request, Response } from "express";
import { Filme } from "../models/filme";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/filmes.json");

const lerFilmes = (): Filme[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const salvarFilmes = (filmes: Filme[]) => {
  fs.writeFileSync(filePath, JSON.stringify(filmes, null, 2));
};

export const listarFilmes = (req: Request, res: Response) => {
  res.json(lerFilmes());
};

export const adicionarFilme = (req: Request, res: Response) => {
  const filmes = lerFilmes();
  const novoFilme: Filme = { id: Date.now(), ...req.body };
  filmes.push(novoFilme);
  salvarFilmes(filmes);
  res.status(201).json(novoFilme);
};

export const atualizarFilme = (req: Request, res: Response) => {
  const filmes = lerFilmes();
  const id = Number(req.params.id);
  const index = filmes.findIndex(f => f.id === id);
  if (index === -1) return res.status(404).send("Filme não encontrado");
  filmes[index] = { ...filmes[index], ...req.body };
  salvarFilmes(filmes);
  res.json(filmes[index]);
};

export const deletarFilme = (req: Request, res: Response) => {
  const filmes = lerFilmes();
  const id = Number(req.params.id);
  const novosFilmes = filmes.filter(f => f.id !== id);
  salvarFilmes(novosFilmes);
  res.status(204).send();
};