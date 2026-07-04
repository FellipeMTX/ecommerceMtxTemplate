'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, description, visibleButton = true, href = '' }) => {

    return (
        <div className='flex flex-col items-center text-center'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-ink'>{title}</h2>
            <div className='flex items-center gap-5 text-sm text-muted mt-3'>
                <p className='max-w-lg text-center'>{description}</p>
                {visibleButton && (
                    <Link href={href} className='text-brand font-medium flex items-center gap-1 whitespace-nowrap hover:gap-2 transition-all'>
                        View more <ArrowRight size={14} />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Title
