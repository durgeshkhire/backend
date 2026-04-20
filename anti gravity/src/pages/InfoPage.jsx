import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './InfoPage.css';

const InfoPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSection = searchParams.get('section') || 'faq';
  const [activeSection, setActiveSection] = useState(initialSection);

  const sections = [
    { id: 'faq', label: 'FAQ' },
    { id: 'shipping', label: 'Shipping & Returns' },
    { id: 'care', label: 'Care Guide' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <div className="info-page container fade-in">
      <div className="info-layout">
        
        {/* Sidebar Nav */}
        <aside className="info-sidebar">
          <h2 className="h3 mb-4">Support</h2>
          <nav className="info-nav">
            {sections.map(section => (
              <button 
                key={section.id} 
                className={activeSection === section.id ? 'active' : ''}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="info-content">
          {activeSection === 'faq' && (
            <div>
              <h1 className="h2 mb-4">Frequently Asked Questions</h1>
              
              <div className="faq-item">
                <h4 className="faq-q">Where are your bags made?</h4>
                <p className="faq-a text-muted">All our bags are handcrafted in Italy by skilled artisans using locally sourced materials.</p>
              </div>
              <div className="faq-item">
                <h4 className="faq-q">What payment methods do you accept?</h4>
                <p className="faq-a text-muted">We accept all major credit cards, PayPal, and Apple Pay.</p>
              </div>
              <div className="faq-item">
                <h4 className="faq-q">Can I track my order?</h4>
                <p className="faq-a text-muted">Yes, once your order ships, you will receive a tracking link via email.</p>
              </div>
            </div>
          )}

          {activeSection === 'shipping' && (
            <div>
              <h1 className="h2 mb-4">Shipping & Returns</h1>
              <p className="text-muted mb-4">We offer free standard shipping on all orders over $200. Express shipping is available for an additional fee at checkout.</p>
              <h3 className="h3 mb-2">Returns</h3>
              <p className="text-muted">If you are not completely satisfied with your purchase, you may return it within 30 days for a full refund. The item must be in its original, unused condition with all tags attached.</p>
            </div>
          )}

          {activeSection === 'care' && (
            <div>
              <h1 className="h2 mb-4">Care Guide</h1>
              <h3 className="h3 mb-2">Leather Care</h3>
              <p className="text-muted mb-4">To maintain the beauty of your leather bag, avoid prolonged exposure to direct sunlight and water. Clean with a soft, damp cloth and condition gently every few months.</p>
              <h3 className="h3 mb-2">Canvas Care</h3>
              <p className="text-muted">For canvas portions, spot clean using a mild detergent and warm water. Do not machine wash.</p>
            </div>
          )}

          {activeSection === 'contact' && (
            <div>
              <h1 className="h2 mb-4">Contact Us</h1>
              <p className="text-muted mb-4">Our support team is available Monday through Friday, 9AM to 5PM EST.</p>
              <p className="mb-2"><strong>Email:</strong> support@aura-bags.com</p>
              <p className="mb-4"><strong>Phone:</strong> +1 (800) 123-4567</p>

              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group mb-2">
                  <label>Name</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="form-group mb-2">
                  <label>Email</label>
                  <input type="email" placeholder="Your email" required />
                </div>
                <div className="form-group mb-2">
                  <label>Message</label>
                  <textarea rows="5" placeholder="How can we help?" required style={{ padding: '1rem', border: '1px solid var(--border-light)', borderRadius: '4px', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Send Message</button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InfoPage;
