import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import warehouses from '../assets/warehouses.json';

const WarehouseDetails = () => {
  const { id } = useParams();
  const warehouse = warehouses.find((w) => w.id === parseInt(id));

  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/random?query=warehouse&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`);
        setImageUrl(response.data.urls.regular);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, []);

  if (!warehouse) {
    return <div>Warehouse not found</div>;
  }

  return (
    <div className="warehouse-details-card">
      {isLoading && <div className="loading">Loading...</div>}
      {imageUrl && (
        <img 
          src={imageUrl}
          alt={warehouse.name}
          className="warehouse-image"
        />
      )}

      <div className="warehouse-details-content" style={{ display: isLoading ? 'none' : 'block' }}>
        <h2>{warehouse.name}</h2>
        <div className="warehouse-info">
          <p><strong>City:</strong> {warehouse.city}</p>
          <p><strong>Type:</strong> {warehouse.type}</p>
          <p><strong>Cluster:</strong> {warehouse.cluster}</p>
          <p><strong>Registered:</strong> {warehouse.is_registered ? 'Yes' : 'No'}</p>
          <p><strong>Live:</strong> {warehouse.is_live ? 'Yes' : 'No'}</p>
          <p><strong>Space Available:</strong> {warehouse.space_available}</p>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetails;
