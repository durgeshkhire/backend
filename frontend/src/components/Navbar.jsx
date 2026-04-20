import React from 'react';
import { ShoppingBag, Heart, User, Search, Map } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const iconAction = () => {
    alert("Interaction Registered! Backend processes this action.");
  };

  return (
    <nav style={navStyles.container}>
      <div style={navStyles.left}>
        <h1 style={navStyles.logo} onClick={() => onNavigate('home')}>GlamBags</h1>
      </div>
      
      <div style={navStyles.center}>
        <div style={navStyles.navItem} onClick={() => onNavigate('category_mens')}>Men</div>
        <div style={navStyles.navItem} onClick={() => onNavigate('category_womens')}>Women</div>
        <div style={navStyles.navItem} onClick={() => onNavigate('category_collections')}>Collections</div>
        <div style={navStyles.navItem} onClick={() => onNavigate('category_sale')}>Sale</div>
        <div style={{...navStyles.navItem, color: '#6366f1'}} onClick={() => onNavigate('admin')}>Manage</div>
      </div>

      <div style={navStyles.right}>
        <div style={navStyles.iconWrapper} onClick={iconAction}>
          <Search size={22} color="#1e293b"/>
        </div>
        <div style={navStyles.iconWrapper} onClick={iconAction}>
          <Map size={22} color="#1e293b" />
        </div>
        <div style={navStyles.iconWrapper} onClick={iconAction}>
          <Heart size={22} color="#1e293b" />
        </div>
        <div onClick={() => onNavigate('login')} style={{...navStyles.iconWrapper, cursor: 'pointer'}}>
          <User size={22} color="#1e293b" />
        </div>
        <div style={navStyles.iconWrapper} onClick={iconAction}>
          <ShoppingBag size={22} color="#1e293b" />
          <span style={navStyles.badge}>0</span>
        </div>
      </div>
    </nav>
  );
}

const navStyles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 60px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  left: { flex: 1 },
  logo: {
    fontSize: '26px',
    fontWeight: 800,
    color: '#0f172a',
    letterSpacing: '-1px',
    cursor: 'pointer'
  },
  center: {
    display: 'flex',
    gap: '32px',
    flex: 2,
    justifyContent: 'center',
  },
  navItem: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#334155',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  right: {
    display: 'flex',
    gap: '28px',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  iconWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: 'white',
    fontSize: '11px',
    fontWeight: 700,
    padding: '2px 6px',
    borderRadius: '100px'
  }
};
