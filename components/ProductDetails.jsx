'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { getVariantPrice, getVariantMrp, makeCartKey, formatMoney } from "@/lib/features/cart/cartUtils";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const router = useRouter()

    const [mainImage, setMainImage] = useState(product.images[0]);

    const hasVariations = Array.isArray(product.variations) && product.variations.length > 0;

    // Default each variation group to its first option.
    const [selectedOptions, setSelectedOptions] = useState(() => {
        const init = {};
        (product.variations || []).forEach((group) => {
            init[group.name] = group.options[0]?.label;
        });
        return init;
    });

    const variant = hasVariations ? selectedOptions : null;

    const price = getVariantPrice(product, variant);
    const mrp = getVariantMrp(product, variant);
    const cartKey = makeCartKey(productId, variant);
    const inCart = Boolean(cart[cartKey]);
    const savePercent = mrp > 0 && mrp > price ? Math.round((mrp - price) / mrp * 100) : 0;

    const selectOption = (groupName, label) => {
        setSelectedOptions((prev) => ({ ...prev, [groupName]: label }));
    };

    const addToCartHandler = () => {
        dispatch(addToCart({ productId, variant }))
    }

    const averageRating = product.rating.length
        ? product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length
        : 0;

    const formatDelta = (delta) => {
        if (!delta) return null;
        const sign = delta > 0 ? '+' : '-';
        return `${sign}${currency}${Math.abs(delta)}`;
    };

    return (
        <div className="flex max-lg:flex-col gap-12">
            <div className="flex max-sm:flex-col-reverse gap-3">
                <div className="flex sm:flex-col gap-3">
                    {product.images.map((image, index) => (
                        <div key={index} onClick={() => setMainImage(product.images[index])} className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer">
                            <Image src={image} className="group-hover:scale-103 group-active:scale-95 transition" alt="" width={45} height={45} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center h-100 sm:size-113 bg-slate-100 rounded-lg ">
                    <Image src={mainImage} alt="" width={250} height={250} />
                </div>
            </div>
            <div className="flex-1">
                <h1 className="text-3xl font-semibold text-slate-800">{product.name}</h1>
                <div className='flex items-center mt-2'>
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                    ))}
                    <p className="text-sm ml-3 text-slate-500">{product.rating.length} Reviews</p>
                </div>
                <div className="flex items-start my-6 gap-3 text-2xl font-semibold text-slate-800">
                    <p> {currency}{formatMoney(price)} </p>
                    {mrp > price && (
                        <p className="text-xl text-slate-500 line-through">{currency}{formatMoney(mrp)}</p>
                    )}
                </div>
                {savePercent > 0 && (
                    <div className="flex items-center gap-2 text-slate-500">
                        <TagIcon size={14} />
                        <p>Save {savePercent}% right now</p>
                    </div>
                )}

                {/* Variation selectors */}
                {hasVariations && (
                    <div className="flex flex-col gap-6 mt-8">
                        {product.variations.map((group) => (
                            <div key={group.name}>
                                <p className="text-sm font-semibold text-slate-800 mb-2">
                                    {group.name}
                                    <span className="text-slate-400 font-normal ml-2">{selectedOptions[group.name]}</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {group.options.map((option) => {
                                        const isSelected = selectedOptions[group.name] === option.label;
                                        const delta = formatDelta(option.priceDelta);
                                        return (
                                            <button
                                                type="button"
                                                key={option.label}
                                                onClick={() => selectOption(group.name, option.label)}
                                                aria-pressed={isSelected}
                                                className={`px-4 py-2 rounded-lg border text-sm transition active:scale-95 ${isSelected ? 'border-brand bg-brand/5 text-brand font-medium' : 'border-slate-200 text-slate-600 hover:border-slate-400'}`}
                                            >
                                                {option.label}
                                                {delta && <span className="ml-1.5 text-xs text-slate-400">{delta}</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-end gap-5 mt-10">
                    {
                        inCart && (
                            <div className="flex flex-col gap-3">
                                <p className="text-lg text-slate-800 font-semibold">Quantity</p>
                                <Counter productId={productId} variant={variant} />
                            </div>
                        )
                    }
                    <button onClick={() => !inCart ? addToCartHandler() : router.push('/cart')} className="bg-brand text-white px-10 py-3 text-sm font-medium rounded-full hover:bg-brand-dark active:scale-95 transition shadow-soft-sm">
                        {!inCart ? 'Add to Cart' : 'View Cart'}
                    </button>
                </div>
                <hr className="border-gray-300 my-5" />
                <div className="flex flex-col gap-4 text-slate-500">
                    <p className="flex gap-3"> <EarthIcon className="text-slate-400" /> Free shipping worldwide </p>
                    <p className="flex gap-3"> <CreditCardIcon className="text-slate-400" /> 100% Secured Payment </p>
                    <p className="flex gap-3"> <UserIcon className="text-slate-400" /> Trusted by top brands </p>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails
