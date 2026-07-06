import React from 'react'
import Reveal from './Reveal'

const Newsletter = () => {
    return (
        <div className='mx-6 my-28'>
            <Reveal className='relative overflow-hidden max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-ink via-brand-dark to-brand px-6 py-16 flex flex-col items-center text-center shadow-soft'>
                <h2 className='text-2xl sm:text-3xl font-bold text-white'>Don&apos;t miss our news</h2>
                <p className='max-w-lg text-sm text-white/70 mt-3'>Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week.</p>
                <div className='flex bg-white/10 border border-white/20 text-sm p-1 rounded-full w-full max-w-xl mt-8 backdrop-blur-sm'>
                    <input className='flex-1 pl-5 bg-transparent text-white placeholder-white/60 outline-none' type="text" placeholder='Enter your email address' />
                    <button className='font-semibold bg-white text-ink px-7 py-3 rounded-full hover:bg-brand-tint hover:scale-[1.03] active:scale-95 transition'>Subscribe</button>
                </div>
            </Reveal>
        </div>
    )
}

export default Newsletter
