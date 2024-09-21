import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WarehouseList from './pages/WarehouseList';
import WarehouseDetails from './pages/WarehouseDetails';
import SavedWarehouses from './pages/SavedWarehouses';
import Recents from './pages/Recents';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      {/* Navbar will appear on all pages */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Define the Routes */}
      <Routes>
        <Route path="/" element={<WarehouseList searchQuery={searchQuery} />} />
        <Route path="/warehouse/:id" element={<WarehouseDetails />} />
        <Route path="/saved" element={<SavedWarehouses />} />
        <Route path="/recently-visited" element={<Recents />} /> {/* Add Recents page route */}
      </Routes>
    </Router>
  );
}
export default App;
