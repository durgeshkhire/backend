import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ShopCategory from './components/ShopCategory';
import Admin from './components/Admin';
import { menProducts, womenProducts, collectionProducts, saleProducts } from './data';
import { useEffect } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/bags/all');
        if (response.ok) {
          const data = await response.json();
          // Map backend schema to frontend schema
          const mappedData = data.map(item => ({
            id: item.id || Math.random().toString(36).substr(2, 9),
            name: item.nameOfBag,
            img: item.imageUrl,
            price: `₹${item.price.toLocaleString()}`,
            numericPrice: item.price,
            description: item.description,
            brand: item.brand,
            category: item.tags, // MEN, WOMEN, UNISEX
            subcategory: item.type, // HANDBAG, etc.
            stock: item.stock
          }));
          setAllProducts(mappedData);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products for views
  const dynamicMenProducts = allProducts.length > 0 ? allProducts.filter(p => p.category === 'MEN') : menProducts;
  const dynamicWomenProducts = allProducts.length > 0 ? allProducts.filter(p => p.category === 'WOMEN') : womenProducts;
  const dynamicCollectionProducts = allProducts.length > 0 ? allProducts.slice(0, 6) : collectionProducts;
  const dynamicSaleProducts = allProducts.length > 0 ? allProducts.filter(p => p.numericPrice < 2000) : saleProducts;

  if (currentView === 'home') {
    return <Home onNavigate={setCurrentView} products={allProducts.length > 0 ? allProducts : collectionProducts} />;
  }

  if (currentView === 'category_mens') {
    return <ShopCategory title="Men's Bags" products={dynamicMenProducts} onNavigate={setCurrentView} />;
  }

  if (currentView === 'category_womens') {
    return <ShopCategory title="Women's Bags" products={dynamicWomenProducts} onNavigate={setCurrentView} />;
  }

  if (currentView === 'category_collections') {
    return <ShopCategory title="Exclusive Collections" products={dynamicCollectionProducts} onNavigate={setCurrentView} />;
  }

  if (currentView === 'category_sale') {
    return <ShopCategory title="Sale Items" products={dynamicSaleProducts} onNavigate={setCurrentView} />;
  }

  if (currentView === 'admin') {
    return <Admin onNavigate={setCurrentView} />;
  }

  return (
    <div className="auth-layout">
      <main style={{ zIndex: 1, position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
        {currentView === 'login' ? (
          <Login onNavigate={setCurrentView} />
        ) : (
          <Register onNavigate={setCurrentView} />
        )}
      </main>
    </div>
  );
}

export default App;
