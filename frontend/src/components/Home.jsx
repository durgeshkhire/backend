import React from 'react';
import Navbar from './Navbar';

const menCategories = [
  { name: 'Backpacks', img: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=600' },
  { name: 'Briefcases', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
  { name: 'Duffle Bags', img: 'https://images.unsplash.com/photo-1550850839-8dc894ed385a?auto=format&fit=crop&q=80&w=600' }
];

const womenCategories = [
  { name: 'Totes', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600' },
  { name: 'Crossbody', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' },
  { name: 'Clutches', img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=600' }
];

export default function Home({ onNavigate, products = [] }) {
  // Dynamically extract categories from products
  const getCategories = (tag) => {
    const cats = {};
    products.filter(p => p.category === tag).forEach(p => {
      if (!cats[p.subcategory]) {
        cats[p.subcategory] = p.img;
      }
    });
    return Object.entries(cats).map(([name, img]) => ({ name, img }));
  };

  const dynamicMenCats = getCategories('MEN');
  const dynamicWomenCats = getCategories('WOMEN');

  const menCats = dynamicMenCats.length > 0 ? dynamicMenCats : menCategories;
  const womenCats = dynamicWomenCats.length > 0 ? dynamicWomenCats : womenCategories;

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100vw' }}>
      <Navbar onNavigate={onNavigate} />
      
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div style={{ animation: 'zoomIn 1.2s ease-out forwards' }}>
            <h1 style={styles.heroTitle}>Discover Your Signature Carry.</h1>
            <p style={styles.heroSubtitle}>Premium craftsmanship meets modern functionality. Find the perfect bag for your journey.</p>
            <button style={styles.shopButton} onClick={() => onNavigate('category_collections')}>Shop New Arrivals</button>
          </div>
        </div>
      </div>

      {/* Category Section: Men */}
      <section style={styles.section}>
        <h2 style={{...styles.sectionTitle, animation: 'slideUp 0.8s ease-out forwards'}}>Men's Categories</h2>
        <div style={styles.grid}>
          {menCats.map((cat, idx) => (
            <div 
              key={cat.name} 
              className="hover-lift"
              style={{...styles.card, animation: `slideUp 0.8s ease-out ${0.2 + idx * 0.1}s forwards`, opacity: 0}} 
              onClick={() => onNavigate('category_mens')}
            >
              <img src={cat.img} alt={cat.name} style={styles.cardImg} className="card-image-zoom" />
              <div style={styles.cardLabel}>{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Section: Women */}
      <section style={styles.section}>
        <h2 style={{...styles.sectionTitle, animation: 'slideUp 0.8s ease-out forwards'}}>Women's Categories</h2>
        <div style={styles.grid}>
          {womenCats.map((cat, idx) => (
            <div 
              key={cat.name} 
              className="hover-lift"
              style={{...styles.card, animation: `slideUp 0.8s ease-out ${0.2 + idx * 0.1}s forwards`, opacity: 0}} 
              onClick={() => onNavigate('category_womens')}
            >
              <img src={cat.img} alt={cat.name} style={styles.cardImg} className="card-image-zoom" />
              <div style={styles.cardLabel}>{cat.name}</div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer style={styles.footer}>
        <h2 style={{fontSize: '24px', letterSpacing: '-1px', marginBottom: '16px'}}>GlamBags</h2>
        <p style={{color: '#94a3b8'}}>© 2026 GlamBags Inc. Designed for premium journeys.</p>
      </footer>
    </div>
  );
}

const styles = {
  hero: {
    height: '70vh',
    minHeight: '500px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&q=80&w=1600")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
  },
  heroOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    padding: '0 20px'
  },
  heroTitle: {
    fontSize: '64px',
    fontWeight: 800,
    marginBottom: '20px',
    letterSpacing: '-1.5px',
    textShadow: '0 4px 12px rgba(0,0,0,0.3)'
  },
  heroSubtitle: {
    fontSize: '22px',
    fontWeight: 400,
    marginBottom: '40px',
    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
    maxWidth: '600px'
  },
  shopButton: {
    padding: '18px 40px',
    backgroundColor: 'white',
    color: '#0f172a',
    border: 'none',
    borderRadius: '100px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease',
  },
  section: {
    padding: '80px 60px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 800,
    marginBottom: '40px',
    color: '#0f172a',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '16px',
    letterSpacing: '-0.5px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px'
  },
  card: {
    position: 'relative',
    height: '450px',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  cardLabel: {
    position: 'absolute',
    bottom: '24px',
    left: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    padding: '16px 32px',
    borderRadius: '12px',
    fontWeight: 700,
    fontSize: '18px',
    color: '#0f172a',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  footer: {
    backgroundColor: '#0f172a',
    color: 'white',
    textAlign: 'center',
    padding: '60px 40px',
    marginTop: '60px'
  }
};
