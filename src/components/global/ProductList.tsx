import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { removeProduct } from '@/redux/slices/productsSlice'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('none'); // Cambiar el valor inicial a 'none'

  const filtered = products.filter(p =>
    p.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  // Apply sorting
  const displayed = sortField !== 'none' // Cambiar la comparación para evitar el uso de una cadena vacía
    ? [...filtered].sort((a, b) => {
        switch (sortField) {
          case 'codigo': return a.codigo - b.codigo;
          case 'cantidad': return a.cantidad - b.cantidad;
          case 'creacion': return new Date(a.creacion).getTime() - new Date(b.creacion).getTime();
          case 'nombre': return a.nombre.localeCompare(b.nombre);
          default: return 0;
        }
      })
    : filtered;

  return (
    <div className="space-y-6 p-6 bg-card text-card-foreground rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <Select value={sortField} onValueChange={setSortField}>
          <SelectTrigger size="default" className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Ningún orden</SelectItem> {/* Cambiar el valor a 'none' */}
            <SelectItem value="codigo">Codigo</SelectItem>
            <SelectItem value="nombre">Nombre</SelectItem>
            <SelectItem value="cantidad">Cantidad</SelectItem>
            <SelectItem value="creacion">Creacion</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1">
          <Input
            placeholder="Filtrar por nombre"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="mt-1 w-full sm:w-64"
          />
        </div>
      </div>
      {displayed.length === 0 ? (
        <p className="text-center text-muted-foreground">No products available</p>
      ) : (
        <ul className="space-y-2">
          {displayed.map(p => (
            <li key={p.codigo} className="flex items-center justify-between bg-background p-4 rounded-md shadow-sm">
              <span className="font-medium">{p.nombre}</span>
              <Button
                variant="destructive"
                size="icon"
                aria-label={`Delete ${p.nombre}`}
                onClick={() => dispatch(removeProduct(p.codigo))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList