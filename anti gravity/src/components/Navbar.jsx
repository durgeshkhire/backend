import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, UserCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ onOpenCart }) => {
  const { user } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="nav-logo h3">
          AURA
        </Link>

        {/* Desktop Links */}
        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link to="/shop?category=women" onClick={() => setIsMobileMenuOpen(false)}>Women</Link>
          <Link to="/shop?category=men" onClick={() => setIsMobileMenuOpen(false)}>Men</Link>
          <Link to={user ? "/profile" : "/auth"} className="mobile-only" onClick={() => setIsMobileMenuOpen(false)}>Account</Link>
        </div>

        {/* Action Icons */}
        <div className="nav-actions">
          <button className="icon-btn"><Search size={20} /></button>
          <Link to={user ? "/profile" : "/auth"} className="icon-btn desktop-only">
            {user ? <UserCheck size={20} /> : <User size={20} />}
          </Link>
          <button className="icon-btn cart-btn" onClick={onOpenCart}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
