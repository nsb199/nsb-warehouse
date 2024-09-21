import React, { useState, useEffect } from 'react';
import WarehouseCard from '../components/WarehouseCard';
import warehouses from '../assets/warehouses.json'; // Import your JSON data
import Footer from '../components/Footer';

const WarehouseList = ({ searchQuery }) => {
  const [filteredWarehouses, setFilteredWarehouses] = useState(warehouses);
  const [filters, setFilters] = useState({
    city: '',
    cluster: '',
    registered: '',
    live: '',
    space: '',
  });

  // Get unique cities, clusters from JSON data
  const cities = [...new Set(warehouses.map(w => w.city))];
  const clusters = [...new Set(warehouses.map(w => w.cluster))];

  useEffect(() => {
    let results = warehouses;

    // Search by query (search all fields)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(w => 
        w.name.toLowerCase().includes(query) ||
        w.city.toLowerCase().includes(query) ||
        w.cluster.toLowerCase().includes(query) ||
        w.type.toLowerCase().includes(query) ||
        w.space_available.toString().includes(query)
      );
    }

    // Filter by city
    if (filters.city) {
      results = results.filter(w => w.city === filters.city);
    }

    // Filter by cluster
    if (filters.cluster) {
      results = results.filter(w => w.cluster === filters.cluster);
    }

    // Filter by registered status (compare as boolean)
    if (filters.registered !== '') {
      results = results.filter(w => w.is_registered === (filters.registered === 'true'));
    }

    // Filter by live status (compare as boolean)
    if (filters.live !== '') {
      results = results.filter(w => w.is_live === (filters.live === 'true'));
    }

    // Filter by space available
    if (filters.space !== '') {
      const spaceValue = parseInt(filters.space, 10);
      results = results.filter(w => w.space_available >= spaceValue);
    }

    setFilteredWarehouses(results);
  }, [searchQuery, filters]);

  return (
    <div className="warehouse-list">
      {/* Filters */}
      <div className="filter-container">
        
        <select 
          value={filters.city} 
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select 
          value={filters.cluster} 
          onChange={(e) => setFilters({ ...filters, cluster: e.target.value })}
        >
          <option value="">All Clusters</option>
          {clusters.map(cluster => (
            <option key={cluster} value={cluster}>{cluster}</option>
          ))}
        </select>

        <select 
          value={filters.registered} 
          onChange={(e) => setFilters({ ...filters, registered: e.target.value })}
        >
          <option value="">Registered Status</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select 
          value={filters.live} 
          onChange={(e) => setFilters({ ...filters, live: e.target.value })}
        >
          <option value="">Live Status</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select 
          value={filters.space} 
          onChange={(e) => setFilters({ ...filters, space: e.target.value })}
        >
          <option value="">Space Available</option>
          <option value="500">500+ sq ft</option>
          <option value="1000">1000+ sq ft</option>
          <option value="2000">2000+ sq ft</option>
          <option value="5000">5000+ sq ft</option>
        </select>

        <button onClick={() => setFilters({ city: '', cluster: '', registered: '', live: '', space: '' })}>
          Clear Filters
        </button>
      </div>

      {/* Warehouse Cards */}
      <div className="warehouse-grid">
        {filteredWarehouses.length > 0 ? (
          filteredWarehouses.map((warehouse) => (
            <WarehouseCard key={warehouse.id} warehouse={warehouse} />
          ))
        ) : (
          <p>No warehouses found matching the criteria.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WarehouseList;

