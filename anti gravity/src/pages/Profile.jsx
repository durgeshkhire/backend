import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Package, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // If not logged in, boot them out
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="profile-page container fade-in">
      <div className="profile-header text-center">
        <div className="profile-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
        </div>
        <h1 className="h2 mb-2">Welcome, {user.name || 'AURA Member'}</h1>
        <p className="text-muted">{user.email}</p>
        <button className="btn btn-outline logout-btn-top" onClick={handleLogout}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div className="profile-grid">
        {/* Account Details */}
        <div className="profile-card">
          <h3 className="h3 mb-4">Account Details</h3>
          <div className="detail-row">
            <span className="text-muted">Full Name</span>
            <span className="detail-value">{user.name || 'Not Provided'}</span>
          </div>
          <div className="detail-row">
            <span className="text-muted">Email</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="text-muted">Phone Number</span>
            <span className="detail-value">{user.phone || 'Not Provided'}</span>
          </div>
          <button className="btn btn-outline full-w mt-4">Edit Profile</button>
        </div>

        {/* Address Book */}
        <div className="profile-card">
          <div className="card-header-flex">
            <h3 className="h3 mb-4">Saved Address</h3>
            <MapPin size={20} className="text-muted" />
          </div>
          {user.address ? (
            <div className="address-box">
              <p>{user.name}</p>
              <p>{user.address}</p>
            </div>
          ) : (
            <p className="text-muted">No address provided.</p>
          )}
          <button className="btn btn-outline full-w mt-4">Manage Addresses</button>
        </div>

        {/* Recent Orders */}
        <div className="profile-card full-span">
          <div className="card-header-flex mb-4">
            <h3 className="h3">Recent Orders</h3>
            <Package size={20} className="text-muted"/>
          </div>
          
          <div className="empty-state">
            <Package size={48} className="text-muted mb-2" style={{ opacity: 0.5 }} />
            <p className="text-muted">You haven't placed any orders yet.</p>
            <button className="btn btn-primary mt-4" onClick={() => navigate('/shop')}>Start Shopping</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
