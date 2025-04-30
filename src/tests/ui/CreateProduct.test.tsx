import '@testing-library/jest-dom'
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
    const { getByLabelText, getByRole } = renderWithProviders(<CreateProduct />)
    expect(getByLabelText(/codigo/i)).toBeInTheDocument()
    expect(getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(getByLabelText(/descripcion/i)).toBeInTheDocument()
    expect(getByLabelText(/cantidad/i)).toBeInTheDocument()
    expect(getByRole('button', { name: /add product/i })).toBeInTheDocument()
  })

  it('creates a product and displays in list', async () => {
    const { getByLabelText, getByRole, getByText } = renderWithProviders(<>
      <CreateProduct />
      <ProductList />
    </>)

    await userEvent.type(getByLabelText(/codigo/i), '5')
    await userEvent.type(getByLabelText(/nombre/i), 'TestProduct')
    await userEvent.type(getByLabelText(/descripcion/i), 'Desc')
    await userEvent.type(getByLabelText(/cantidad/i), '3')
    await userEvent.click(getByRole('button', { name: /add product/i }))

    expect(getByText('TestProduct')).toBeInTheDocument()
  })
})