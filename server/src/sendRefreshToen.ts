import { Response } from 'express'

export const sendRefreshtoken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    // this will send a cookie just for this path.
    path: '/refresh_token'
  })
}