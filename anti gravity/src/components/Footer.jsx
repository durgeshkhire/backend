import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Component, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h2 className="h3">AURA</h2>
          <p className="text-muted" style={{ marginTop: '1rem', maxWidth: '300px' }}>
            Elevate your everyday with our premium collection of meticulously crafted leather & canvas bags.
          </p>
          <div className="social-links">
            <a href="#"><Camera size={20} /></a>
            <a href="#"><Component size={20} /></a>
            <a href="#"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">Shop</h4>
          <ul>
            <li><Link to="/shop?category=new">New Arrivals</Link></li>
            <li><Link to="/shop?category=women">Women's Collection</Link></li>
            <li><Link to="/shop?category=men">Men's Collection</Link></li>
            <li><Link to="/shop?category=travel">Travel</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">Support</h4>
          <ul>
            <li><Link to="/info?section=contact">Contact Us</Link></li>
            <li><Link to="/info?section=shipping">Shipping & Returns</Link></li>
            <li><Link to="/info?section=care">Care Guide</Link></li>
            <li><Link to="/info?section=faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4 className="footer-title">Stay in the Loop</h4>
          <p className="text-muted" style={{ marginBottom: '1rem' }}>
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="container">
        <div className="footer-bottom">
          <p className="text-muted">&copy; {new Date().getFullYear()} AURA Premium Bags. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
