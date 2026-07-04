'use client'
import { StarIcon, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { addToCart } from '@/lib/features/cart/cartSlice'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const dispatch = useDispatch()

    // calculate the average rating of the product
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

    const handleAdd = (e) => {
        e.preventDefault()
        dispatch(addToCart({ productId: product.id }))
        toast.success('Added to cart')
    }

    return (
        <div className='group w-full sm:w-60 bg-white border border-line rounded-2xl p-3 hover:shadow-soft hover:border-brand/20 transition duration-300'>
            <Link href={`/product/${product.id}`} className='block'>
                <div className='relative bg-surface h-44 sm:h-56 rounded-xl flex items-center justify-center overflow-hidden'>
                    <Image width={500} height={500} className='max-h-32 sm:max-h-44 w-auto group-hover:scale-110 transition duration-300' src={product.images[0]} alt={product.name} />
                    <button
                        onClick={handleAdd}
                        aria-label='Add to cart'
                        className='absolute bottom-3 right-3 size-10 flex items-center justify-center bg-brand text-white rounded-full shadow-soft-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-brand-dark active:scale-95 transition-all'
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
                <div className='px-1 pt-3'>
                    <div className='flex items-center gap-0.5'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon key={index} size={13} className='text-transparent' fill={rating >= index + 1 ? "#FFC750" : "#E7EBEE"} />
                        ))}
                        <span className='text-xs text-muted ml-1'>({product.rating.length})</span>
                    </div>
                    <p className='text-sm font-medium text-ink mt-1.5 truncate'>{product.name}</p>
                    <p className='text-base font-semibold text-brand mt-1'>{currency}{product.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard
