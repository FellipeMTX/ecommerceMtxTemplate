import { createSlice } from '@reduxjs/toolkit'
import { productDummyData } from '@/assets/assets'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: productDummyData,
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
        },
        addProduct: (state, action) => {
            // Newest first so it shows up at the top of "Latest Products".
            state.list = [action.payload, ...state.list]
        },
        clearProduct: (state) => {
            state.list = []
        }
    }
})

export const { setProduct, addProduct, clearProduct } = productSlice.actions

export default productSlice.reducer
