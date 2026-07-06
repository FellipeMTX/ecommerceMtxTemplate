'use client'
import { addToCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { makeCartKey } from "@/lib/features/cart/cartUtils";
import { useDispatch, useSelector } from "react-redux";

const Counter = ({ productId, variant = null }) => {

    const { cartItems } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const key = makeCartKey(productId, variant);
    const quantity = cartItems[key]?.quantity || 0;

    const addToCartHandler = () => {
        dispatch(addToCart({ productId, variant }))
    }

    const removeFromCartHandler = () => {
        dispatch(removeFromCart({ productId, variant }))
    }

    return (
        <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 max-sm:text-sm text-slate-600">
            <button onClick={removeFromCartHandler} className="p-1 select-none">-</button>
            <p className="p-1">{quantity}</p>
            <button onClick={addToCartHandler} className="p-1 select-none">+</button>
        </div>
    )
}

export default Counter
