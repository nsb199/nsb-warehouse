import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../assets/logo.png'; // Import your logo

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/"> {/* Make the logo a link to home */}
            <img src={logo} alt="Logo" className="logo-image" /> {/* Add a class for styling */}
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/saved">Saved</Link>
          <Link to="/recently-visited">Recents</Link>
        </div>
        <div className="navbar-search">
          <input 
            type="text"
            placeholder="Search Warehouses..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="hamburger" onClick={toggleSidebar}>
          &#9776; {/* Unicode for hamburger icon */}
        </div>
      </nav>

      {/* Side Panel */}
      <div className={`side-panel ${isOpen ? 'show' : ''}`}>
        <div className="close-btn" onClick={toggleSidebar}>
          &times; {/* Unicode for close icon */}
        </div>
        <div className="panel-links">
          <Link to="/" onClick={toggleSidebar}>Home</Link>
          <Link to="/saved" onClick={toggleSidebar}>Saved</Link>
          <Link to="/recently-visited" onClick={toggleSidebar}>Recently Viewed</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
