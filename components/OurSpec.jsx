import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {

    return (
        <div className='px-6 my-24 max-w-6xl mx-auto'>
            <Title visibleButton={false} title='Why shop with us' description="Top-tier service and convenience to keep your shopping smooth, secure and completely hassle-free." />

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-16'>
                {
                    ourSpecsData.map((spec, index) => {
                        return (
                            <div className='relative bg-surface-2 border border-line px-8 py-10 flex flex-col items-center justify-center w-full text-center rounded-2xl group hover:shadow-soft hover:-translate-y-1 transition duration-300' key={index}>
                                <div className='size-12 flex items-center justify-center rounded-xl text-white bg-brand group-hover:scale-105 transition' style={{ backgroundColor: spec.accent }}>
                                    <spec.icon size={22} />
                                </div>
                                <h3 className='text-ink font-semibold mt-5'>{spec.title}</h3>
                                <p className='text-sm text-muted mt-2'>{spec.description}</p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default OurSpecs
