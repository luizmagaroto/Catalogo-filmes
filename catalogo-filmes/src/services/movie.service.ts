import { Movie } from '../models/Movie'
import * as persistence from './persistence.service'

export async function createMovie(data: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> {
  const movies = await persistence.getAll()
  const exists = movies.some((m) => m.title.toLowerCase() === data.title.toLowerCase())
  if (exists) throw new Error(`Filme "${data.title}" já está cadastrado.`)

  const newMovie: Movie = {
    ...data,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return await persistence.create(newMovie)
}

export async function getAllMovies(): Promise<Movie[]> {
  return await persistence.getAll()
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
  return await persistence.getById(id)
}

export async function updateMovie(id: string, data: Partial<Movie>): Promise<Movie | undefined> {
  return await persistence.update(id, data)
}

export async function deleteMovie(id: string): Promise<boolean> {
  return await persistence.remove(id)
}
