'use client'
import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {

    const router = useRouter();

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <nav className="relative bg-white sticky top-0 z-30">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                    <Link href="/" className="relative text-3xl font-bold text-ink tracking-tight">
                        gadgets<span className="text-brand text-4xl leading-0">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-5 lg:gap-8 text-sm font-medium text-muted">
                        <Link href="/" className="hover:text-brand transition">Home</Link>
                        <Link href="/shop" className="hover:text-brand transition">Products</Link>
                        <Link href="/" className="hover:text-brand transition">About</Link>
                        <Link href="/" className="hover:text-brand transition">Blog</Link>
                        <Link href="/" className="hover:text-brand transition">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-surface px-4 py-2.5 rounded-full border border-line focus-within:border-brand/40 transition">
                            <Search size={18} className="text-muted" />
                            <input className="w-full bg-transparent outline-none placeholder-muted/70" type="text" placeholder="Search gadgets" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-muted hover:text-brand transition">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-2 -right-2 text-[10px] font-semibold text-white bg-brand min-w-4.5 h-4.5 px-1 flex items-center justify-center rounded-full">{cartCount}</span>
                        </Link>

                        <button className="flex items-center gap-2 px-6 py-2.5 bg-brand hover:bg-brand-dark transition text-white text-sm font-medium rounded-full shadow-soft-sm">
                            <User size={16} /> Login
                        </button>

                    </div>

                    {/* Mobile actions */}
                    <div className="flex items-center gap-4 sm:hidden">
                        <Link href="/cart" className="relative text-muted">
                            <ShoppingCart size={22} />
                            <span className="absolute -top-2 -right-2 text-[10px] font-semibold text-white bg-brand min-w-4.5 h-4.5 px-1 flex items-center justify-center rounded-full">{cartCount}</span>
                        </Link>
                        <button className="px-6 py-1.5 bg-brand hover:bg-brand-dark text-sm transition text-white rounded-full">
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <hr className="border-line" />
        </nav>
    )
}

export default Navbar
