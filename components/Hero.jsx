'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-6 max-w-7xl mx-auto my-10'>
                {/* Main feature — dark ink → violet gradient, tech look */}
                <div className='relative flex-1 flex flex-col justify-between overflow-hidden rounded-3xl xl:min-h-105 group bg-gradient-to-br from-ink via-brand-dark to-brand shadow-soft'>
                    <div className='p-7 sm:p-14 relative z-10'>
                        <div className='inline-flex items-center gap-3 bg-white/10 text-white pr-4 p-1 rounded-full text-xs sm:text-sm backdrop-blur-sm'>
                            <span className='bg-brand px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs font-medium'>NEW</span>
                            Free shipping on all US orders
                            <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </div>
                        <h1 className='text-3xl sm:text-5xl leading-[1.15] my-4 font-bold text-white max-w-xs sm:max-w-md'>
                            Smart gadgets. <br /> Prices you&apos;ll trust.
                        </h1>
                        <p className='text-white/70 text-sm max-w-sm'>The latest phones, audio and wearables — curated and shipped fast.</p>
                        <div className='text-white text-sm font-medium mt-6'>
                            <p className='text-white/60'>Starting from</p>
                            <p className='text-3xl font-bold'>{currency}4.90</p>
                        </div>
                        <button className='bg-white text-ink text-sm font-semibold py-3 px-9 sm:py-3.5 sm:px-12 mt-6 rounded-full hover:bg-brand-tint hover:scale-[1.03] active:scale-95 transition'>Shop Now</button>
                    </div>
                    <Image className='sm:absolute bottom-0 right-0 md:right-8 w-full sm:max-w-sm drop-shadow-2xl' src={assets.hero_model_img} alt="" />
                </div>

                {/* Side promo cards */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-6 w-full xl:max-w-sm text-sm'>
                    <div className='flex-1 flex items-center justify-between w-full bg-surface border border-line rounded-3xl p-7 px-8 group hover:shadow-soft transition'>
                        <div>
                            <p className='text-2xl font-semibold text-ink max-w-40'>Best sellers</p>
                            <p className='flex items-center gap-1 mt-4 text-brand font-medium'>View more <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <Image className='w-32' src={assets.hero_product_img1} alt="" />
                    </div>
                    <div className='flex-1 flex items-center justify-between w-full bg-brand-tint border border-brand/15 rounded-3xl p-7 px-8 group hover:shadow-soft transition'>
                        <div>
                            <p className='text-2xl font-semibold text-brand-dark max-w-40'>20% discounts</p>
                            <p className='flex items-center gap-1 mt-4 text-brand font-medium'>View more <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <Image className='w-32' src={assets.hero_product_img2} alt="" />
                    </div>
                </div>
            </div>
            <CategoriesMarquee />
        </div>

    )
}

export default Hero
