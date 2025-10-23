import { Request, Response } from 'express'
import * as movieService from '../services/movie.service'

export async function list(req: Request, res: Response) {
  const movies = await movieService.getAllMovies()
  res.json(movies)
}

export async function get(req: Request, res: Response) {
  const movie = await movieService.getMovieById(req.params.id)
  if (!movie) return res.status(404).json({ error: 'Filme não encontrado' })
  res.json(movie)
}

export async function create(req: Request, res: Response) {
  try {
    const newMovie = await movieService.createMovie(req.body)
    res.status(201).json(newMovie)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export async function update(req: Request, res: Response) {
  const updated = await movieService.updateMovie(req.params.id, req.body)
  if (!updated) return res.status(404).json({ error: 'Filme não encontrado' })
  res.json(updated)
}

export async function remove(req: Request, res: Response) {
  const deleted = await movieService.deleteMovie(req.params.id)
  if (!deleted) return res.status(404).json({ error: 'Filme não encontrado' })
  res.status(204).send()
}
