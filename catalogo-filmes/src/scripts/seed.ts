import path from 'path'
import fs from 'fs/promises'
import prisma from '../prisma'

async function main() {
  // Tentamos dois caminhos: primeiro na pasta do subprojeto, depois na raiz do repo
  const candidatePaths = [
    path.resolve(__dirname, '../../data/movies.json'),
    path.resolve(__dirname, '../../../data/movies.json'),
  ]

  let dataPath: string | undefined
  let raw: string | undefined
  for (const p of candidatePaths) {
    try {
      raw = await fs.readFile(p, 'utf8')
      dataPath = p
      break
    } catch (e) {
      // ignora e tenta próximo
    }
  }

  if (!raw || !dataPath) {
    throw new Error(`Arquivo de seed não encontrado. Procurei em: ${candidatePaths.join(', ')}`)
  }

  console.log('Lendo arquivo de seed em', dataPath)
  const movies = JSON.parse(raw) as Array<any>

  console.log(`Preparando para inserir ${movies.length} filmes...`)

  for (const m of movies) {
    try {
      const created = await prisma.movie.create({
        data: {
          title: m.title,
          year: Number(m.year),
          genre: m.genre,
          rating: Number(m.rating),
        },
      })
      console.log('Inserido:', created.title)
    } catch (err: any) {
      console.error('Erro ao inserir', m.title, err?.message || err)
    }
  }

  console.log('Seed concluído. Desconectando Prisma...')
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
