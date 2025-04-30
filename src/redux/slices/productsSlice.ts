import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  codigo: number
  nombre: string
  descripcion: string
  cantidad: number
  creacion: string
}

export interface ProductsState {
  products: Product[]
}

const initialState: ProductsState = { products: [] }

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   reset: (state) => { state.products = [] },
    addProduct: (state, action: PayloadAction<Omit<Product, 'creacion'>>) => {
      const newProduct: Product = {
        ...action.payload,
        creacion: new Date().toISOString(),
      }
      state.products.push(newProduct)
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.codigo !== action.payload)
    },
  },
})

export const { reset, addProduct, removeProduct } = productsSlice.actions
export default productsSlice.reducer
