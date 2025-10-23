import { promises as fs } from 'fs'
import path from 'path'
import { Movie } from '../models/Movie'

const FILE_PATH = path.join(__dirname, '../../data/movies.json')

async function readData(): Promise<Movie[]> {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveData(movies: Movie[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true })
  await fs.writeFile(FILE_PATH, JSON.stringify(movies, null, 2), 'utf-8')
}

export async function getAll(): Promise<Movie[]> {
  return await readData()
}

export async function getById(id: string): Promise<Movie | undefined> {
  const movies = await readData()
  return movies.find((m) => m.id === id)
}

export async function create(movie: Movie): Promise<Movie> {
  const movies = await readData()
  movies.push(movie)
  await saveData(movies)
  return movie
}

export async function update(id: string, data: Partial<Movie>): Promise<Movie | undefined> {
  const movies = await readData()
  const index = movies.findIndex((m) => m.id === id)
  if (index === -1) return undefined

  movies[index] = { ...movies[index], ...data, updatedAt: new Date().toISOString() }
  await saveData(movies)
  return movies[index]
}

export async function remove(id: string): Promise<boolean> {
  const movies = await readData()
  const updated = movies.filter((m) => m.id !== id)
  if (updated.length === movies.length) return false
  await saveData(updated)
  return true
}
