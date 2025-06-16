import React from 'react'

export default function UserList({user}) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.age}</p>
    </div>
  )
}
