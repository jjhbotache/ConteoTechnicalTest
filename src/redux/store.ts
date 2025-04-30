import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'

// Load persisted products state from localStorage
const loadProductsState = () => {
  try {
    const serialized = localStorage.getItem('productsState')
    if (!serialized) return undefined
    return JSON.parse(serialized)
  } catch {
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  preloadedState: {
    products: loadProductsState(),
  },
})

// Persist products state to localStorage
store.subscribe(() => {
  try {
    const state = store.getState().products
    localStorage.setItem('productsState', JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save products state to localStorage:', error)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch