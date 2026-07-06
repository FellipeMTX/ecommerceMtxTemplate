'use client'
import Link from 'next/link'
import { Smartphone, Laptop, Watch, Headphones, ArrowRightIcon } from 'lucide-react'
import Reveal from './Reveal'

const tiles = [
    { name: 'iPhone', tag: 'Pro. Beyond.', icon: Smartphone, from: 'from-ink', to: 'to-brand-dark' },
    { name: 'Mac', tag: 'Supercharged', icon: Laptop, from: 'from-brand', to: 'to-brand-dark' },
    { name: 'Watch', tag: 'A healthy leap', icon: Watch, from: 'from-[#0F0E17]', to: 'to-accent-pink' },
    { name: 'AirPods', tag: 'Sound in motion', icon: Headphones, from: 'from-accent-teal', to: 'to-ink' },
]

const CategoryTiles = () => {
    return (
        <div className='px-6 my-20 max-w-6xl mx-auto'>
            <Reveal className='flex items-end justify-between mb-10'>
                <div>
                    <h2 className='text-2xl sm:text-3xl font-semibold text-ink'>Shop by category</h2>
                    <p className='text-sm text-muted mt-2'>Find exactly what you&apos;re looking for.</p>
                </div>
                <Link href='/shop' className='hidden sm:flex items-center gap-1 text-sm font-medium text-brand'>
                    View all <ArrowRightIcon size={14} />
                </Link>
            </Reveal>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
                {tiles.map((t, i) => (
                    <Reveal key={i} delay={i * 90} className='h-full'>
                        <Link
                            href='/shop'
                            className={`group relative overflow-hidden rounded-2xl p-6 h-44 w-full flex flex-col justify-between text-white bg-gradient-to-br ${t.from} ${t.to} hover:shadow-soft transition`}
                        >
                            <t.icon size={30} className='opacity-90' />
                            <div>
                                <p className='text-lg font-semibold'>{t.name}</p>
                                <p className='text-xs text-white/70'>{t.tag}</p>
                            </div>
                            <ArrowRightIcon size={18} className='absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all' />
                        </Link>
                    </Reveal>
                ))}
            </div>
        </div>
    )
}

export default CategoryTiles
