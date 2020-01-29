import React from 'react'
import { Link } from 'react-router-dom'
import { useUsersQuery } from '../generated/graphql'

interface Props { }

export const Home: React.FC<Props> = () => {
  /**
   * Fetch policy
   * is not going to read form the cache, is going to go 
   * to the server every time
   */
  const { data } = useUsersQuery({ fetchPolicy: 'network-only' })

  if (!data) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div> users: </div>
      <ul>
        {
          data.users.map(user => {
            return <li key={user.id}>{user.email}, {user.id}</li>
          })
        }
      </ul>
    </div>
  )
}