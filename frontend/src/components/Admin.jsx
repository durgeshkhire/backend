import React, { useState } from 'react';
import Navbar from './Navbar';
import { Package, Tag, DollarSign, Image as ImageIcon, Ruler, Box, Type } from 'lucide-react';

export default function Admin({ onNavigate }) {
  const [formData, setFormData] = useState({
    nameOfBag: '',
    description: '',
    brand: '',
    price: '',
    type: '',
    tags: '',
    stock: '',
    imageUrl: '',
    color: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    try {
      const response = await fetch('/api/bags/add-bag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Bag added successfully!");
        setFormData({
          nameOfBag: '',
          description: '',
          brand: '',
          price: '',
          type: '',
          tags: '',
          stock: '',
          imageUrl: '',
          color: ''
        });
      } else {
        const error = await response.json().catch(() => ({}));
        alert(`Failed to add bag: ${error.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error("Error adding bag:", err);
      alert("Network error. Backend might be unreachable.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100vw' }}>
      <Navbar onNavigate={onNavigate} />
      
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Inventory Management</h1>
          <p style={styles.subtitle}>Curate your collection by adding new high-end bags to the database.</p>
        </div>

        <div style={styles.formCard}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.grid}>
              {/* Name */}
              <div style={styles.formGroup}>
                <label style={styles.label}><Type size={16} /> Name of Bag</label>
                <input 
                  name="nameOfBag" 
                  value={formData.nameOfBag} 
                  onChange={handleChange} 
                  placeholder="e.g. Classic Leather Handbag" 
                  style={styles.input} 
                  required 
                />
              </div>

              {/* Brand */}
              <div style={styles.formGroup}>
                <label style={styles.label}><Tag size={16} /> Brand</label>
                <input 
                  name="brand" 
                  value={formData.brand} 
                  onChange={handleChange} 
                  placeholder="e.g. WildCraft" 
                  style={styles.input} 
                  required 
                />
              </div>

              {/* Price */}
              <div style={styles.formGroup}>
                <label style={styles.label}><DollarSign size={16} /> Price</label>
                <input 
                  type="number" 
                  step="0.01"
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  placeholder="2499.99" 
                  style={styles.input} 
                  required 
                />
              </div>

              {/* Stock */}
              <div style={styles.formGroup}>
                <label style={styles.label}><Box size={16} /> Stock Units</label>
                <input 
                  type="number" 
                  name="stock" 
                  value={formData.stock} 
                  onChange={handleChange} 
                  placeholder="15" 
                  style={styles.input} 
                  required 
                />
              </div>

              {/* Type */}
              <div style={styles.formGroup}>
                <label style={styles.label}><Package size={16} /> Bag Type</label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  style={styles.input} 
                  required
                >
                  <option value="">Select Type</option>
                  <option value="HANDBAG">Handbag</option>
                  <option value="BACKPACK">Backpack</option>
                  <option value="DUFFEL">Duffel</option>
                  <option value="SLING">Sling</option>
                  <option value="CLUTCH">Clutch</option>
                </select>
              </div>

              {/* Tags/Category */}
              <div style={styles.formGroup}>
                <label style={styles.label}><Tag size={16} /> Category (Tags)</label>
                <select 
                  name="tags" 
                  value={formData.tags} 
                  onChange={handleChange} 
                  style={styles.input} 
                  required
                >
                  <option value="">Select Category</option>
                  <option value="MEN">Men</option>
                  <option value="WOMEN">Women</option>
                  <option value="UNISEX">Unisex</option>
                </select>
              </div>

              {/* Color */}
              <div style={styles.formGroup}>
                <label style={styles.label}><ImageIcon size={16} /> Primary Color</label>
                <input 
                  name="color" 
                  value={formData.color} 
                  onChange={handleChange} 
                  placeholder="BLACK" 
                  style={styles.input} 
                  required 
                />
              </div>

              {/* Image URL */}
              <div style={styles.formGroup}>
                <label style={styles.label}><ImageIcon size={16} /> Image URL</label>
                <input 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleChange} 
                  placeholder="https://..." 
                  style={styles.input} 
                  required 
                />
              </div>

              {/* Description */}
              <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                <label style={styles.label}><Tag size={16} /> Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Premium leather handbag for daily use" 
                  style={{...styles.input, minHeight: '100px', resize: 'vertical'}} 
                  required 
                />
              </div>
            </div>

            <button type="submit" style={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Syncing with Inventory...' : 'Add Bag to Collection'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '60px 20px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px'
  },
  title: {
    fontSize: '42px',
    fontWeight: 800,
    color: '#0f172a',
    letterSpacing: '-1px',
    marginBottom: '12px'
  },
  subtitle: {
    fontSize: '18px',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto'
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '48px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#475569',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  input: {
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    fontSize: '15px',
    color: '#0f172a',
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#0f172a',
      backgroundColor: '#ffffff'
    }
  },
  submitBtn: {
    width: '100%',
    padding: '18px',
    backgroundColor: '#0f172a',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'transform 0.2s, background 0.2s',
    boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.3)'
  }
};
