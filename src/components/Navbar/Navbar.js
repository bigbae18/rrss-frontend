import './Navbar.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <Link to="/" className="navbar-a">Home</Link>
            <Link to="/register" className="navbar-a">Register</Link>
            <Link to="/login" className="navbar-a">Login</Link>
        </div>
    )
}

export default Navbar