import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import routes from './routes'
import { errorHandler } from './middleware/middleware'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())

app.use('/api', routes)
app.use(errorHandler)

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000
app.listen(PORT, () => console.log(`🎬 Servidor rodando em http://localhost:${PORT}/api/movies`))
