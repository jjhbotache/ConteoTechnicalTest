import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../utils/renderWithProviders'
import CreateProduct from '@/components/global/CreateProduct'
import ProductList from '@/components/global/ProductList'
import { store } from '@/redux/store'
import { reset } from '@/redux/slices/productsSlice'

describe('CreateProduct', () => {
  beforeEach(() => {
    localStorage.clear()
    store.dispatch(reset())
  })

  it('renders form fields', () => {
    renderWithProviders(<CreateProduct />)
    expect(screen.getByLabelText(/codigo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descripcion/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cantidad/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add product/i })).toBeInTheDocument()
  })

  it('creates a product and displays in list', async () => {
    renderWithProviders(<>
      <CreateProduct />
      <ProductList />
    </>)

    await userEvent.type(screen.getByLabelText(/codigo/i), '5')
    await userEvent.type(screen.getByLabelText(/nombre/i), 'TestProduct')
    await userEvent.type(screen.getByLabelText(/descripcion/i), 'Desc')
    await userEvent.type(screen.getByLabelText(/cantidad/i), '3')
    await userEvent.click(screen.getByRole('button', { name: /add product/i }))

    expect(screen.getByText('TestProduct')).toBeInTheDocument()
  })
})