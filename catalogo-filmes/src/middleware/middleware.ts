import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Erro:', err)
  res.status(500).json({ error: 'Erro interno do servidor' })
}
