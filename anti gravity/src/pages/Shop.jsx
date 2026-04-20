import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { PRODUCTS } from '../data/products';
import { CartContext } from '../context/CartContext';
import './Shop.css';

const Shop = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'all';
  
  const { addToCart } = React.useContext(CartContext);
  const [activeCategory, setActiveCategory] = React.useState(initialCategory);
  const [sortOrder, setSortOrder] = React.useState('default');
  const [isSortOpen, setIsSortOpen] = React.useState(false);

  // Filter
  let filteredProducts = activeCategory === 'all' 
    ? [...PRODUCTS] 
    : PRODUCTS.filter(p => p.category === activeCategory);

  // Sort
  if (sortOrder === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleSortSelect = (val) => {
    setSortOrder(val);
    setIsSortOpen(false);
  };

  const getSortLabel = () => {
    switch(sortOrder) {
      case 'price-low': return 'Price: Low to High';
      case 'price-high': return 'Price: High to Low';
      case 'name': return 'Name: A-Z';
      default: return 'Sort By';
    }
  };

  return (
    <div className="shop-page container fade-in">
      <div className="shop-header">
        <h1 className="h1">The Collection</h1>
        <p className="text-muted">Explore our full range of premium bags.</p>
      </div>

      <div className="shop-controls">
        <div className="category-filters">
          <button className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All</button>
          <button className={`filter-btn ${activeCategory === 'women' ? 'active' : ''}`} onClick={() => setActiveCategory('women')}>Women</button>
          <button className={`filter-btn ${activeCategory === 'men' ? 'active' : ''}`} onClick={() => setActiveCategory('men')}>Men</button>
          <button className={`filter-btn ${activeCategory === 'travel' ? 'active' : ''}`} onClick={() => setActiveCategory('travel')}>Travel</button>
        </div>
        
        <div className="sort-dropdown">
          <button className="sort-btn" onClick={() => setIsSortOpen(!isSortOpen)}>
            {getSortLabel()} <ChevronDown size={16} />
          </button>
          {isSortOpen && (
            <div className="sort-menu">
              <button onClick={() => handleSortSelect('default')}>Default</button>
              <button onClick={() => handleSortSelect('price-low')}>Price: Low to High</button>
              <button onClick={() => handleSortSelect('price-high')}>Price: High to Low</button>
              <button onClick={() => handleSortSelect('name')}>Name: A-Z</button>
            </div>
          )}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <div className="product-img-wrapper">
              <img src={product.image} alt={product.name} className="product-img" />
              <button 
                className="quick-add-btn" 
                onClick={(e) => {
                  e.preventDefault(); 
                  addToCart(product, 1);
                  toast.success(`Added ${product.name} to cart!`);
                }}
              >
                Quick Add <ShoppingBag size={14} style={{marginLeft: '0.25rem'}}/>
              </button>
            </div>
            <div className="product-info">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">${product.price}</p>
            </div>
            <p className="product-color text-muted">{product.color}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
