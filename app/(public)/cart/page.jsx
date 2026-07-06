'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { getVariantPrice, formatVariant, formatMoney } from "@/lib/features/cart/cartUtils";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);

    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        const array = [];
        let total = 0;
        for (const [cartKey, item] of Object.entries(cartItems)) {
            const product = products.find(product => product.id === item.productId);
            if (product) {
                const unitPrice = getVariantPrice(product, item.variant);
                array.push({
                    ...product,
                    cartKey,
                    variant: item.variant,
                    quantity: item.quantity,
                    unitPrice,
                });
                total += unitPrice * item.quantity;
            }
        }
        setCartArray(array);
        setTotalPrice(total);
    }

    const handleDeleteItemFromCart = (cartKey) => {
        dispatch(deleteItemFromCart({ cartKey }))
    }

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products]);

    return cartArray.length > 0 ? (
        <div className="min-h-screen mx-6 text-slate-800">

            <div className="max-w-7xl mx-auto ">
                {/* Title */}
                <PageTitle heading="My Cart" text="items in your cart" linkText="Add more" />

                <div className="flex items-start justify-between gap-5 max-lg:flex-col">

                    <table className="w-full max-w-4xl text-slate-600 table-auto">
                        <thead>
                            <tr className="max-sm:text-sm">
                                <th className="text-left">Product</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th className="max-md:hidden">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartArray.map((item) => (
                                    <tr key={item.cartKey} className="space-x-2">
                                        <td className="flex gap-3 my-4">
                                            <div className="flex gap-3 items-center justify-center bg-slate-100 size-18 rounded-md">
                                                <Image src={item.images[0]} className="h-14 w-auto" alt="" width={45} height={45} />
                                            </div>
                                            <div>
                                                <p className="max-sm:text-sm">{item.name}</p>
                                                {formatVariant(item.variant) ? (
                                                    <p className="text-xs text-slate-500">{formatVariant(item.variant)}</p>
                                                ) : (
                                                    <p className="text-xs text-slate-500">{item.category}</p>
                                                )}
                                                <p>{currency}{formatMoney(item.unitPrice)}</p>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Counter productId={item.id} variant={item.variant} />
                                        </td>
                                        <td className="text-center">{currency}{formatMoney(item.unitPrice * item.quantity)}</td>
                                        <td className="text-center max-md:hidden">
                                            <button onClick={() => handleDeleteItemFromCart(item.cartKey)} className=" text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all">
                                                <Trash2Icon size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <OrderSummary totalPrice={totalPrice} items={cartArray} />
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
            <h1 className="text-2xl sm:text-4xl font-semibold">Your cart is empty</h1>
        </div>
    )
}
