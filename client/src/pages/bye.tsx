import React from 'react'
import { useByeQuery } from '../generated/graphql'

interface  Props { }

export const Bye: React.FC<Props> = () => {
  const { data, error, loading } = useByeQuery({
    // every time we visit this page, we going to do a new request to get the data
    fetchPolicy: 'network-only'
  })

  if (loading) {
    return <div>loading...</div>
  }
  
  if (error) {
    console.log(error)
    return <div>err</div>
  }

  if (!data) {
    return <div>no data</div>
  }

  return (<div>{data.bye}</div>)
}