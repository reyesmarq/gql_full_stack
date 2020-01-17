/**
 * This file is for typescript autocompletion purposes
 */

import { Response, Request } from 'express'

export interface MyContext {
  req: Request
  res: Response
  payload?: { userId: string }
}