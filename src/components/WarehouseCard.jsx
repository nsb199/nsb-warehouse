import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WarehouseCard = ({ warehouse, onRemove }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedWarehouses = JSON.parse(localStorage.getItem('savedWarehouses')) || [];
    if (savedWarehouses.find(w => w.id === warehouse.id)) {
      setIsSaved(true);
    }
  }, [warehouse.id]);

  const handleSave = () => {
    const savedWarehouses = JSON.parse(localStorage.getItem('savedWarehouses')) || [];
    if (!savedWarehouses.find(w => w.id === warehouse.id)) {
      savedWarehouses.push(warehouse);
      localStorage.setItem('savedWarehouses', JSON.stringify(savedWarehouses));
      setIsSaved(true);
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 1500);
    }
  };

  const handleRemove = () => {
    const savedWarehouses = JSON.parse(localStorage.getItem('savedWarehouses')) || [];
    const updatedWarehouses = savedWarehouses.filter(w => w.id !== warehouse.id);
    localStorage.setItem('savedWarehouses', JSON.stringify(updatedWarehouses));
    setIsSaved(false);
  };

  const handleViewDetails = () => {
    const recentWarehouses = JSON.parse(localStorage.getItem('recentWarehouses')) || [];
    if (!recentWarehouses.find(w => w.id === warehouse.id)) {
      recentWarehouses.push(warehouse);
      localStorage.setItem('recentWarehouses', JSON.stringify(recentWarehouses));
    }
    navigate(`/warehouse/${warehouse.id}`);
  };

  return (
    <>
      <div className="warehouse-card">
        <h3>{warehouse.name}</h3>
        <p><strong>City:</strong> {warehouse.city}</p>
        <p><strong>Type:</strong> {warehouse.type}</p>
        <p><strong>Cluster:</strong> {warehouse.cluster}</p>
        <p><strong>Registered:</strong> {warehouse.is_registered ? 'Yes' : 'No'}</p>
        <p><strong>Live:</strong> {warehouse.is_live ? 'Yes' : 'No'}</p>
        
        <button onClick={handleViewDetails}>View</button>

        {isSaved ? (
          <button onClick={handleRemove}>Remove</button>
        ) : (
          <button onClick={handleSave}>Save</button>
        )}
      </div>

      {showSavedMessage && (
        <div className="saved-message-bubble">
          <p>Warehouse saved successfully!</p>
        </div>
      )}
    </>
  );
};

export default WarehouseCard;
