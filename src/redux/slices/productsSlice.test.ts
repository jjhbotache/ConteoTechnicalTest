import productsReducer, { addProduct, removeProduct } from './productsSlice'
import { ProductsState, Product } from './productsSlice'

describe('products slice', () => {
  it('should return the initial state', () => {
    const initial = { products: [] }
    expect(productsReducer(undefined, { type: '@@INIT' })).toEqual(initial)
  })

  it('should handle addProduct', () => {
    const previousState: ProductsState = { products: [] }
    const productData = { codigo: 1, nombre: 'Test', descripcion: 'Desc', cantidad: 5 }
    const nextState = productsReducer(previousState, addProduct(productData))

    expect(nextState.products).toHaveLength(1)
    const added = nextState.products[0]
    expect(added).toMatchObject(productData)
    expect(new Date(added.creacion).getTime()).not.toBeNaN()
  })

  it('should handle removeProduct', () => {
    const p1: Product = { codigo: 1, nombre: 'A', descripcion: '', cantidad: 1, creacion: new Date().toISOString() }
    const p2: Product = { codigo: 2, nombre: 'B', descripcion: '', cantidad: 2, creacion: new Date().toISOString() }
    const previousState: ProductsState = { products: [p1, p2] }
    const nextState = productsReducer(previousState, removeProduct(1))

    expect(nextState.products).toHaveLength(1)
    expect(nextState.products[0].codigo).toBe(2)
  })
})
