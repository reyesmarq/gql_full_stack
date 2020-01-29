import React, { useState, useEffect } from 'react'
import { Routes } from './Routes'
import { setAccessToken } from './accessToken'

interface Props {}

export const App: React.FC<Props> = () => {
  // By default I'm going to be loading
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // using refresh token to get a new accesstoken
    fetch('http://localhost:4000/refresh_token', {
      method: 'post',
      // this way we going to get a new cookie
      credentials: 'include'
    })
      .then(async res => {
        const { accessToken } = await res.json()
        setAccessToken(accessToken)
        setLoading(false)
      })
  }, [])

  if (loading) {
    // loading animation
    return <div>loading...</div>
  }
  
  return <Routes />
}