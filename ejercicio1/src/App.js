import React, { useState } from 'react';
import './App.css';
import productos from './data'


function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  const handleProductSelect = (productId) => {
    const selectedProduct = productos.find(product => product.id === productId);
    setSelectedProducts(prevProducts => [...prevProducts, selectedProduct]);
  }

  const handleUnitsChange = (productId, units) => {
    const updatedProducts = selectedProducts.map(product => {
      if (product.id === productId) {
        return { ...product, unidades: units };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  }

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      return total + (product.precio * (product.unidades || 0));
    }, 0);
  }

  return (
    <div className="App">
      <h1>Menú Desplegable de Productos</h1>
      <div className="product-list">
        <h2>Productos</h2>
        <select onChange={(e) => handleProductSelect(parseInt(e.target.value))}>
          <option value="">Selecciona un producto</option>
          {productos.map(product => (
            <option key={product.id} value={product.id}>{product.nombre} - ${product.precio}</option>
          ))}
        </select>
      </div>
      <div className="selected-products">
        <h2>Productos Seleccionados</h2>
        <ul>
          {selectedProducts.map(product => (
            <li key={product.id}>
              {product.nombre} - ${product.precio} 
              <input
                type="number"
                min="0"
  value={product.unidades >= 0 ? product.unidades : ''}
  onChange={e => handleUnitsChange(product.id, e.target.value)}
              /> unidades
            </li>
          ))}
        </ul>
        <div>Total: ${calculateTotal()}</div>
      </div>
    </div>
  );
}

export default App;
