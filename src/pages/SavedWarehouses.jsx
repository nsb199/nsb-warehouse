import React, { useState, useEffect } from 'react';
import WarehouseCard from '../components/WarehouseCard';

const SavedWarehouses = () => {
  const [savedWarehouses, setSavedWarehouses] = useState([]);

  // Fetch saved warehouses from localStorage on component load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedWarehouses')) || [];
    setSavedWarehouses(saved);
  }, []);

  // Handle removing warehouse from saved list
  const handleRemove = (id) => {
    const updatedWarehouses = savedWarehouses.filter((warehouse) => warehouse.id !== id);
    setSavedWarehouses(updatedWarehouses);
    localStorage.setItem('savedWarehouses', JSON.stringify(updatedWarehouses));
  };

  return (
    <div className="warehouse-list">
      <h2>Saved Warehouses</h2>
      <div className="warehouse-grid">
        {savedWarehouses.length > 0 ? (
          savedWarehouses.map((warehouse) => (
            <WarehouseCard 
              key={warehouse.id} 
              warehouse={warehouse} 
              onRemove={() => handleRemove(warehouse.id)} 
            />
          ))
        ) : (
          <p>No warehouses saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedWarehouses;
