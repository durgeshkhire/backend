import React from 'react';
import Navbar from './Navbar';
import { ShoppingBag } from 'lucide-react';

export default function ShopCategory({ title, products, onNavigate }) {

  const handleAction = () => {
    alert("Functionality triggered! E-commerce backend handles this action.");
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100vw' }}>
      <Navbar onNavigate={onNavigate} />
      
      <div style={styles.header}>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.subtitle}>Explore our exclusive collection tailored for your lifestyle.</p>
      </div>

      <div style={styles.container}>
        {Object.entries(
          products.reduce((acc, product) => {
            const cat = product.subcategory || 'All Items';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(product);
            return acc;
          }, {})
        ).map(([subcategory, categoryProducts]) => (
          <div key={subcategory} style={{ marginBottom: '80px' }}>
            {subcategory !== 'All Items' && (
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '32px', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px' }}>
                {subcategory}
              </h2>
            )}
            <div style={styles.grid}>
              {categoryProducts.map((product, idx) => (
                <div 
                  key={product.id} 
                  className="hover-lift"
                  style={{...styles.card, animation: `slideUp 0.8s ease-out ${idx * 0.1}s forwards`, opacity: 0}}
                >
                   <div style={styles.imageContainer} className="product-image-zoom-container">
                     {product.oldPrice && <span style={styles.saleBadge}>SALE</span>}
                     <img src={product.img} alt={product.name} style={styles.productImg} className="product-image-zoom" />
                   </div>
                   <div style={styles.cardBody}>
                      <div style={styles.cardTop}>
                        <h3 style={styles.productName}>{product.name}</h3>
                        <div style={styles.priceContainer}>
                          {product.oldPrice && <span style={styles.oldPrice}>{product.oldPrice}</span>}
                          <span style={styles.price}>{product.price}</span>
                        </div>
                      </div>
                      
                      <ul style={styles.descriptionList}>
                        {product.description.split('. ').filter(d => d).map((trait, idx) => (
                          <li key={idx} style={styles.descriptionItem}>{trait.replace('.', '')}</li>
                        ))}
                      </ul>

                      <button onClick={handleAction} style={styles.addToCartBtn} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#334155'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}>
                        <ShoppingBag size={18} />
                        Add to Cart
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <footer style={styles.footer}>
        <h2 style={{fontSize: '24px', letterSpacing: '-1px', marginBottom: '16px'}}>GlamBags</h2>
        <p style={{color: '#94a3b8'}}>© 2026 GlamBags Inc. Designed for premium journeys.</p>
      </footer>
    </div>
  );
}

const styles = {
  header: {
    padding: '80px 60px 40px',
    textAlign: 'center',
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0'
  },
  title: {
    fontSize: '48px',
    fontWeight: 800,
    color: '#0f172a',
    letterSpacing: '-1px',
    marginBottom: '16px'
  },
  subtitle: {
    color: '#64748b',
    fontSize: '18px'
  },
  container: {
    padding: '60px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '40px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
  },
  imageContainer: {
    position: 'relative',
    height: '350px',
    width: '100%'
  },
  saleBadge: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '100px',
    fontSize: '12px',
    fontWeight: 700,
    zIndex: 10
  },
  productImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  cardBody: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  productName: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#0f172a'
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  price: {
    fontSize: '20px',
    fontWeight: 800,
    color: '#6366f1'
  },
  oldPrice: {
    fontSize: '14px',
    color: '#94a3b8',
    textDecoration: 'line-through',
    marginBottom: '2px'
  },
  descriptionList: {
    margin: '0 0 24px 20px',
    padding: 0,
    color: '#475569',
    fontSize: '15px',
    lineHeight: '1.6',
    flex: 1
  },
  descriptionItem: {
    marginBottom: '6px'
  },
  addToCartBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#0f172a',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    transition: 'background 0.2s',
  },
  footer: {
    backgroundColor: '#0f172a',
    color: 'white',
    textAlign: 'center',
    padding: '60px 40px',
    marginTop: '60px'
  }
};
