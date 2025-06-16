import React from 'react'

export default function ProfileCard({ name, age, image }) {
    return (
        <div>
            <h1>{name}</h1>
            <p>{age}</p>
            <img src={image} />
        </div>
    )
}
