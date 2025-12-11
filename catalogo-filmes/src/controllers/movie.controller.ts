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
  const { title, year, genre, rating } = req.body
  if (!title || !genre || !year || rating === undefined) {
    return res.status(400).json({ error: 'Campos obrigatórios: title, year, genre, rating' })
  }

  if (typeof title !== 'string' || typeof genre !== 'string') {
    return res.status(400).json({ error: 'title e genre devem ser textos' })
  }

  const yearNum = Number(year)
  const ratingNum = Number(rating)
  if (Number.isNaN(yearNum) || Number.isNaN(ratingNum)) {
    return res.status(400).json({ error: 'year e rating devem ser numéricos' })
  }

  try {
    const newMovie = await movieService.createMovie({ title, year: yearNum, genre, rating: ratingNum })
    res.status(201).json(newMovie)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export async function update(req: Request, res: Response) {
  const data: any = {}
  const { title, year, genre, rating } = req.body
  if (title !== undefined) data.title = title
  if (genre !== undefined) data.genre = genre
  if (year !== undefined) data.year = Number(year)
  if (rating !== undefined) data.rating = Number(rating)

  const updated = await movieService.updateMovie(req.params.id, data)
  if (!updated) return res.status(404).json({ error: 'Filme não encontrado' })
  res.json(updated)
}

export async function remove(req: Request, res: Response) {
  const deleted = await movieService.deleteMovie(req.params.id)
  if (!deleted) return res.status(404).json({ error: 'Filme não encontrado' })
  res.status(204).send()
}
