import React, { useState, useEffect } from 'react';
import WarehouseCard from '../components/WarehouseCard';

const Recents = () => {
  const [recentWarehouses, setRecentWarehouses] = useState([]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recentWarehouses')) || [];
    // Sort the recent warehouses to show the latest viewed first
    setRecentWarehouses(recent.reverse());
  }, []);

  return (
    <div className="warehouse-list">
      <h2>Recently Viewed Warehouses</h2>
      <div className="warehouse-grid">
        {recentWarehouses.length > 0 ? (
          recentWarehouses.map((warehouse) => (
            <WarehouseCard 
              key={warehouse.id} 
              warehouse={warehouse} 
            />
          ))
        ) : (
          <p>No recently viewed warehouses.</p>
        )}
      </div>
    </div>
  );
};

export default Recents;
