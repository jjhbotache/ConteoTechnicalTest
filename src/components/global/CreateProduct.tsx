import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/slices/productsSlice';
import { Button } from '../ui/button';

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!codigo || isNaN(parseInt(codigo, 10))) {
      newErrors.codigo = 'El código debe ser un número válido';
    }
    if (!nombre) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    if (!cantidad || isNaN(parseInt(cantidad, 10))) {
      newErrors.cantidad = 'La cantidad debe ser un número válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const codeNum = parseInt(codigo, 10);
    const quantityNum = parseInt(cantidad, 10);
    dispatch(addProduct({ codigo: codeNum, nombre, descripcion, cantidad: quantityNum }));
    setCodigo('');
    setNombre('');
    setDescripcion('');
    setCantidad('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="codigo" className="block mb-1 font-semibold">Codigo</label>
          <input
            id="codigo"
            type="number"
            className={`w-full border rounded px-2 py-1 ${errors.codigo ? 'border-red-500' : ''}`}
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
            aria-describedby="codigo-error"
          />
          {errors.codigo && <p id="codigo-error" className="text-red-500 text-sm">{errors.codigo}</p>}
        </div>
        <div>
          <label htmlFor="nombre" className="block mb-1 font-semibold">Nombre</label>
          <input
            id="nombre"
            className={`w-full border rounded px-2 py-1 ${errors.nombre ? 'border-red-500' : ''}`}
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            aria-describedby="nombre-error"
          />
          {errors.nombre && <p id="nombre-error" className="text-red-500 text-sm">{errors.nombre}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="descripcion" className="block mb-1 font-semibold">Descripcion</label>
          <input
            id="descripcion"
            className="w-full border rounded px-2 py-1"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cantidad" className="block mb-1 font-semibold">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            className={`w-full border rounded px-2 py-1 ${errors.cantidad ? 'border-red-500' : ''}`}
            value={cantidad}
            onChange={e => setCantidad(e.target.value)}
            aria-describedby="cantidad-error"
          />
          {errors.cantidad && <p id="cantidad-error" className="text-red-500 text-sm">{errors.cantidad}</p>}
        </div>
      </div>
      <div>
        <Button type="submit">Agregar producto</Button>
      </div>
    </form>
  );
};

export default CreateProduct;