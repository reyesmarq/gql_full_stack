import React from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery } from './generated/graphql'

interface Props { }

export const Header: React.FC<Props> = () => {
  // network only, always request from server
  const { data } = useMeQuery({fetchPolicy: 'network-only'})
  
  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/bye">bye</Link>
      </div>
      {
        data && data.me
          ? (<div>You are logged in as: {data.me.email}</div>)
          : null
      }
    </header>
  )
}