import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <div className="hero-text">
            <h1 className="h1">Elevate Your Everyday</h1>
            <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '400px' }}>
              Discover our exclusive collection of meticulously crafted leather bags designed for the modern aesthetic.
            </p>
            <Link to="/shop" className="btn btn-primary hero-btn">
              Explore Collection <ArrowRight size={20} />
            </Link>
          </div>
          <div className="hero-image-wrapper">
            <img src="/hero_bag_1776409871007.png" alt="Premium Leather Handbag" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories container">
        <div className="section-header">
          <h2 className="h2">Curated Collections</h2>
          <Link to="/shop" className="text-muted flex-link">View All Categories <ArrowRight size={16} /></Link>
        </div>
        <div className="category-grid">
          <Link to="/shop?category=women" className="category-card">
            <div className="category-image" style={{ backgroundImage: 'url(/product_minimal_tote_1776409900750.png)' }}></div>
            <div className="category-overlay">
              <h3 className="h3">Women's</h3>
            </div>
          </Link>
          <Link to="/shop?category=men" className="category-card">
            <div className="category-image" style={{ backgroundImage: 'url(/product_crossbody_1776409929059.png)' }}></div>
            <div className="category-overlay">
              <h3 className="h3">Men's</h3>
            </div>
          </Link>
          <Link to="/shop?category=travel" className="category-card">
            <div className="category-image" style={{ backgroundImage: 'url(/product_travel_duffel_1776409944831.png)' }}></div>
            <div className="category-overlay">
              <h3 className="h3">Travel</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="values bg-secondary">
        <div className="container values-grid">
          <div className="value-item">
            <h4 className="value-title">Premium Materials</h4>
            <p className="text-muted">Sourced ethically, designed to age beautifully over decades.</p>
          </div>
          <div className="value-item">
            <h4 className="value-title">Artisan Craftsmanship</h4>
            <p className="text-muted">Hand-stitched details ensuring durability and elegance.</p>
          </div>
          <div className="value-item">
            <h4 className="value-title">Lifetime Warranty</h4>
            <p className="text-muted">We stand behind every piece. Guaranteed for a lifetime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
