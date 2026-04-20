import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Heart, Share2, ShieldCheck, Truck } from 'lucide-react';
import toast from 'react-hot-toast';
import { PRODUCTS } from '../data/products';
import { CartContext } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === parseInt(id)) || PRODUCTS[0];
  
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="product-details-page container fade-in">
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-muted">
        <Link to="/">Home</Link> <ChevronRight size={14} />
        <Link to="/shop">Shop</Link> <ChevronRight size={14} />
        <span className="current">{product.name}</span>
      </div>

      <div className="product-layout">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="main-image-container">
            <img src={product.image} alt={product.name} className="main-image" />
          </div>
        </div>

        {/* Info */}
        <div className="product-info-panel">
          <div className="product-title-row">
            <h1 className="h2">{product.name}</h1>
            <button className="wishlist-btn"><Heart size={24} /></button>
          </div>
          <p className="price h3">${product.price}</p>
          
          <p className="description text-muted">{product.description}</p>

          <div className="actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button 
              className="btn btn-primary add-to-cart-btn"
              onClick={() => {
                addToCart(product, quantity);
                toast.success(`Added ${quantity} ${product.name} to cart!`);
              }}
            >
              Add to Cart
            </button>
          </div>

          <div className="perks bg-secondary">
            <div className="perk"><Truck size={20} /> <span>Free Shipping & Returns</span></div>
            <div className="perk"><ShieldCheck size={20} /> <span>Lifetime Warranty</span></div>
          </div>

          <div className="accordion">
            <div className="accordion-tabs">
              <button 
                className={activeTab === 'details' ? 'active' : ''} 
                onClick={() => setActiveTab('details')}
              >Details</button>
              <button 
                className={activeTab === 'dimensions' ? 'active' : ''} 
                onClick={() => setActiveTab('dimensions')}
              >Dimensions</button>
            </div>
            <div className="accordion-content text-muted text-sm">
              {activeTab === 'details' && (
                <ul>
                  <li>100% Full-grain European Leather</li>
                  <li>Solid brass hardware with gold finish</li>
                  <li>Interior zip pocket and slip pockets</li>
                  <li>Cotton twill lining</li>
                </ul>
              )}
              {activeTab === 'dimensions' && (
                <ul>
                  <li>Height: 14" (35 cm)</li>
                  <li>Width: 12" (30 cm)</li>
                  <li>Depth: 5.5" (14 cm)</li>
                  <li>Strap Drop: 10" (25 cm)</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
