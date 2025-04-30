import React, { Suspense, lazy } from 'react'
import '@/index.css'

const CreateProduct = lazy(() => import('@/components/global/CreateProduct'))
const ProductList = lazy(() => import('@/components/global/ProductList'))

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-card p-8 rounded-lg shadow">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
          Administrador de Productos
        </h1>
        <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
          <CreateProduct />
          <ProductList />
        </Suspense>
      </div>
    </div>
  )
}

export default App
