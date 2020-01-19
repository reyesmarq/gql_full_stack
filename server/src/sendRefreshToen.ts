import { Response } from 'express'

export const sendRefreshtoken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true
  })
}