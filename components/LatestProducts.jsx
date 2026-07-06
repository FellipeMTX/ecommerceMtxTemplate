'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import Reveal from './Reveal'
import { useSelector } from 'react-redux'

const LatestProducts = () => {

    const displayQuantity = 4
    const products = useSelector(state => state.product.list)

    return (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            <Reveal>
                <Title title='Latest Products' description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`} href='/shop' />
            </Reveal>
            <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between'>
                {products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, displayQuantity).map((product, index) => (
                    <Reveal key={index} delay={(index % 4) * 80}>
                        <ProductCard product={product} />
                    </Reveal>
                ))}
            </div>
        </div>
    )
}

export default LatestProducts