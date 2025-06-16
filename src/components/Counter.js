import React from 'react'

export default function Counter({initial = 0, onClick}) {
  return (
    <div>
      <button onClick={onClick}>{initial}</button>
    </div>
  )
}
