import prisma from '../prisma'
import { Movie } from '../models/Movie'

function mapPrismaToMovie(row: any): Movie {
  return {
    id: row.id,
    title: row.title,
    year: row.year,
    genre: row.genre,
    rating: row.rating,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

export async function getAll(): Promise<Movie[]> {
  const rows = await prisma.movie.findMany()
  return rows.map(mapPrismaToMovie)
}

export async function getById(id: string): Promise<Movie | undefined> {
  const row = await prisma.movie.findUnique({ where: { id } })
  if (!row) return undefined
  return mapPrismaToMovie(row)
}

export async function create(movie: Movie): Promise<Movie> {
  const row = await prisma.movie.create({
    data: {
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      rating: movie.rating,
    },
  })
  return mapPrismaToMovie(row)
}

export async function update(id: string, data: Partial<Movie>): Promise<Movie | undefined> {
  try {
    const row = await prisma.movie.update({ where: { id }, data: { ...data } as any })
    return mapPrismaToMovie(row)
  } catch (err: any) {
    return undefined
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    await prisma.movie.delete({ where: { id } })
    return true
  } catch (err: any) {
    return false
  }
}
