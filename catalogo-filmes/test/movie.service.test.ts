import { describe, it, expect } from 'vitest'
import * as movieService from '../src/services/movie.service'

const hasDb = !!process.env.DATABASE_URL

describe('movie.service', () => {
  if (!hasDb) {
    it('skip - DATABASE_URL not set', () => {
      expect(true).toBe(true)
    })
    return
  }

  it('cria, lê e remove um filme', async () => {
    const payload = { title: `Teste ${Date.now()}`, year: 2020, genre: 'Drama', rating: 8 }
    const created = await movieService.createMovie(payload)
    expect(created).toHaveProperty('id')

    const all = await movieService.getAllMovies()
    const found = all.find((m) => m.id === created.id)
    expect(found).toBeDefined()

    const removed = await movieService.deleteMovie(created.id)
    expect(removed).toBe(true)
  })
})
