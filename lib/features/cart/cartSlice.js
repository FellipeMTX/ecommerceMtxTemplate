import { createSlice } from '@reduxjs/toolkit'
import { makeCartKey } from './cartUtils'

// cartItems is keyed by a variation-aware cart key. Each entry is:
//   { productId, variant, quantity }
// where `variant` is null for simple products, or the selected combination.
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        total: 0,
        cartItems: {},
    },
    reducers: {
        addToCart: (state, action) => {
            const { productId, variant = null } = action.payload
            const key = makeCartKey(productId, variant)
            if (state.cartItems[key]) {
                state.cartItems[key].quantity++
            } else {
                state.cartItems[key] = { productId, variant, quantity: 1 }
            }
            state.total += 1
        },
        removeFromCart: (state, action) => {
            const { productId, variant = null, cartKey } = action.payload
            const key = cartKey || makeCartKey(productId, variant)
            const item = state.cartItems[key]
            if (!item) return
            item.quantity--
            state.total -= 1
            if (item.quantity <= 0) {
                delete state.cartItems[key]
            }
        },
        deleteItemFromCart: (state, action) => {
            const { productId, variant = null, cartKey } = action.payload
            const key = cartKey || makeCartKey(productId, variant)
            const item = state.cartItems[key]
            if (!item) return
            state.total -= item.quantity
            delete state.cartItems[key]
        },
        clearCart: (state) => {
            state.cartItems = {}
            state.total = 0
        },
    },
})

export const { addToCart, removeFromCart, clearCart, deleteItemFromCart } = cartSlice.actions

export default cartSlice.reducer
