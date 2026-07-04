'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { Truck, RotateCcw, Clock, ShieldCheck, Play } from 'lucide-react'

/*
 * Featured hero banner (dark). To feature a different product, swap:
 *   - FEATURED.image  (any transparent PNG from assets)
 *   - FEATURED.name / FEATURED.price
 */
const FEATURED = {
    image: assets.product_img4,
    name: ['Studio', 'Headphones'],
    price: 199,
}

const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'Free shipping on all US orders' },
    { icon: RotateCcw, title: '100% Money Back', desc: 'You have 10 days to return' },
    { icon: Clock, title: 'Support 24/7', desc: 'Contact us 24 hours a day' },
    { icon: ShieldCheck, title: '100% Payment Secure', desc: 'Your payment are safe with us' },
]

const HeroBanner = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <section className="bg-[#0F0E17] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Hero row */}
                <div className="grid lg:grid-cols-2 items-center gap-8 pt-12 lg:pt-16">
                    {/* Left copy */}
                    <div className="relative z-10 text-center lg:text-left">
                        <p className="text-white/60 text-lg">From {currency}{FEATURED.price}</p>
                        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] mt-3">
                            {FEATURED.name[0]}<br />{FEATURED.name[1]}
                        </h1>
                        <div className="flex items-center justify-center lg:justify-start gap-6 mt-10">
                            <Link
                                href="/shop"
                                className="bg-white text-ink font-semibold px-8 py-3.5 rounded-md hover:bg-brand-tint hover:scale-[1.03] active:scale-95 transition"
                            >
                                Buy Now
                            </Link>
                            <button className="flex items-center gap-3 text-white/80 hover:text-white transition">
                                <span className="size-9 rounded-full border border-white/30 flex items-center justify-center">
                                    <Play size={14} fill="currentColor" />
                                </span>
                                Watch Video
                            </button>
                        </div>
                    </div>

                    {/* Right product */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="size-72 sm:size-96 rounded-full bg-brand/25 blur-3xl" />
                        </div>
                        <Image
                            src={FEATURED.image}
                            alt="Featured product"
                            priority
                            className="relative w-full max-w-sm lg:max-w-md drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Feature strip */}
                <div className="relative z-10 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 mt-4 mb-12">
                    {features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <f.icon size={30} strokeWidth={1.5} className="shrink-0 text-white" />
                            <div>
                                <p className="font-semibold text-sm">{f.title}</p>
                                <p className="text-white/55 text-xs mt-0.5">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroBanner
