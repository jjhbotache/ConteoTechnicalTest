import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'

export const renderWithProviders = (ui: ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>)
}