import React from 'react'

export default function Card({title, description, onClick, value}) {
  return (
    <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={onClick}>{value}</button>
    </div>
  )
}
