import React, { useContext } from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useContext(CartContext);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3 className="h3">Your Cart ({cartCount})</h3>
          <button onClick={onClose} className="close-btn"><X size={24} /></button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <p className="text-muted">Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img-wrapper" style={{ backgroundColor: '#eaeaea', width: '80px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-title-row">
                    <h4>{item.name}</h4>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button>
                  </div>
                  <p className="text-muted text-sm">{item.color}</p>
                  <div className="cart-item-price-row">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <span className="cart-item-price">${item.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer glass">
          <div className="subtotal">
            <span>Subtotal</span>
            <span className="price">${cartTotal}</span>
          </div>
          <p className="shipping-note text-muted text-sm">Shipping & taxes calculated at checkout.</p>
          <button className="btn btn-primary checkout-btn" disabled={cart.length === 0}>
            Proceed to Checkout <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
