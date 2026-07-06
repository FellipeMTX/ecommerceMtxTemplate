'use client'
import { useEffect, useRef, useState } from 'react'

/*
 * Apple-style scroll reveal. An element starts at opacity 0 + translateY(32px)
 * and eases up into place ONCE, when it scrolls into view (IntersectionObserver).
 * Pass `delay` (ms) to stagger siblings — e.g. a row of product cards.
 *
 * Nuances matched from apple.com/mac:
 *  - fade + rise together, ~30px, strong ease-out (settles, doesn't bounce)
 *  - fires once; scrolling back up does not re-hide it
 *  - respects prefers-reduced-motion (shows immediately, no motion)
 *  - progressive enhancement: the `.reveal` noscript rule (in app/layout.jsx)
 *    keeps content visible when JS is disabled
 */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        if (reduce || typeof IntersectionObserver === 'undefined') {
            setVisible(true)
            return
        }

        const io = new IntersectionObserver((entries, obs) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setVisible(true)
                    obs.unobserve(entry.target)
                }
            }
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })

        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <Tag
            ref={ref}
            style={{ transitionDelay: `${delay}ms`, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            className={`reveal transition duration-700 will-change-transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
        >
            {children}
        </Tag>
    )
}
