import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../utils/renderWithProviders'
import ProductList from '@/components/global/ProductList'
import { store } from '@/redux/store'
import { addProduct } from '@/redux/slices/productsSlice'

describe('ProductList', () => {
  beforeEach(() => {
    // Reset store state
    localStorage.clear()
    store.dispatch({ type: 'products/reset', payload: undefined })
  })

  it('displays empty message when no products', () => {
    renderWithProviders(<ProductList />)
    expect(screen.getByText(/no products available/i)).toBeInTheDocument()
  })

  it('renders a list of products', () => {
    // Add sample products
    store.dispatch(addProduct({ codigo: 1, nombre: 'Apple', descripcion: 'Fruit', cantidad: 10 }))
    store.dispatch(addProduct({ codigo: 2, nombre: 'Banana', descripcion: 'Fruit', cantidad: 5 }))

    renderWithProviders(<ProductList />)
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('filters products by name', async () => {
    store.dispatch(addProduct({ codigo: 1, nombre: 'Apple', descripcion: 'Fruit', cantidad: 10 }))
    store.dispatch(addProduct({ codigo: 2, nombre: 'Banana', descripcion: 'Fruit', cantidad: 5 }))

    renderWithProviders(<ProductList />)
    const input = screen.getByPlaceholderText(/filter by name/i)
    await userEvent.type(input, 'App')

    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.queryByText('Banana')).toBeNull()
  })

  it('deletes a product when clicking delete button', async () => {
    store.dispatch(addProduct({ codigo: 1, nombre: 'Apple', descripcion: 'Fruit', cantidad: 10 }))
    renderWithProviders(<ProductList />)
    const deleteBtn = screen.getByLabelText(/delete apple/i)
    await userEvent.click(deleteBtn)
    expect(screen.queryByText('Apple')).toBeNull()
  })

  it('sorts products by name', async () => {
    store.dispatch(addProduct({ codigo: 2, nombre: 'Banana', descripcion: 'Fruit', cantidad: 5 }))
    store.dispatch(addProduct({ codigo: 1, nombre: 'Apple', descripcion: 'Fruit', cantidad: 10 }))
    store.dispatch(addProduct({ codigo: 3, nombre: 'Cherry', descripcion: 'Fruit', cantidad: 7 }))

    renderWithProviders(<ProductList />)
    const select = screen.getByLabelText(/sort by/i)
    await userEvent.selectOptions(select, 'nombre')

    const items = screen.getAllByRole('listitem').map(li => li.textContent)
    expect(items).toEqual(['Apple', 'Banana', 'Cherry'])
  })

  it('sorts products by codigo', async () => {
    // Setup with mixed codes
    store.dispatch(addProduct({ codigo: 2, nombre: 'Prod2', descripcion: '', cantidad: 1 }))
    store.dispatch(addProduct({ codigo: 1, nombre: 'Prod1', descripcion: '', cantidad: 1 }))
    store.dispatch(addProduct({ codigo: 3, nombre: 'Prod3', descripcion: '', cantidad: 1 }))

    renderWithProviders(<ProductList />)
    const select = screen.getByLabelText(/sort by/i)
    await userEvent.selectOptions(select, 'codigo')

    const items = screen.getAllByRole('listitem').map(li => li.textContent)
    expect(items).toEqual(['Prod1', 'Prod2', 'Prod3'])
  })

  it('sorts products by cantidad', async () => {
    // Setup with varied quantities
    store.dispatch(addProduct({ codigo: 1, nombre: 'A', descripcion: '', cantidad: 5 }))
    store.dispatch(addProduct({ codigo: 2, nombre: 'B', descripcion: '', cantidad: 2 }))
    store.dispatch(addProduct({ codigo: 3, nombre: 'C', descripcion: '', cantidad: 8 }))

    renderWithProviders(<ProductList />)
    const select = screen.getByLabelText(/sort by/i)
    await userEvent.selectOptions(select, 'cantidad')

    const items = screen.getAllByRole('listitem').map(li => li.textContent)
    expect(items).toEqual(['B', 'A', 'C'])
  })

})