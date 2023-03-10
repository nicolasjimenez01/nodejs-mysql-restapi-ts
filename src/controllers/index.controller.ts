//import { pool } from '../db'
import { Request, Response } from 'express'

export const ping = async(_ : Request, res: Response) => {
  res.json({
    "result": "Pong"
  })
}