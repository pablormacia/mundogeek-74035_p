import { createSlice, current } from "@reduxjs/toolkit";
import products from '../../data/products.json'
import categories from '../../data/categories.json'

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        products,
        categories,
        categorySelected: "",
        productsFilteredByCategory: [],
        productSelected: {}
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.categorySelected = action.payload
            state.productsFilteredByCategory = products.filter(product => product.category === action.payload)
            //console.log(current(state).categorySelected)
        },
        filterProducts: (state) => {
            state.productsFilteredByCategory = products.filter(product => product.category.toLowerCase() === state.categorySelected.toLowerCase())
            //console.log(current(state).productsFilteredByCategory)
        },
        setProductSelected: (state,action) => {
            state.productSelected = action.payload
        }
    }
})

export const { setCategorySelected,filterProducts,setProductSelected } = shopSlice.actions

export default shopSlice.reducer