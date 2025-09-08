import React from 'react'
import './ProductCard.css'

export default function ProductCard(props) {
  return (
    <div className='productCard'>
        <h1>{props.name}</h1>
        <p>{props.price}</p>
        <img className='productImage' src={props.image} />
        <br />
        <button>Add to Cart</button>
    </div>
  )
}
