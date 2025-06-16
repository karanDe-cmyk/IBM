import React from 'react'

export default function Header({ product }) {
    return (
        <>
           <h3>{product.name}</h3>
           <p>Price: {product.price}</p>
           <p>Category: {product.category}</p>
        </>
    )
}
